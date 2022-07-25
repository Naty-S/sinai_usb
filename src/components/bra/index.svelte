<script>
  import ActsByYear from "$components/activities/acts_by_year.svelte";
  import BraHeader from "$components/bra/header.svelte";

  export let activities = {year: '1', acts: {}}
</script>

<BraHeader />
<ActsByYear {activities} />
