<!-- Apply code to all `routes` files -->
<script lang="ts">
	import { navigating, session, page } from "$app/stores";

  import NavMenu from "$components/nav_menu/nav_menu.svelte";
  import Loader from "$components/loader.svelte";
  import Notifications from "$components/notifications.svelte";
  import ToTop from "$components/to_top.svelte";
  import Login from "./sinai/login.svelte";
</script>

<NavMenu />
<Notifications />

<main class="ui container uk-margin">
  {#if $navigating}
    <Loader />
  {:else}
    {#if $session.user && $page.url.pathname !== "/sinai/login"}
      <slot />
      <ToTop />
      <div class="ui divider" />
    {:else}
      <Login />
    {/if}
  {/if}
</main>
  
