<!--
  Display professor's BRA resume.
-->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    const user = session.user;
    const professor = user?.professor;

    if (professor) {

      const res1 = await fetch(`/api/activities/professor/${professor?.id}`);
      const res2 = await fetch(`/api/professor/${user?.email}`);
      const res3 = await fetch("/api/bra");
  
      if (res1.ok && res2.ok && res3.ok) {
        
        const { owner, activities } = await res1.json();
        const profile = await res2.json();
        const period = await res3.json();
  
        return {
          props: {
            activities,
            profile,
            period
          }
        };
      };
  
      const { message: message1, code: code1 } = await res1.json();
      const { message: message2, code: code2 } = await res2.json();
      const { message: message3, code: code3 } = await res3.json();

      return {
        error: new Error(`Error al cargar los datos de:\nActividades: ${code1}. ${message1}\n\
          Profesor: ${code2}. ${message2}\nPeriodo BRA: ${code3}. ${message3}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como profesor."),
        status: 401
      };
    };
};
</script>
<script lang="ts">
  import type { periodo_bra } from "@prisma/client";
  import type { YearActivities as YearActivitiesT } from "$lib/interfaces/activities";
  import type { Activity } from "$lib/types/activities";

  import { onMount } from "svelte";

  import { format_date } from "$lib/utils/formatting";
  import { acts_kinds_by_year } from "$lib/utils/grouping";

  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import BraHeader from "$lib/components/bra/header.svelte";
  import Notifications from "$lib/components/notifications.svelte";
	import type { Profile } from "$lib/interfaces/professors";

  export let activities: Activity[];
  export let profile: Profile;
  export let period_bra: periodo_bra;

  const activities_by_year = acts_kinds_by_year(activities);
  const period = format_date(period_bra.inicio, "long-day") + " - " + format_date(period_bra.fin, "long-day");
  const start_year = new Date(period_bra.inicio).getFullYear();
  const final_year = new Date(period_bra.fin).getFullYear();
  const years = start_year + " - " + final_year;
  
  const last_acts_by_year = activities_by_year.find(a => a.year === start_year) || {kind_activities: {}};
  const last_year_acts = Object.entries(last_acts_by_year.kind_activities).filter(([_, acts]) =>
    acts.filter(a => new Date(a.fecha_creacion).getMonth() > 7).length > 0
  );
  const curr_acts_by_year = activities_by_year.find(a => a.year === final_year) || {kind_activities: {}};
  const curr_year_acts = Object.entries(curr_acts_by_year.kind_activities).filter(([_, acts]) =>
    acts.filter(a => new Date(a.fecha_creacion).getMonth() < 8).length > 0
  );
  const acts_count = curr_year_acts.concat(last_year_acts).reduce((n, [_, a]) => n + a.length, 0);

  const period_activities: YearActivitiesT[] = [
    { year: final_year
    , kind_activities: Object.fromEntries(curr_year_acts)
    },
    { year: start_year
    , kind_activities: Object.fromEntries(last_year_acts)
    }
  ];

  let printBRA: () => void;
  
  onMount(async () => {
    const printJS = (await import("print-js")).default;

    printBRA = function() { printJS(
      // For usage reference go to: https://printjs.crabbly.com/
      { printable: "bra"
      , type: "html"
      , maxWidth: 1600
      // , style: "min-width: 1600px;" // Not working
      , targetStyles: ['*']
      , ignoreElements: ["resume_table"]
      , header: "SINAI - Consultas Públicas"
      , headerStyle: "font-size: 12px;"
      // , onPrintDialogClose: show_modal_success() TODO:
      // , onError: show_modal_error() TODO:
      }
    )};
  });
</script>

{#if !period_bra.activo}
  <Notifications header_msg="La convocatoria BRA aún no está activa" />
{/if}

<div id="bra" class="uk-margin">
  <BraHeader {profile} {period}/>
  
  <div class="ui three column grid container segment">
    <div class="five wide column">Encontradas: {acts_count}</div>
    <div class="center aligned five wide column">Años: {years}</div>
    <div class="right aligned five wide column">Páginas: #</div>
  </div>

  {#each period_activities as year_activities}
    <YearActivities {year_activities} />
  {/each}
</div>

<button
  type="button"
  class="ui blue button"
  on:click={printBRA}
  disabled={!period_bra.activo}
>
  Imprimir vista BRA
</button>
