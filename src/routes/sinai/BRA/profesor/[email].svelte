<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {    
    const res1 = await fetch(`/api/activities/professor/${params.email}`);
    const res2 = await fetch(`/api/professor/${params.email}`);

    if (res1.ok && res2.ok) {
      const prof_activities = await res1.json();
      const profile = await res2.json();

      return {
        props: {prof_activities, profile}
      };
    };

    const { message1 } = await res1.json();
    const { message2 } = await res2.json();
    return {
      error: new Error(message1 + message2)
    };
};
</script>
<script lang="ts">
  import { onMount } from "svelte";

  import type { EntityActivities, YearActivities } from "$interfaces/activities";

  import YearsList from "$components/activities/years_list.svelte";
  import BraHeader from "$components/bra/header.svelte";

  export let prof_activities: EntityActivities;
  export let profile;
  
  let printBRA: () => void;

  onMount(async () => {
    const printJS = (await import("print-js")).default;

    printBRA = function() { printJS(
      // For usage reference go to: https://printjs.crabbly.com/
      { printable: "bra"
      , type: "html"
      , maxWidth: 1600
      , targetStyles: ['*']
      , ignoreElements: ["resume_table"]
      , header: "SINAI - Consultas Públicas"
      , headerStyle: "font-size: 15px;"
      // , onPrintDialogClose: show_modal_success() TODO:
      }
    )};
  });
  
  const curr_year = new Date().getFullYear();
  const last_year = curr_year - 1;
  const years = last_year + " - " + curr_year;

  // TODO: change to period set by the Dean
  const period = "01 Agosto " + last_year + " - 31 Julio " + curr_year;
  
  const last_acts_by_year = prof_activities.by_year.find(a => a.year === last_year) || {kind_activities: {}};
  const last_year_acts = Object.entries(last_acts_by_year.kind_activities).filter(([kind, acts]) =>
    acts.filter(a =>
      new Date(a.fecha_creacion).getMonth() > 7
    ).length > 0
  );
  const curr_acts_by_year = prof_activities.by_year.find(a => a.year === curr_year) || {kind_activities: {}};
  const curr_year_acts = Object.entries(curr_acts_by_year.kind_activities).filter(([kind, acts]) =>
    acts.filter(a =>
      new Date(a.fecha_creacion).getMonth() < 8
    ).length > 0
  );

  const period_activities: YearActivities[] = [
    {
      year: last_year,
      kind_activities: Object.fromEntries(last_year_acts)
    },
    {
      year: curr_year,
      kind_activities: Object.fromEntries(curr_year_acts)
    }
  ];

  const headers = ["Actividad", `${curr_year - 1}`, `${curr_year}`];
</script>

<div id="bra" class="uk-margin">
  <BraHeader {profile} {period}/>
  
  <div class="ui three column grid container segment">
    <div class="column">Encontradas: #</div>
    <div class="center aligned column">Años: {years}</div>
    <div class="right aligned column">Páginas: #</div>
  </div>

  <!-- Display activities by year -->
  {#each period_activities.reverse() as activities}
    <YearsList {activities} />
  {/each}
</div>

<button type="button" class="ui blue button" on:click={() => printBRA()}>
  Imprimir vista BRA
</button>
