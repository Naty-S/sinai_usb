<!-- 
	@component
  Professors or Groups who do have activities created, display kind activities count resume table.
  Can only be seen by Coordinations and Departments
 -->
<script lang="ts">
  import type { ActivitiesCounts,	Activities } from "$lib/interfaces/activities";

  import ResumeTable from "./resume_table.svelte";

  import { count_acts_kinds } from "$lib/utils/maths";
	import { detailed_kinds } from "$lib/constants";

  export let entity: string;
  export let entity_activities: Activities[];

  const acts_kinds_headers = [entity].concat(detailed_kinds);
  const entities_with_acts = entity_activities.filter(e => e.activities.length > 0);
  const entities_with_acts_counts: ActivitiesCounts[] = entities_with_acts.map(e => {
    return {
      link: `/sinai/actividades/${entity}/${e.owner.id}`,
      kind: e.owner.name,
      counts: count_acts_kinds(e.activities)
    };
  });
</script>

<h2 class="ui blue header uk-text-center">
  {entity == "grupo" ? "Grupos" : "Profesores"} con Actividades ({entities_with_acts.length})
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
