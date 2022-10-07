<!-- Apply code to all `routes` files -->
<script lang="ts">
  import { goto } from "$app/navigation";
	import { navigating, session, page } from "$app/stores";

  import Navbar from "$components/navbar/index.svelte";
  import Loader from "$components/loader.svelte";
  import Notifications from "$components/notifications.svelte";
  import ToTop from "$components/to_top.svelte";
  
  import Login from "./sinai/login.svelte";
  import Register from "./sinai/registro.svelte";
  import Err from "./__error.svelte";

  $: user = $session.user;
</script>

<svelte:head>
	<title>SINAI</title>
</svelte:head>

<Navbar />

<main class="ui container uk-margin">
  {#if $navigating}
    <Loader />
  {:else}
    {#if user && !["login", "registro"].some(path => $page.url.pathname.includes(path))}

      {#if user.pending_professors && (user.dean || user.professor?.coord_chief)}
        <Notifications header_msg="Hay profesores pendientes por validar" >
          <a href="/sinai/validaciones/nuevos_profesores">
            Ver Profesores
          </a>
        </Notifications>
      {/if}

      <slot />

    {:else if $page.url.pathname === "/sinai/registro"}
      <Register />
    {:else if $page.url.pathname === "/sinai/login"}
      <Login />
    {:else if $page.error}
      <Err error={$page.error} status={$page.status} />
    {:else}
      {goto("/sinai/login")}
    {/if}
    
    <ToTop />
    <div class="ui divider" />
  {/if}
</main>
  
