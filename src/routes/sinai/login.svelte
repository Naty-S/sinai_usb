<script lang="ts" context="module">
  import { redirect } from "$lib/utils/session";
  
  export const load = redirect;
</script>
<script lang="ts">
  import { onMount } from "svelte";

	import { goto } from "$app/navigation";
  import { session, page } from "$app/stores";

	import Modal from "$lib/components/modal.svelte";

  import * as api from "$lib/api";

  
  $: if ($page.url.searchParams.has("validated")) {
    onMount(() => {
      const jwt = $page.url.searchParams.get("validated");
      const user = jwt ? JSON.parse(jwt) : null;

      $session.user = user;
    });
  };

  let err_info = '';
  let email = '';

  const login_dev = async function () {

    const res = await api.get("/api/auth/login_dev/" + email);

    if (res.ok) {
      $session.user = await res.clone().json();
      
      if ($session.user?.professor) {
        goto(`/sinai/actividades/profesor/${$session.user.professor.id}`);
      
      } else { // Dean
        goto("/sinai/actividades");
      };
    } else {
      const { message } = await res.clone().json();
      err_info = message;
    };
  };
</script>

<form class="ui large form">

  <div class="required field">
    <label for="">Correo</label>
    <input type="email" bind:value={email}>
  </div>

  <button type="submit" class="ui blue button" on:click|preventDefault={login_dev}>
    Iniciar Sesión
  </button>
</form>

{#if err_info !== ''}
  <Modal
    id="err_info"
    title="Error al iniciar sesión"
    close_text="Ok"
    align="center"
    pop_up={err_info !== ''}
    close={() => err_info = ''}
  >
    <span class="ui red text">Detalles: {err_info}</span>
  </Modal>
{/if}
