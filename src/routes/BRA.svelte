<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import ResumeTable from "$components/resume_table.svelte";

  // https://kit.svelte.dev/docs/loading
  // TODO: fetch from 'stores'
  export const load: Load = async ({ fetch }) => {    
    const res = await fetch("/api/actividades/eduardo@usb.ve");
   
    if (res.ok) {
      const prof_activities: YearActivities[] = await res.json();

      return {
        props: {prof_activities}
      }
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
};
</script>

<script lang="ts">
  import type { Actividad, YearActivities } from "$types/db/actividades";

  import ActsByYear from "$components/activities/acts_by_year.svelte";
  import BraHeader from "$components/bra/header.svelte";

  export let prof_activities: YearActivities[];

  const count_acts = (acts: Record<string, Actividad[]>) => {
    return Object.entries(acts).reduce((count, [_, _acts]) => count + _acts.length, 0)
  }
</script>

<BraHeader />

<!-- Display activities resume table -->
<!-- TODO: #20 -->
<ResumeTable
  headers={["Actividad", "Anio1", "Anio1"]}
  acts_counts={Array(2).fill("activity kind count")}
  resume_kinds={["act1", "act2"]}
  n_column="four column"
  row_total
  col_total
/>

<!-- Display activities by year -->
{#each prof_activities.reverse() as activities}
  <ActsByYear {activities}/>
{/each}
