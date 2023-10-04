<!--
  
-->
<script lang="ts" context="module">
  import { redirect } from "$lib/utils/session";
  
  export const load = redirect;
</script>
<script lang="ts">
  import { page } from "$app/stores";

	import Modal from "$lib/components/modals/modal.svelte";

  import Consultas from "./consultas/actividades/index.svelte";

  $: not_registered = Boolean($page.url.searchParams.get("no_registro"));
</script>

<Consultas />

{#if not_registered}
  <Modal
    id="not_registered"
    title="Error al iniciar sesión"
    close_text="Ok"
    align="center"
    pop_up={not_registered}
    close={location.reload}
  >
    Usted no se encuentra registrado en el sistema del SINAI.
  </Modal>
{/if}
