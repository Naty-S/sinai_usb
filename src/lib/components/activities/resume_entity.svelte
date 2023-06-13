<!-- 
  @component
  Activities count resume table for professors or groups
 -->
<script lang="ts">
  import type { ProfessorActivities, GroupActivities } from "$lib/interfaces/activities";
  
  import EntityWithActs from "./entity_with_acts.svelte";
  import EntityWithoutActs from "./entity_without_acts.svelte";

  export let entity: string;
  export let entity_activities: ProfessorActivities[] | GroupActivities[];

</script>

<div class="ui divider" />

<EntityWithActs {entity} {entity_activities} />

<div class="ui divider" />

<EntityWithoutActs {entity} {entity_activities} />

<div class="ui divider" />
