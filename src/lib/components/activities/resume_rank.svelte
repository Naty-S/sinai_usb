<!-- 
  @component
  Activities count resume table for group, department, coordination or division
 -->
<script lang="ts">
  import type {	Activities } from "$lib/interfaces/activities";

  import { acts_kinds_by_year } from "$lib/utils/grouping";
  import { count_acts_kinds_by_year } from "$lib/utils/maths";
  
  import ResumeTable from "./resume_table.svelte";
  
  export let rank: string;
  export let rank_activities: Activities;

  const rank_id = rank_activities.owner.id;
  const rank_name = rank_activities.owner.name;
  const rank_page = `/sinai/actividades/${rank}/${rank_id}`;
  const activities_by_year = acts_kinds_by_year(rank_activities.activities);
  const activities_count = count_acts_kinds_by_year(rank_activities.activities);
</script>

{#if rank_activities.activities.length > 0}

  <div class="ui divider" />

  <h2 class="ui blue header uk-text-center">
    <a href="{rank_page}">
      <!-- {rank} "{rank_name}" tiene en el sistema -->
      Actividades en el sistema {rank_activities.owner.full_name}
    </a>
  </h2>

  <ResumeTable
    headers={["Actividad"].concat(activities_by_year.map(a => a.year.toString()))}
    resume_kinds_counts={activities_count}
    row_total
  />

  <div class="ui divider" />

{/if}
