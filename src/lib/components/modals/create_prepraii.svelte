<!-- 
	@component
  Modal to manage PREPRAII
  Only available for Dean
 -->
<script lang="ts">
	import type { Prepraii } from "$lib/interfaces/prepraii";

  import { onMount } from "svelte";
  
  import * as api from "$lib/api";

  import { format_date } from "$lib/utils/formatting";

  import Modal from "./modal.svelte";

  export let pop_up: boolean;
  export let close: () => void;

  let inicio = format_date(new Date(), "yyyy-MM-dd");
  let fin = format_date(new Date(), "yyyy-MM-dd");
  let activo = true;
  let monto_tipo1 = 0;
  let monto_tipo2 = 0;

  let ok_text = "Crear";
  let close_text = "Cancelar";
  let action = { info: '', code: '' };

  const create_prepraii = async function () {
    const res = await api.post("/api/prepraii",
      { inicio: new Date(inicio), fin: new Date(fin), activo, monto_tipo1, monto_tipo2 }
    );

    if (res.ok) {
      const { code } = await res.clone().json();
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
  title="Actualizar PREPRAII"
  id="create_prepraii"
  {ok_text}
  {close_text}
  align="center"
  {pop_up}
  {close}
  confirm={create_prepraii}
>
  {#if action.code === "prepraii_created"}
    PREPRAII actualizado con éxito!!!
  {:else}
    <div class="ui centered grid container">
      <div class="two column row">
        <div class="center aligned column">
          <label for="init_date">Fecha Inicio</label>
          <input
            type="date"
            name="init_date"
            bind:value={inicio}
          >
        </div>
        <div class="center aligned column">
          <label for="final_date">Fecha Final</label>
          <input
            type="date"
            name="final_date"
            bind:value={fin}
          >
        </div>      
      </div>
      <div class="row">
        <label for="active">Activo</label>
        <input
          type="checkbox"
          name="active"
          bind:value={activo}
          bind:checked={activo}
        >
      </div>
      <div class="two column row">
        <div class="center aligned column">
          <label for="monto_tipo1">Monto tipo 1 (Bs.)</label>
          <input
            type="number"
            name="monto_tipo2"
            bind:value={monto_tipo1}
          >
        </div>
        <div class="center aligned column">
          <label for="monto_tipo2">Monto tipo 2 (Bs.)</label>
          <input
            type="number"
            name="monto_tipo2"
            bind:value={monto_tipo2}
          >
        </div>      
      </div>
    </div>
  {/if}
</Modal>


{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    {close}
  >
    <p>
      Hubo un problema al intentar actualizar el PREPRAII, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
