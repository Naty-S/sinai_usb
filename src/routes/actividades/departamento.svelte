<!-- 
  @component
  Shows the departaments activities resume.
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch }) => {    
    const res = await fetch("/api/activities/department_2");
   
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
  import type { Activity } from "$types/db/activities";
  
  import ActsByYear from "$components/activities/acts_by_year.svelte";
  import ResumeTable from "$components/resume_table.svelte";
  
  import { format_activity_kind } from "$utils/formatting";
  import { acts_kinds_by_year, acts_years_counts, acts_kinds_counts } from "$utils/grouping";

  export let dep_activities;

  const activities: Activity[] = dep_activities.users_acts.flatMap(user => user.actividades.map(a => format_activity_kind(a)));
  const acts_by_year = acts_kinds_by_year(activities);
  const dep_acts_counts = acts_years_counts(activities);
  
  const years = acts_by_year.map( a => a["year"] );
  const years_headers = ["Actividad"].concat(years);  

  const users_with_acts = dep_activities.users_acts.filter(user => user.actividades.length > 0);
  const users_with_no_acts = dep_activities.users_acts.filter(user => user.actividades.length < 1);

  const kinds = [
    "articulo_revista"
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
  El departamento de "{dep_activities.dep_name.nombre}" tiene en el sistema
</h2>

<ResumeTable
  headers={years_headers}
  resume_kinds_counts={dep_acts_counts}
  row_total
/>

<div class="uk-text-center">
  <a href="">Vista BRA Departamental</a>
</div>

<div class="uk-text-center">
  Numero total de profesores de su departamento resgistrados en el sistema:
  ({dep_activities.users_acts.length})
</div>

<div class="uk-text-center">
  Nota: La suma de las actividades de los profesores no es igual al total del departamento,
  pues pueden tener varios autores.
</div>

<div class="ui divider" />

<h2 class="ui blue header uk-text-center">
  Profesores con Actividades ({users_with_acts.length})
</h2>
<div class="uk-text-center">
  Nota: A continuacion se muestran los totales de las actividades ingresadas en el sistema
  de cada profesor. Si desea ver mas detalles de las actividades de cada profesor haga
  click en su nombre.
</div>

<ResumeTable
  headers={acts_kinds_headers}
  resume_kinds_counts={
    users_with_acts.map(p => {
      return {
        link: `/actividades/profesor/${p.login}`,
        kind: `${p.profesor.nombre1}, ${p.profesor.apellido1}`,
        counts: acts_kinds_counts(p.actividades.map(a => format_activity_kind(a)))
      }
    })
  }
/>

<div class="ui divider" />

<h2 class="ui blue header uk-text-center">
  Profesores sin Actividades ({users_with_no_acts.length})
</h2>

<ResumeTable
  headers={["Profesor"]}
  resume_kinds_counts={
    users_with_no_acts.map(p => {
      return {
        link: `mailto:${p.login}`,
        kind: `${p.profesor.apellido1}, ${p.profesor.nombre1}`,
        counts: []
      }
    })
  }
  collapsing
/>

<div class="ui divider" />
