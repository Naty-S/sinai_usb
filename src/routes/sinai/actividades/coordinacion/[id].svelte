<!-- 
	Coordination activities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params, session }) => {

    if (session.user?.professor?.coord_chief || session.user?.dean) {

      const res = await fetch(`/api/activities/coordination/${params.id}`);
  
      if (res.ok) {
        const coord_activities: CoordActivities = await res.json();
  
        return {
          props: {coord_activities}
        };
      };
  
      const { message } = await res.json();
      return {
        error: new Error("Error al cargar las actividades de la Coordinación.\n" + message),
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
  import type { CoordActivities } from "$lib/interfaces/activities";

  import ResumeEntity from "$lib/components/activities/resume_entity.svelte";
  import ResumeRank from "$lib/components/activities/resume_rank.svelte";

  import Err from "../../../__error.svelte";

  export let coord_activities: CoordActivities;

  const departments_activities = coord_activities.departments_activities;
  const groups_activities = coord_activities.groups_activities;
  
</script>

<ResumeRank rank="Coordinacion" rank_activities={coord_activities} />

{#if groups_activities}

  {#each groups_activities as g}
    <ResumeRank rank="Grupo" rank_activities={g} />
  {/each}

  <ResumeEntity entity="Grupo" entity_activities={groups_activities}/>

{:else if departments_activities}

  {#each departments_activities as dep_acts}
    <ResumeRank rank="Departamento" rank_activities={dep_acts} />
  {/each}

{:else}
  <!-- This should not happen -->
  <Err error={new Error("Actividades para la coordinación no encontradas.")} status={500} />
{/if}
