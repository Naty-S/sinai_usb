<!-- Apply code to all `routes` files -->
<script>
	import { navigating } from "$app/stores";

  import Menu from "$components/menu/menu.svelte";
  import Loader from "$components/loader.svelte";
</script>

<Menu />

<main>
  <div class="ui container">
    {#if $navigating}
      <Loader />
    {:else}
      <slot />
      <div class="ui divider" />
    {/if}
  </div>
</main>
  
