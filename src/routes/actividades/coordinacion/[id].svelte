<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {    
    const res = await fetch(`/api/activities/coordination/${params.id}`);

    if (res.ok) {
      const coord_activities: CoordActivities = await res.json();

      return {
        props: {coord_activities}
      };
    };

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
};
</script>
<script lang="ts">
  import type { Activity, CoordActivities, DepActivities, GroupActivities } from "$types/db/activities";

  import ResumeEntity from "$components/activities/resume_entity.svelte";
  import ResumeTable from "$components/resume_table.svelte";
  import Department from "../departamento/[id].svelte";

  import { acts_kinds_by_year } from "$utils/grouping";
  import { count_acts_kinds_by_year } from "$utils/maths";

  export let coord_activities: CoordActivities;

  let dep_activities: DepActivities[];
  let groups_activities: GroupActivities[];
  let activities: Activity[] = [];
  
  if (coord_activities.departments_activities) {
    
    dep_activities = coord_activities.departments_activities;
    activities = dep_activities.flatMap(d => d.professors_activities).flatMap(p => p.activities);

  } else if (coord_activities.groups_activities) {

    groups_activities = coord_activities.groups_activities;
    activities = groups_activities.flatMap(g => g.activities);

  } else {
    throw new Error(`Actividades desconocidas para la coordinacion: ${coord_activities.coordination}`);
  };
</script>

<h2 class="ui blue header uk-text-center">
  La coordinacion de "{coord_activities.coordination}" tiene en el sistema
</h2>

<ResumeTable
  headers={["Actividad"].concat(acts_kinds_by_year(activities).map( a => a["year"] ))}
  resume_kinds_counts={count_acts_kinds_by_year(activities)}
  row_total
/>

<div class="ui divider" />

{#if groups_activities}
  {#each groups_activities.filter(g => g.activities.length > 0) as g}
    <div class="ui divider" />

    <h2 class="ui blue header uk-text-center">
      El grupo de "{g.group.name}" tiene en el sistema
    </h2>

    <ResumeTable
      headers={["Actividad"].concat(acts_kinds_by_year(g.activities).map( a => a["year"] ))}
      resume_kinds_counts={count_acts_kinds_by_year(g.activities)}
      row_total
    />
  {/each}

  <ResumeEntity entity_activities={groups_activities} entity="Grupo"/>

{:else if dep_activities}
  {#each dep_activities as dep_acts}
    <Department dep_activities={dep_acts} />
  {/each}
{:else}
  ERROR
{/if}
