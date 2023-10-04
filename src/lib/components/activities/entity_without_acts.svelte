<!-- 
	@component
  Professors or Groups who do not have activities created.
  Can only be seen by Coordinations and Departments
 -->
<script lang="ts">
  import type { ActivitiesCounts,	Activities } from "$lib/interfaces/activities";

  import ResumeTable from "./resume_table.svelte";
  
  export let entity: string;
  export let entity_activities: Activities[];

  const entities_without_acts = entity_activities.filter(e => e.activities.length < 1);

  let entities_without_acts_counts: ActivitiesCounts[];
  
  if (entity === "grupo") {

    entities_without_acts_counts = entities_without_acts.map(g => {
      return {
        kind: g.owner.name,
        counts: []
      };
    });

  } else if (entity === "profesor") {

    entities_without_acts_counts = entities_without_acts.map(p => {
      return {
        link: `mailto:${p.owner.email}`,
        kind: p.owner.name,
        counts: []
      };
    });

  } else {
    throw new Error(`Esta entidad: ${entity} no es permitida en esta página.`);
  };
</script>

<h2 class="ui blue header uk-text-center">
  {entity == "grupo" ? "Grupos" : "Profesores"} sin Actividades ({entities_without_acts.length})
</h2>

<ResumeTable
  headers={[entity]}
  resume_kinds_counts={entities_without_acts_counts}
  collapsing
/>
