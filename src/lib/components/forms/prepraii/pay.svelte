<script lang="ts">
	import type { PrepraiiRequest } from "$lib/interfaces/prepraii";

  import * as api from "$lib/api";

	import Modal from '$lib/components/modals/modal.svelte';

  export let prepraii: PrepraiiRequest;
  export let show_pay: boolean;

  let ok_text = "Pagar";
  let close_text = "Cancelar";
  let action = { info: '', code: '' };

  const pay = async function () {
    const res = await api.patch("/api/prepraii/request", {
      prepraii: prepraii.id,
      data: { pagada: true }
    });

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      ok_text='';
      close_text="Ok";

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };
</script>

<Modal
  id="pay_request"
  title="Pagar Solicitud"
  {ok_text}
  {close_text}
  align="center"
  pop_up={show_pay}
  close={() => { show_pay = false; location.reload(); }}
  confirm={pay}
>
  {#if action.code === "Exito"}
    <p>Solicitud pagada con éxito!!!</p>
  {:else}
    <p>¿Esá seguro que desea pagar esta solicitud?</p>
    <p>{prepraii.Actividad.titulo}</p>
    <p>Monto: {prepraii.monto} Bs.</p>
  {/if}
</Modal>

{#if action.info !== ''}  
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={() => { action.info = ''; location.reload(); }}
  >
    <p>
      Hubo un error al intentar pagar solicitud,
      por favor vuelva a intentar o contáctese con algún administrador proporcionando
      el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
