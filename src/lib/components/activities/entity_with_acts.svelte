<!-- 
	@component
  Professors or Groups who do have activities created, display kind activities count resume table.
  Can only be seen by Coordinations and Departments
 -->
<script lang="ts">
  import type {
    ActivitiesCounts,
    ProfessorActivities,
    GroupActivities 
  } from "$lib/interfaces/activities";

  import ResumeTable from "./resume_table.svelte";

  import { count_acts_kinds } from "$lib/utils/maths";
	import { detailed_kinds } from "$lib/constants";

  export let entity: string;
  export let entity_activities: ProfessorActivities[] | GroupActivities[];

  const acts_kinds_headers = [entity].concat(detailed_kinds);

  let entities_with_acts;
  let entities_with_acts_counts: ActivitiesCounts[];
  
  if (entity === "Grupo") {

    const groups_activities = entity_activities as GroupActivities[];
    entities_with_acts = groups_activities.filter(g => g.activities.length > 0);
    entities_with_acts_counts = entities_with_acts.map( g => {
      return {
        link: `/sinai/actividades/grupo/${g.group.id}`,
        kind: g.group.name,
        counts: count_acts_kinds(g.activities, true)
      };
    });

  } else if (entity === "Profesor") {

    const professors_activities = entity_activities as ProfessorActivities[];
    entities_with_acts = professors_activities.filter(p => p.activities.length > 0);
    entities_with_acts_counts = entities_with_acts.map( p => {
      return {
        link: `/sinai/actividades/profesor/${p.professor.id}`,
        kind: `${p.professor.name}, ${p.professor.surname}`,
        counts: count_acts_kinds(p.activities, true)
      };
    });

  } else {
    throw new Error(`Esta entidad: ${entity} no es permitida en esta página`);
  };
</script>

<h2 class="ui blue header uk-text-center">
  {entity == "Grupo" ? "Grupos" : "Profesores"} con Actividades ({entities_with_acts.length})
</h2>
<div class="uk-text-center">
  Nota: A continuación se muestran los totales de las actividades ingresadas en el sistema
  de cada {entity}. Si desea ver más detalles de las actividades de cada {entity} haga
  click en su nombre.
</div>

<ResumeTable
  headers={acts_kinds_headers}
  resume_kinds_counts={entities_with_acts_counts}
  row_total
/>
