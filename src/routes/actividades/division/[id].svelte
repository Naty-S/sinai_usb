<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {    
    const res = await fetch(`/api/activities/division/${params.id}`);

    if (res.ok) {
      const division_activities: DivisionActivities = await res.json();

      return {
        props: {division_activities}
      };
    };

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
};
</script>
<script lang="ts">
  import type { DivisionActivities } from "$interfaces/activities";

  import ResumeRank from "$components/activities/resume_rank.svelte";

  export let division_activities: DivisionActivities;

</script>

<ResumeRank rank="Division" rank_activities={division_activities} />

{#each division_activities.departments_activities as dep_acts}
  <ResumeRank rank="Departamento" rank_activities={dep_acts} />
{/each}
