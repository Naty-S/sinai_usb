<!--
  TODO: Show options for login, register or public inquiries
-->
<script lang="ts" context="module">
  import { redirect } from "$lib/utils/session";
  
  export const load = redirect;
</script>
<script lang="ts">
  import { page } from "$app/stores";

	import Modal from "$lib/components/modal.svelte";

  import Consultas from "./consultas/index.svelte";

  $: not_registered = Boolean($page.url.searchParams.get("no_registro"));
</script>

<Consultas />

{#if not_registered}
  <Modal
    id="not_registered"
    title="Error al iniciar sesión"
    close_text="Ok"
    align="center"
    is_active={not_registered}
    close={() => location.replace($page.url.pathname)}
  >
    Usted no se encuentra registrado en el sistema del SINAI.
  </Modal>
{/if}
