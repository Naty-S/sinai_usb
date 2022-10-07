<!-- 
  @component
  Shows all activities for the Dean
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean) {
      const res = await fetch("/api/activities");
    
      if (res.ok) {
        const activities = await res.json();

        return {
          props: { activities }
        };
      };

      const { message } = await res.json();
      return {
        error: new Error(message)
      };
    } else {
      return {
        error: new Error("Acceso denegado. Uso exclusivo del Decano."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import type { DeanActivities } from "$interfaces/activities";

  import ResumeRank from "$components/activities/resume_rank.svelte";

  export let activities: DeanActivities;
</script>

{#each activities.coordinations_activities as coord_activities}
  <ResumeRank rank="Coordinacion" rank_activities={coord_activities} />
{/each}

{#each activities.divisions_activities as division_activities}
  <ResumeRank rank="División" rank_activities={division_activities} />
{/each}
