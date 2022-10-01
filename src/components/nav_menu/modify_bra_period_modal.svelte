<script lang="ts">
  import { onMount } from "svelte";
  
  import { format_date } from "$utils/formatting";

  import Modal from "../modal.svelte";

  export let show: boolean;
  export let close: MouseEventHandler<HTMLAnchorElement>;

  let inicio: Date;
  let fin: Date;
  let activo: boolean;
  let ok_text = "Modificar";
  let close_text = "Cancelar";
  let success = { action: '' };

  const modify_bra_period = async function () {
    try {
      const res = await fetch("/api/bra", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inicio: new Date(inicio), fin: new Date(fin), activo })
      });
  
      if (res.ok) {
        success = await res.clone().json();
        ok_text='';
        close_text="Ok";
      };
    } catch (error) {
      throw error;
    }
  };

  onMount(async () => {
    try {
      const res = await fetch("/api/bra");
    
      if (res.ok) {
        const period = await res.json();

        inicio = format_date(period.inicio, "yyyy-MM-dd") as unknown as Date;
        fin = format_date(period.fin, "yyyy-MM-dd") as unknown as Date;
        activo = period.activo;
      };      
    } catch (error) {
      throw error;
    };
  });
  $: console.log(activo)
</script>

<Modal
  title="Modificar Periodo BRA"
  id="modify_bra_period"
  {ok_text}
  {close_text}
  align="center"
  is_active={show}
  close={close}
  confirm={modify_bra_period}
>
  {#if success.action === "BRA Modified"}
    Periodo BRA modificado con exito!!!
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
