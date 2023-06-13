<!--
  Display professor's BRA resume.
-->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params }) => {    
    const res1 = await fetch(`/api/activities/professor/${params.email}`);
    // TODO: confirmar. periodo bra busca las actividades en las que ha participado?
    const res2 = await fetch(`/api/professor/${params.email}`);
    const res3 = await fetch("/api/bra");

    if (res1.ok && res2.ok && res3.ok) {
      const prof_activities = await res1.json();
      const profile = await res2.json();
      const period = await res3.json();

      return {
        props: {
          prof_activities,
          profile,
          period
        }
      };
    };

    const { message: message1 } = await res1.json();
    const { message: message2 } = await res2.json();
    const { message: message3 } = await res3.json();
    return {
      error: new Error(message1 + "\n" + message2 + "\n" + message3)
    };
};
</script>
<script lang="ts">
  import { onMount } from "svelte";

  import type { periodo_bra, profesor } from "@prisma/client";
  import type {
    EntityActivities,
    YearActivities as YearActivitiesT
  } from "$lib/interfaces/activities";

  import { format_date } from "$lib/utils/formatting";

  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import BraHeader from "$lib/components/bra/header.svelte";
  import Notifications from "$lib/components/notifications.svelte";

  export let prof_activities: EntityActivities;
  export let profile: profesor;
  export let period: periodo_bra;
  
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
      , headerStyle: "font-size: 12px;"
      // , style: "font-size: 8px;"
      // , onPrintDialogClose: show_modal_success() TODO:
      }
    )};
  });
  
  const final_year = new Date(period.fin).getFullYear();
  const init_year = new Date(period.inicio).getFullYear();
  const years = init_year + " - " + final_year;

  const _period = format_date(period.inicio, "long-day") + " - " + format_date(period.fin, "long-day");
  
  const last_acts_by_year = prof_activities.by_year.find(a => a.year === init_year) || {kind_activities: {}};
  const last_year_acts = Object.entries(last_acts_by_year.kind_activities).filter(([kind, acts]) =>
    acts.filter(a =>
      new Date(a.fecha_creacion).getMonth() > 7
    ).length > 0
  );
  const curr_acts_by_year = prof_activities.by_year.find(a => a.year === final_year) || {kind_activities: {}};
  const curr_year_acts = Object.entries(curr_acts_by_year.kind_activities).filter(([kind, acts]) =>
    acts.filter(a =>
      new Date(a.fecha_creacion).getMonth() < 8
    ).length > 0
  );

  const period_activities: YearActivitiesT[] = [
    {
      year: final_year,
      kind_activities: Object.fromEntries(curr_year_acts)
    },
    {
      year: init_year,
      kind_activities: Object.fromEntries(last_year_acts)
    }
  ];

  const acts_count = curr_year_acts.concat(last_year_acts).reduce((prev, [_, as]) => prev + as.length, 0);
</script>

{#if !period.activo}
  <Notifications header_msg="La convocatoria BRA aun no esta activa" />
{/if}

<div id="bra" class="uk-margin">
  <BraHeader {profile} period={_period}/>
  
  <div class="ui three column grid container segment">
    <div class="column">Encontradas: {acts_count}</div>
    <div class="center aligned column">Años: {years}</div>
    <div class="right aligned column">Páginas: #</div>
  </div>

  <!-- Display activities by year -->
  {#each period_activities as year_activities}
    <YearActivities {year_activities} />
  {/each}
</div>

<button
  type="button"
  class="ui blue button"
  on:click={() => printBRA()}
  disabled={!period.activo}
>
  Imprimir vista BRA
</button>
