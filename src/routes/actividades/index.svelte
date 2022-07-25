<script context="module" lang="ts">
  
  import type { Load } from "@sveltejs/kit";
  import type { YearActivities } from "$types/db/actividades";

  // https://kit.svelte.dev/docs/loading
  // TODO: store in 'stores'
  export const load: Load = async ({ fetch, params }) => {
    const rol = params;
    const res = await fetch("/api/actividades/" + rol);
   
    if (res.ok) {
      const activities: YearActivities[] = await res.json();

      return {
        props: {activities}
      }
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
};
</script>

<script>
  export let activities
</script>
