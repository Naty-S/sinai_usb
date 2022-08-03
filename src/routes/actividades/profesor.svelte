<script lang="ts">
  import type { Activities } from "$types/db/activities";

  import ActsByYear from "$components/activities/acts_by_year.svelte";
  import ResumeTable from "$components/resume_table.svelte";
	import { user } from '$lib/shared/stores/session';

  const prof_activities: Activities = $user.activities.profesor_activities;
  const years = prof_activities.acts_kinds_by_year.map( a => a["year"] );
  const headers = ["Actividad"].concat(years);  
</script>

<h3>Resumen Actividades</h3>

<!-- Display activities resume table -->
<ResumeTable
  {headers}
  resume_kinds_counts={prof_activities.acts_counts}
  n_column="{headers.length} column"
  row_total
  col_total
/>

<!-- Display activities by year -->
{#each prof_activities.acts_kinds_by_year.reverse() as activities}
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
