<!-- 
  @component
  Display activities by year for profesor or group
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {

    const entity = params.entity === "grupo" ? "group" : "professor"
    const res = await fetch(`/api/activities/${entity}/${params.id}`);
   
    if (res.ok) {
      const activities = await res.json();

      return {
        props: {activities}
      };
    };

    const { message } = await res.json();
    return {
      error: new Error(message)
    };
  };
</script>
<script lang="ts">
  import { page } from "$app/stores";

  import type { EntityActivities } from "$interfaces/activities";

  import YearsList from "$components/activities/years_list.svelte";
  import ResumeTable from "$components/activities/resume_table.svelte";

  export let activities: EntityActivities;

  const headers = ["Actividad"].concat(activities.by_year.map( a => a["year"] ));
</script>

<h3>Resumen Actividades</h3>

<!-- Display activities resume table -->
<ResumeTable
  {headers}
  resume_kinds_counts={activities.years_counts}
  row_total
  col_total
/>

<!-- Display activities by year -->
{#each activities.by_year.reverse() as activities}
  <YearsList {activities} editable/>
{/each}

{#if $page.params.entity === "profesor"}
  <div class="uk-text-center">
    <p>
      Nota: Las actividades ingresadas en el Sistema podrán ser consultadas públicamente
      por lo que se recomienda a los profesores tomar las medidas necesarias.
    </p>
    <p>
      Ante cualquier duda o problema con el sistema, comuníqueselo al Webmaster.
    </p>
  </div>
{/if}
