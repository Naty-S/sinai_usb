<script lang="ts">
  import type {
    ActivitiesCounts,
    ProfessorActivities,
    GroupActivities 
  } from "$interfaces/activities";

  import ResumeTable from "./resume_table.svelte";

  import { count_acts_kinds } from "$utils/maths";
  import { map_to_detailed_kind } from "$utils/mappings";

  export let entity: string;
  export let entity_activities: ProfessorActivities[] | GroupActivities[];

  // TODO: global var
  const kinds = [
    "ACTIVIDAD INVALIDA"
    , "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"
    , "Publicaciones en Revistas Indexadas en Otros Indices"
    , "Publicaciones en Revistas Arbitradas No Indexadas"
    , "Articulos Aceptados en Vías de Publicación"
    , "Publicaciones en Revistas Arbitradas"
    , "Publicaciones de Capitulos de Libros"
    , "Composiciones Solicitadas por Orquestas Sinfonicas o Agrupaciones Reconocidas"
    , "Asistencia a Eventos Internacionales"
    , "Asistencia a Eventos Nacionales"
    , "Eventos en Venezuela"
    , "Eventos en el Exterior"
    , "Eventos"
    , "Seleccion en Exposiciones, Bienales, Salones o Concursos Arbitrados"
    , "Grabaciones Sonoras Evaluadas Por Arbitros"
    , "Informes Tecnicos"
    , "Libro Nacional"
    , "Libro Internacional"
    , "Publicaciones de Libros"
    , "Memorias *Arbitradas* de Congresos"
    , "Partituras, Video o CD's Publicados en Editoriales Reconocidas"
    , "Patentes Nacional"
    , "Patentes Internacional"
    , "Patentes"
    , "Premios"
    , "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones"
    , "Tutoria de Tesis Doctorales"
    , "Tutoria de Trabajos de Grado (Maestrias)"
    , "Tutoria de Proyectos de Grado (Especializaciones)"
    , "Proyectos de Grado (Postgrados)"
    , "Tutoria de Proyectos de Grado (Licencituras)"
    , "Tutoria de Proyectos de Grado (Ingenierias)"
    , "Proyectos de Grado (Pasantias Largas)"
    , "Proyectos de Grado Dirigidos"
    , "Proyectos de IYD (Vigentes)"
    , "Proyectos de IYD"
    , "Recitales o Conciertos Arbitrados"
  ];
  const acts_kinds_headers = [entity].concat(kinds);
  console.log(entity_activities.map(e => e.activities.map(a => map_to_detailed_kind(a.kind_name, a.kind_info))))

  let entities_with_acts;
  let entities_with_acts_counts: ActivitiesCounts[];
  
  if (entity === "Grupo") {

    const groups_activities = entity_activities as GroupActivities[];
    entities_with_acts = groups_activities.filter(g => g.activities.length > 0);
    entities_with_acts_counts = entities_with_acts.map( g => {
      return {
        link: `/sinai/actividades/grupo/${g.group.id}`,
        kind: g.group.nombre,
        counts: count_acts_kinds(g.activities, true)
      };
    });

  } else if (entity === "Profesor") {

    const professors_activities = entity_activities as ProfessorActivities[];
    entities_with_acts = professors_activities.filter(p => p.activities.length > 0);
    entities_with_acts_counts = entities_with_acts.map( p => {
      return {
        link: `/sinai/actividades/profesor/${p.professor.email}`,
        kind: `${p.professor.name}, ${p.professor.surname}`,
        counts: count_acts_kinds(p.activities, true)
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
  row_total
/>
