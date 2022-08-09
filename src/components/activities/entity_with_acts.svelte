<script lang="ts">
  import type { ActivitiesCounts, ProfessorActivities, GroupActivities } from "$types/db/activities";

  import ResumeTable from "$components/resume_table.svelte";

  import { count_acts_kinds } from "$utils/maths";

  export let entity: string;
  export let entity_activities: ProfessorActivities[] | GroupActivities[];

  // TODO: global var
  const kinds = [
    "ACTIVIDAD INVALIDA"
    , "articulo_revista"
    , "capitulo_libro"
    , "composicion"
    , "evento"
    , "exposicion"
    , "grabacion"
    , "informe_tecnico"
    , "libro"
    , "memoria"
    , "partitura"
    , "patente"
    , "premio"
    , "premio_bienal"
    , "proyecto_grado"
    , "proyecto_investigacion"
    , "recital"
  ];
  const acts_kinds_headers = [entity].concat(kinds);

  let entities_with_acts;
  let entities_with_acts_counts: ActivitiesCounts[];
  
  if (entity === "Grupo") {

    const groups_activities = entity_activities as GroupActivities[];
    entities_with_acts = groups_activities.filter(g => g.activities.length > 0);
    entities_with_acts_counts = entities_with_acts.map( g => {
      return {
        link: `/actividades/grupo/${g.group.id}`,
        kind: g.group.name,
        counts: count_acts_kinds(g.activities)
      };
    });

  } else if (entity === "Profesor") {

    const professors_activities = entity_activities as ProfessorActivities[];
    entities_with_acts = professors_activities.filter(p => p.activities.length > 0);
    entities_with_acts_counts = entities_with_acts.map( p => {
      return {
        link: `/actividades/profesor/${p.professor.email}`,
        kind: `${p.professor.name}, ${p.professor.surname}`,
        counts: count_acts_kinds(p.activities)
      };
    });

  } else {
    throw new Error(`Esta entidad: ${entity} no es permitida en esta pagina`);
  };
</script>

<h2 class="ui blue header uk-text-center">
  {entity}s con Actividades ({entities_with_acts.length})
</h2>
<div class="uk-text-center">
  Nota: A continuacion se muestran los totales de las actividades ingresadas en el sistema
  de cada {entity}. Si desea ver mas detalles de las actividades de cada {entity} haga
  click en su nombre.
</div>

<ResumeTable
  headers={acts_kinds_headers}
  resume_kinds_counts={entities_with_acts_counts}
/>
