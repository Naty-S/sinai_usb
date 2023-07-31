<!-- 
  Departament activities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const _id = params.id;
    const user = session.user;
    const professor = user?.professor;

    if (user?.dean || professor?.coord_chief ||
        professor?.is_dep_chief || professor?.is_dep_representative
    ) {
      const res1 = await fetch(`/api/activities/department/${_id}`);
      const res2 = await fetch("/api/professors");
     
      if (res1.ok && res2.ok) {
        
        const activities: Activities = await res1.json();
        const profesores: Profesor[] = await res2.json();

        const professors = profesores.filter(p => p.departamento === Number(_id));
        const professors_activities: Activities[] = activities.activities.map(a => {

          const prof = professors.find(p => p.correo === a.creada_por);
          const acts: Activity[] = activities.activities.filter(a => a.creada_por === prof?.correo);
          const owner = {
            id: prof?.id || 0,
            name: prof?.nombre1 + ", " + prof?.apellido1 || "Usuario Ficticio",
            full_name: '',
          };
          
          return { owner, activities: acts };
        });
  
        return {
          props: {
              activities
            , professors_activities
          }
        };
      };
  
      const { message, code } = await res1.json();
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

  import type { Activities } from "$lib/interfaces/activities";
	import type { Profesor } from "$lib/interfaces/professors";
	import type { Activity } from "$lib/types/activities";
  
  import ResumeEntity from "$lib/components/activities/resume_entity.svelte";
  import ResumeRank from "$lib/components/activities/resume_rank.svelte";
  
  export let activities: Activities;
  export let professors_activities: Activities[];
</script>

<ResumeRank rank="departamento" rank_activities={activities} />

<div class="uk-text-center">
  <a href="/sinai/BRA/departamento/{$page.params.id}" class="ui button disabled">
    Vista BRA Departamental
  </a>
</div>

<div class="uk-text-center">
  Número total de profesores de su departamento resgistrados en el sistema:
  ({professors_activities.length})
</div>

<div class="uk-text-center">
  Nota: La suma de las actividades de los profesores no es igual al total del departamento,
  pues pueden tener varios autores del mismo departamento.
</div>

<div class="ui divider" />

<ResumeEntity entity="profesor" entity_activities={professors_activities} />
