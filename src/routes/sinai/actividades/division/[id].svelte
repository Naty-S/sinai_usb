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
        
        const activities: Activities = parse(await res1.text());
        const divisions: Division[] = await res2.json();
        const profesores: Profesor[] = await res3.json();

        const departments = divisions.find(c => c.id === Number(_id))?.departamentos || [];
        const deparments_activities: Activities[] = departments.map(d => {

          const dep_profs = profesores.filter(p => p.departamento === d.id).map(p => p.correo);

          return {
            owner: {
              id: d.id,
              name: d.nombre,
              full_name: `del Departamento de ${d.nombre}`
            },
            activities: activities.activities.filter(a => dep_profs.includes(a.creada_por))
          }
        });

        return {
          props: {activities, deparments_activities}
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
  
  import { parse } from "zipson";

  import ResumeRank from "$lib/components/activities/resume_rank.svelte";

  export let activities: Activities;
  export let deparments_activities: Activities[];
</script>

<ResumeRank rank="division" rank_activities={activities} />

{#each deparments_activities as rank_activities}
  <ResumeRank rank="departamento" {rank_activities} />
{/each}
