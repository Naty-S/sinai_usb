<!-- Apply code to all `routes` files -->
<script lang="ts">
	import { navigating, session } from "$app/stores";

  import NavMenu from "$components/nav_menu/nav_menu.svelte";
  import Loader from "$components/loader.svelte";
  import Notifications from "$components/notifications.svelte";
  import ToTop from "$components/to_top.svelte";
</script>

<NavMenu />
<Notifications />

<main class="uk-margin">
  <div class="ui container">
    {#if $navigating}
      <Loader />
    {:else}
      <!-- {#if $session.user} -->
        <slot />
        <ToTop />
        <div class="ui divider" />
      <!-- {:else}
        ERROR no legeado
      {/if} -->
    {/if}
  </div>
</main>
  
