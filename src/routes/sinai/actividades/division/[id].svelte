<!-- 
	Division actities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const _id = params.id;

    if (session.user?.professor?.division_chief || session.user?.dean) {

      const res1 = await fetch(`/api/activities/division/${_id}`);
      const res2 = await fetch("/api/divisions");
      const res3 = await fetch("/api/professors");

      if (res1.ok && res2.ok && res3.ok) {
        
        const activities = await res1.json();
        const divisions: Division[] = await res2.json();
        const div_deps: number[] = divisions.find(c => c.id === Number(_id))?.departamentos.map(d => d.id) || [];
        const profesores: Profesor[] = await res3.json();
        const professors = profesores.filter(p => div_deps.includes(p.departamento));

        return {
          props: {activities: parse(activities), professors}
        };
      };
  
      const { message: msg1, code: code1 } = await res1.json();
      const { message: msg2, code: code2 } = await res2.json();
      const { message: msg3, code: code3 } = await res2.json();
      return {
        error: new Error(`Error al cargar los datos de la División.\n${code1}. ${msg1}\n\
          ${code2}. ${msg2}\n${code3}. ${msg3}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como jefe de División o Decano."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import type { Activities } from "$lib/interfaces/activities";
	import type { Division } from "$lib/interfaces/divisions";
	import type { Profesor } from "$lib/interfaces/professors";
	import type { Activity } from "$lib/types/activities";
  
  import { parse } from "zipson";

  import ResumeRank from "$lib/components/activities/resume_rank.svelte";

  export let activities: Activities;
  export let professors: Profesor[];

  const ranks_activities: Activities[] = activities.activities.map(a => {

    const prof = professors.find(p => p.correo === a.creada_por);
    const acts: Activity[] = activities.activities.filter(a => a.creada_por === prof?.correo);
    const owner = {
      id: prof?.id || 0,
      name: prof?.nombre1 + ", " + prof?.apellido1 || "Usuario Ficticio",
      full_name: '',
    };
    
    return { owner, activities: acts };
  });
</script>

<ResumeRank rank="division" rank_activities={activities} />

{#each ranks_activities as rank_activities}
  <ResumeRank rank="departamento" {rank_activities} />
{/each}
