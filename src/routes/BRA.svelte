<script lang="ts">
  import { onMount } from "svelte";

  import type { Activities } from "$types/db/activities";

  import ActsByYear from "$components/activities/acts_by_year.svelte";
  import BraHeader from "$components/bra/header.svelte";
  import ResumeTable from "$components/resume_table.svelte";
	import { user } from '$lib/shared/stores/session';

  const prof_activities: Activities = $user.activities.profesor_activities;
  
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

  const acts_years = prof_activities.acts_kinds_by_year.map( a => a["year"] );
  const headers = ["Actividad"].concat(acts_years);

  // TODO: change to period set by the Dean
  const current_year = new Date().getFullYear();
  const period = "Julio " + (current_year - 1).toString() + " - Julio " + current_year.toString()
  const years = (current_year - 1).toString() + " - " + current_year.toString();
  const period_activities = prof_activities.acts_kinds_by_year.filter(a => period.includes(a.year))
</script>

<div id="bra" class="uk-margin">
  <BraHeader {period}/>
  
  <!-- Display activities resume table -->
  <ResumeTable
    {headers}
    resume_kinds_counts={prof_activities.acts_counts}
    n_column="{headers.length} column"
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
    <ActsByYear {activities} />
  {/each}
</div>

<div id="print_button" class="ui container uk-margin">
  <button type="button" class="ui blue button" on:click="{() => printBRA()}">
    Imprimir vista BRA
  </button>
</div>
