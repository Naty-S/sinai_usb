<!-- 
  @component
  Shows the departaments activities resume.
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {    
    const res = await fetch(`/api/activities/department/${params.id}`);
   
    if (res.ok) {
      const raw_data = await res.json();
      const dep_activities: DepActivities = {

        department: raw_data.department,
        professors_activities: raw_data.professors_activities.map( p => {
          return {
            professor: {
              email: p.profesor.correo,
              name: p.profesor.nombre1,
              surname: p.profesor.apellido1
            },
            activities: p.actividades.map( a => format_activity_kind(a) )
          };
        })
      };

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
  
  import ResumeTable from "$components/resume_table.svelte";
  
  import { format_activity_kind } from "$utils/formatting";
  import { acts_kinds_by_year } from "$utils/grouping";
  import { count_acts_kinds_by_year, count_acts_kinds_by_prof } from "$utils/maths";

  export let dep_activities: DepActivities;

  const professors_activities = dep_activities.professors_activities;
  const activities: Activity[] = professors_activities.flatMap(p => p.activities);
  const acts_by_year = acts_kinds_by_year(activities);
  const dep_acts_counts = count_acts_kinds_by_year(activities);
  
  const years = acts_by_year.map( a => a["year"] );
  const years_headers = ["Actividad"].concat(years);  

  const profs_with_acts = professors_activities.filter(p => p.activities.length > 0);
  const profs_with_no_acts = professors_activities.filter(p => p.activities.length < 1);

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
  const acts_kinds_headers = ["Profesor"].concat(kinds);

</script>

<div class="ui divider" />

<h2 class="ui blue header uk-text-center">
  El departamento de "{dep_activities.department}" tiene en el sistema
</h2>

<ResumeTable
  headers={years_headers}
  resume_kinds_counts={dep_acts_counts}
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
  pues pueden tener varios autores.
</div>

<div class="ui divider" />

<h2 class="ui blue header uk-text-center">
  Profesores con Actividades ({profs_with_acts.length})
</h2>
<div class="uk-text-center">
  Nota: A continuacion se muestran los totales de las actividades ingresadas en el sistema
  de cada profesor. Si desea ver mas detalles de las actividades de cada profesor haga
  click en su nombre.
</div>

<ResumeTable
  headers={acts_kinds_headers}
  resume_kinds_counts={
    profs_with_acts.map(p => {
      return {
        link: `/actividades/profesor/${p.professor.email}`,
        kind: `${p.professor.name}, ${p.professor.surname}`,
        counts: count_acts_kinds_by_prof(p.activities)
      }
    })
  }
/>

<div class="ui divider" />

<h2 class="ui blue header uk-text-center">
  Profesores sin Actividades ({profs_with_no_acts.length})
</h2>

<ResumeTable
  headers={["Profesor"]}
  resume_kinds_counts={
    profs_with_no_acts.map(p => {
      return {
        link: `mailto:${p.professor.email}`,
        kind: `${p.professor.name}, ${p.professor.surname}`,
        counts: []
      }
    })
  }
  collapsing
/>

<div class="ui divider" />
