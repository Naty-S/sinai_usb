<!-- 
	Coordination activities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const _id = params.id;

    if (session.user?.professor?.coord_chief || session.user?.dean) {

      const res1 = await fetch(`/api/activities/coordination/${_id}`);
      const res2 = await fetch("/api/coordinations");
      let res3;

      if (Number(_id) === 4) {
        res3 = await fetch("/api/groups");
      } else {
        res3 = await fetch("/api/professors");
      };

      if (res1.ok && res2.ok && res3.ok) {
        
        const activities: Activities = parse(await res1.text());
        const coords: Coordination[] = await res2.json();

        let profesores: Profesor[];
        let grupos: GroupE[];
        let ranks: Department[] | GroupE[];

        if (Number(_id) === 4) {
          grupos = await res3.json();
          ranks = grupos;
        } else {
          profesores = await res3.json();
          ranks = coords.find(c => c.id === Number(_id))?.departamentos || [];
        };

        const ranks_activities: Activities[] = ranks.map(r => {

          let full_name = '';
          let activitys: Activity[] = [];

          if (Number(_id) === 4) {
            full_name = `del Grupo de ${r.nombre}`;
            activitys = activities.activities.filter(a => a.groups.map(g => g.id).includes(r.id))
          } else {
            full_name = `del Departamento de ${r.nombre}`;
            const dep_profs = profesores.filter(p => p.departamento === r.id).map(p => p.correo);
            activitys = activities.activities.filter(a => dep_profs.includes(a.creada_por))
          };

          return {
            owner: {
              id: r.id,
              name: r.nombre,
              full_name
            },
            activities: activitys
          }
        });

        return {
          props: {activities, ranks_activities}
        };
      };
  
      const { message: msg1, code: code1 } = await res1.json();
      const { message: msg2, code: code2 } = await res2.json();
      const { message: msg3, code: code3 } = await res2.json();
      return {
        error: new Error(`Error al cargar los datos de la Coordinación.\n${code1}. ${msg1}\n\
          ${code2}. ${msg2}\n${code3}. ${msg3}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como Coordinador o Decano"),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import type { Activities } from "$lib/interfaces/activities";
	import type { Coordination } from "$lib/interfaces/coordinations";
	import type { Group, GroupE } from "$lib/interfaces/groups";
	import type { Profesor } from "$lib/interfaces/professors";
	import type { Activity } from "$lib/types/activities";

  import { parse } from "zipson";
  
  import ResumeRank from "$lib/components/activities/resume_rank.svelte";
	import type { Department } from "$lib/interfaces/departments";

  export let activities: Activities;
  export let ranks_activities: Activities[];

  const rank = activities.owner.id === 4 ? "grupo" : "departamento";
</script>

<ResumeRank rank="coordinacion" rank_activities={activities} />

{#each ranks_activities as rank_activities}
  <ResumeRank {rank} {rank_activities} />
{/each}
