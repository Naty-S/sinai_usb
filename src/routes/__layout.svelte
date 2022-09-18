<!-- Apply code to all `routes` files -->
<script lang="ts">
	import { navigating } from "$app/stores";

  import NavMenu from "$components/nav_menu/nav_menu.svelte";
  import Loader from "$components/loader.svelte";
  import Notifications from "$components/notifications.svelte";
</script>

<NavMenu />
<Notifications />

<main class="uk-margin">
  <div class="ui container">
    {#if $navigating}
      <Loader />
    {:else}
      <slot />
      <a href="#sinai_navabar" uk-totop uk-scroll class="uk-float-right">
        Top
      </a>
      <div class="ui divider" />
    {/if}
  </div>
</main>
  
