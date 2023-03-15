<!-- 
  @component
  Shows the departament activities resume.
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params, session }) => {

    const user = session.user;
    
    if (user?.professor?.is_dep_chief || user?.professor?.is_dep_representative) {

      const res = await fetch(`/api/activities/department/${params.id}`);
     
      if (res.ok) {
        const dep_activities = await res.json();
  
        return {
          props: { dep_activities }
        };
      };
  
      const { message } = await res.json();
      return {
        error: new Error(message)
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como jefe o representante."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import { page } from "$app/stores";

  import type { DepActivities } from "$interfaces/activities";
  
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
  Numero total de profesores de su departamento resgistrados en el sistema:
  ({dep_activities.professors_activities.length})
</div>

<div class="uk-text-center">
  Nota: La suma de las actividades de los profesores no es igual al total del departamento,
  pues pueden tener varios autores del mismo departamento.
</div>

<div class="ui divider" />

<ResumeEntity entity="Profesor" entity_activities={dep_activities.professors_activities} />
