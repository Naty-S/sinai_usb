<!-- 
	@component
  Modal to modify BRA period
  Only available for Dean
 -->
<script lang="ts">
  import { onMount } from "svelte";
  
  import { format_date } from "$lib/utils/formatting";

  import * as api from "$lib/api";

  import Modal from "../modal.svelte";

  export let show: boolean;
  export let close: () => void;

  let inicio: string;
  let fin: string;
  let activo: boolean;
  let ok_text = "Modificar";
  let close_text = "Cancelar";
  let action = { info: '', code: '' };

  const modify_bra_period = async function () {
    const res = await api.patch("/api/bra",
      { inicio: new Date(inicio), fin: new Date(fin), activo }
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

  onMount(async () => {
    const res = await api.get("/api/bra");
  
    if (res.ok) {
      const period = await res.json();

      inicio = format_date(period.inicio, "yyyy-MM-dd");
      fin = format_date(period.fin, "yyyy-MM-dd");
      activo = period.activo;
      
    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    }
  });
</script>

<Modal
  title="Modificar Periodo BRA"
  id="modify_bra_period"
  {ok_text}
  {close_text}
  align="center"
  is_active={show}
  {close}
  confirm={modify_bra_period}
>
  {#if action.code === "BRA Modified"}
    Período BRA modificado con éxito!!!
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
    </div>
  {/if}
</Modal>


{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    is_active={action.info !== ''}
    {close}
  >
    <p>
      Hubo un problema al intentar modificar el período BRA, por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
