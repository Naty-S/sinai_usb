<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {    
    const res = await fetch(`/api/activities/professor/${params.email}`);
   
    if (res.ok) {
      const prof_activities = await res.json();

      return {
        props: {prof_activities}
      }
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
};
</script>
<script lang="ts">
  import { onMount } from "svelte";

  import type { EntityActivities } from "$interfaces/activities";

  import YearsList from "$components/activities/years_list.svelte";
  import ResumeTable from "$components/activities/resume_table.svelte";
  import BraHeader from "$components/bra/header.svelte";

  export let prof_activities: EntityActivities;
  
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
  
  const current_year = new Date().getFullYear();
  const years = (current_year - 1).toString() + " - " + current_year.toString();
  // TODO: change to period set by the Dean
  const period = "Julio " + (current_year - 1).toString() + " - Julio " + current_year.toString()
  const period_activities = prof_activities.by_year.filter(a => period.includes(a.year.toString()))
  const acts_years = period_activities.map(a => a.year.toString());
  const headers = ["Actividad"].concat(acts_years);
</script>

<div id="bra" class="uk-margin">
  <BraHeader {period}/>
  
  <!-- Display activities resume table -->
  <ResumeTable
    {headers}
    resume_kinds_counts={prof_activities.years_counts.map(yc => ({
        kind: yc.kind,
        counts: yc.counts.filter(c => c.year && period.includes(c.year.toString()))
      })
    )}
    row_total
    col_total
  />

  <div class="ui three column grid container segment">
    <div class="column">Encontradas: {period_activities.length}</div>
    <div class="center aligned column">Años: {years}</div>
    <div class="right aligned column">Páginas: #</div>
  </div>

  <!-- Display activities by year -->
  {#each period_activities.reverse() as activities}
    <YearsList {activities} />
  {/each}
</div>

<button type="button" class="ui blue button" on:click="{() => printBRA()}">
  Imprimir vista BRA
</button>
