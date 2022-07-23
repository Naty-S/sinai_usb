<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch }) => {    
    const res = await fetch("/api/actividades/eduardo@usb.ve");
   
    if (res.ok) {
      const prof_activities: YearActivities[] = await res.json();

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
  import ActsByYear from "$components/activities/acts_by_year.svelte";
  import type { Actividad, YearActivities } from "$types/db/actividades";

  export let prof_activities: YearActivities[];

  const count_acts = (acts: Record<string, Actividad[]>) => {
    return Object.entries(acts).reduce((count, [_, _acts]) => count + _acts.length, 0)
  }
</script>

<div class="ui container">
  <h3>Resumen Actividades</h3>

  <!-- Display activities resume table -->
  <!-- TODO: 'sortable' not work -->
  <table class="ui celled table uk-table-small">
    <thead>
      <tr class="center aligned">
        <th class="uk-table-expand">Actividades</th>
        {#each prof_activities as act}
          <th>
            <a href="/">{act.year} <span class="uk-badge">{count_acts(act.acts)}</span></a>
          </th>
        {/each}
        <!-- <th>Anios</th> -->
        <th><i>Total</i></th>
      </tr>
    </thead>
    <tbody>
      {#each prof_activities as act}
        <tr>
          {#each Object.entries(act.acts) as [kind, acts]}
            <!-- {#each acts as a}
              
            {/each} -->
            <td class="uk-table-expand">
              <a href="#">{kind}</a>
            </td>
            <td class="center aligned uk-table-expand">
              <a href="#">{acts.length}</a>
            </td>
          {/each}
        </tr>
      {/each}
      <!-- <tr>
        <td class="uk-table-expand">
          <a href="#">activity kind name</a>
        </td>
        <td class="center aligned uk-table-expand">
          <a href="#">activity kind count</a>
        </td>
        <td class="center aligned">row activities count</td>
      </tr> -->
      <tr>
        <td class="grey"><i>Total</i></td>
        <td class="center aligned">column total count</td>
        <td class="center aligned"><strong>column total count</strong></td>
      </tr>
    </tbody>
  </table>

  <!-- Display activities by year -->
  {#each prof_activities as activities}
    <ActsByYear {activities}/>
  {/each}
  
  <div class="uk-text-center">
    <p>
      Nota: Las actividades ingresadas en el Sistema podrán ser consultadas públicamente
      por lo que se recomienda a los profesores tomar las medidas necesarias.
    </p>
    <p>
      Página desarrollada y mantenida por la unidad de Informática del Decanato de Investigación y Desarrollo.
    </p>
    <p>
      Ante cualquier duda o problema con el sistema, comuníqueselo al Webmaster.
    </p>
  </div>
</div>
