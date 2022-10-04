<!-- Apply code to all `routes` files -->
<script lang="ts">
	import { navigating, session, page } from "$app/stores";

  import Navbar from "$components/navbar/index.svelte";
  import Loader from "$components/loader.svelte";
  import Notifications from "$components/notifications.svelte";
  import ToTop from "$components/to_top.svelte";
  import Login from "./sinai/login.svelte";

  $: user = $session.user;
</script>

<Navbar />

{#if user?.pending_professors && (user?.dean || user?.professor?.coord_chief)}
  <Notifications header_msg="Hay profesores pendientes por validar" >
    <a href="/sinai/validaciones/nuevos_profesores">
      Ver Profesores
    </a>
  </Notifications>
{/if}

<main class="ui container uk-margin">
  {#if $navigating}
    <Loader />
  {:else}
    {#if ($session.user && $page.url.pathname !== "/sinai/login") || $page.url.pathname === "/sinai/registro"}
      <slot />
      <ToTop />
      <div class="ui divider" />
    {:else}
      <Login />
    {/if}
  {/if}
</main>
  
