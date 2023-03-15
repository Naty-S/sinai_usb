<script lang="ts">
  import type { ActivitiesCounts, ProfessorActivities, GroupActivities } from "$interfaces/activities";

  import ResumeTable from "./resume_table.svelte";
  
  export let entity: string;
  export let entity_activities: ProfessorActivities[] | GroupActivities[];

  let entities_without_acts;
  let entities_without_acts_counts: ActivitiesCounts[];
  
  if (entity === "Grupo") {

    const groups_activities = entity_activities as GroupActivities[];
    entities_without_acts = groups_activities.filter(g => g.activities.length < 1);
    entities_without_acts_counts = entities_without_acts.map( g => {
      return {
        kind: g.group.nombre,
        counts: []
      };
    });

  } else if (entity === "Profesor") {

    const professors_activities = entity_activities as ProfessorActivities[]
    entities_without_acts = professors_activities.filter(p => p.activities.length < 1);
    entities_without_acts_counts = entities_without_acts.map( p => {
      return {
        link: `mailto:${p.professor.email}`,
        kind: `${p.professor.name}, ${p.professor.surname}`,
        counts: []
      };
    });

  } else {
    throw new Error(`Esta entidad: ${entity} no es permitida en esta pagina`);
  };
</script>

<h2 class="ui blue header uk-text-center">
  {entity}s sin Actividades ({entities_without_acts.length})
</h2>

<ResumeTable
  headers={[entity]}
  resume_kinds_counts={entities_without_acts_counts}
  collapsing
/>
