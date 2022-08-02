<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  // TODO: fetch from 'stores'
  export const load: Load = async ({ fetch }) => {    
    const res = await fetch("/api/actividades/eduardo@usb.ve");
   
    if (res.ok) {
      const prof_activities: Activities = await res.json();

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

  import type { Activities } from "$types/db/actividades";
  import ActsByYear from "$components/activities/acts_by_year.svelte";
  import BraHeader from "$components/bra/header.svelte";
  import ResumeTable from "$components/resume_table.svelte";

  export let prof_activities: Activities;
  
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

  const years = prof_activities.acts_kinds_by_year.map( a => a["year"] );
  const headers = ["Actividad"].concat(years);  
</script>

<!-- <div class="ui grid"> -->
  <div id="bra">
    <BraHeader />
    
    <!-- Display activities resume table -->
    <ResumeTable
      {headers}
      resume_kinds_counts={prof_activities.acts_counts}
      n_column="{headers.length} column"
      row_total
      col_total
    />

    <div class="ui three column text grid container">
      <!-- <div class="equal width row"> -->
        <div class="column">Encontradas: #</div>
        <div class="center aligned column">Años:  - </div>
        <div class="right aligned column">Páginas: #</div>
      <!-- </div> -->
    </div>

    <!-- Display activities by year -->
    {#each prof_activities.acts_kinds_by_year.reverse() as activities}
      <ActsByYear {activities}/>
    {/each}
  </div>

  <div id="print_button" class="uk-margin">
    <button type="button" class="ui blue button" on:click="{() => printBRA()}">
      Imprimir vista BRA
    </button>
  </div>
<!-- </div> -->
