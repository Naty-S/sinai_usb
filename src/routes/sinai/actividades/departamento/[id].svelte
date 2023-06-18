<!-- 
  Departament activities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const user = session.user;
    const professor = user?.professor;

    if (user?.dean || professor?.coord_chief ||
        professor?.is_dep_chief || professor?.is_dep_representative) {

      const res = await fetch(`/api/activities/department/${params.id}`);
     
      if (res.ok) {
        const dep_activities = await res.json();
  
        return {
          props: { dep_activities }
        };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar las actividades del departamento.\n${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. \
          Inicie sesión como jefe o representante de Departamento, Coordinador o Decano."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import { page } from "$app/stores";

  import type { DepActivities } from "$lib/interfaces/activities";
  
  import ResumeEntity from "$lib/components/activities/resume_entity.svelte";
  import ResumeRank from "$lib/components/activities/resume_rank.svelte";
  
  export let dep_activities: DepActivities;
</script>

<ResumeRank rank="Departamento" rank_activities={dep_activities} />

<div class="uk-text-center">
  <a href="/sinai/BRA/departamento/{$page.params.id}" class="ui button disabled">
    Vista BRA Departamental
  </a>
</div>

<div class="uk-text-center">
  Número total de profesores de su departamento resgistrados en el sistema:
  ({dep_activities.professors_activities.length})
</div>

<div class="uk-text-center">
  Nota: La suma de las actividades de los profesores no es igual al total del departamento,
  pues pueden tener varios autores del mismo departamento.
</div>

<div class="ui divider" />

<ResumeEntity entity="Profesor" entity_activities={dep_activities.professors_activities} />
