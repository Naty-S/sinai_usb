<!-- 
  @component
  Shows the departament activities resume.
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {    
    const res = await fetch(`/api/activities/department/${params.id}`);
   
    if (res.ok) {
      const dep_activities = await res.json();

      return {
        props: {dep_activities}
      }
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
};
</script>
<script lang="ts">
  import { page } from "$app/stores";

  import type { Activity, DepActivities } from "$types/db/activities";
  
  import ResumeEntity from "$components/activities/resume_entity.svelte";
  import ResumeTable from "$components/resume_table.svelte";
  
  import { acts_kinds_by_year } from "$utils/grouping";
  import { count_acts_kinds_by_year } from "$utils/maths";

  export let dep_activities: DepActivities;

  const professors_activities = dep_activities.professors_activities;
  const activities: Activity[] = professors_activities.flatMap(p => p.activities);
  const years_headers = ["Actividad"].concat(acts_kinds_by_year(activities).map( a => a["year"] ));  
</script>

<div class="ui divider" />

<h2 class="ui blue header uk-text-center">
  El departamento de "{dep_activities.department}" tiene en el sistema
</h2>

<ResumeTable
  headers={years_headers}
  resume_kinds_counts={count_acts_kinds_by_year(activities)}
  row_total
/>

<div class="uk-text-center">
  <a href="/BRA/departamento/{$page.params.id}" class="ui button disabled">
    Vista BRA Departamental
  </a>
</div>

<div class="uk-text-center">
  Numero total de profesores de su departamento resgistrados en el sistema:
  ({professors_activities.length})
</div>

<div class="uk-text-center">
  Nota: La suma de las actividades de los profesores no es igual al total del departamento,
  pues pueden tener varios autores del mismo departamento.
</div>

<div class="ui divider" />

<ResumeEntity entity_activities={dep_activities} />
