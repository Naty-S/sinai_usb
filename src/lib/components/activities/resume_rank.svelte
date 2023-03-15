<!-- 
  @component
  Show's activities resume table for coordination, department or division
 -->
<script lang="ts">
  import type { Activity } from "$lib/types/activities";
  import type {
    CoordActivities
    , DepActivities
    , DivisionActivities
    , GroupActivities
  } from "$lib/interfaces/activities";
  
  import ResumeTable from "./resume_table.svelte";
  
  import { acts_kinds_by_year } from "$utils/grouping";
  import { count_acts_kinds_by_year } from "$utils/maths";

  export let rank: string;
  export let rank_activities: CoordActivities | DivisionActivities | DepActivities | GroupActivities;

  let activities: Activity[];
  let rank_name: string;
  let rank_page: string;

  if (rank === "Coordinacion") {

    const coord_activities = rank_activities as CoordActivities;
    const dep_activities = coord_activities.departments_activities;
    const groups_activities = coord_activities.groups_activities;

    rank_name = coord_activities.coordination.name;
    rank_page = `/sinai/actividades/coordinacion/${coord_activities.coordination.id}`;

    if (dep_activities) {
      
      activities = dep_activities.flatMap(d => d.professors_activities).flatMap(p => p.activities);

    } else if (groups_activities) {

      activities = groups_activities.flatMap(g => g.activities);

    } else {
      throw new Error(`Actividades desconocidas para la coordinacion: ${coord_activities.coordination}`);
    };
  } else if (rank === "División") {

    const division_activities = rank_activities as DivisionActivities;
    const dep_activities = division_activities.departments_activities;
    
    rank_name = division_activities.division.name;
    rank_page = `/sinai/actividades/division/${division_activities.division.id}`;
    activities = dep_activities.flatMap(d => d.professors_activities).flatMap(p => p.activities);

  } else if (rank === "Departamento") {

    const dep_activities = rank_activities as DepActivities;
    const professors_activities = dep_activities.professors_activities;

    rank_name = dep_activities.department.name;
    rank_page = `/sinai/actividades/departamento/${dep_activities.department.id}`;
    activities = professors_activities.flatMap(p => p.activities);

  } else if (rank === "Grupo") {

    const group_activities = rank_activities as GroupActivities;

    rank_name = group_activities.group.nombre;
    rank_page = `/sinai/actividades/grupo/${group_activities.group.id}`;
    activities = group_activities.activities;

  } else {
    throw new Error(`Este rango: ${rank} no es permitido en esta pagina`);
  }
</script>

{#if activities.length > 0}
  
  <div class="ui divider" />

  <h2 class="ui blue header uk-text-center">
    <a href="{rank_page}">
      {rank} "{rank_name}" tiene en el sistema
    </a>
  </h2>

  <ResumeTable
    headers={["Actividad"].concat(acts_kinds_by_year(activities, true).map(a => a.year.toString()))}
    resume_kinds_counts={count_acts_kinds_by_year(activities, true)}
    row_total
  />

  <div class="ui divider" />

{/if}
