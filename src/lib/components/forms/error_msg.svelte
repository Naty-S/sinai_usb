<!-- 
	@component
  Form field error card

  Props:
  * `error`: any
 -->
<script lang="ts">
  export let error: any;
</script>

{#if error}
  <div class="ui mini error message">
    {error}
  </div>
{/if}
