<!-- 
  Updates  .
 -->
<script lang="ts">
  import type { ProfessorE } from "$lib/interfaces/professors";
	import type { PrepraiiRequest } from "$lib/interfaces/prepraii";

  import * as api from "$lib/api";

	import Modal from '$lib/components/modals/modal.svelte';
  
  export let prepraii: PrepraiiRequest;
  export let chiefs: ProfessorE[];
  export let show_reasign: boolean;
  
  let ok_text = "Reasignar";
  let close_text = "Cancelar";
  let action = { info: '', code: '' };

  const reasign_coord = async function () {
    const res = await api.patch("/api/prepraii/request", {
      prepraii: prepraii.id,
      data: { evaluador: prepraii.evaluador }
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
  id="reasign_coord"
  title="Reasignar Coordinador"
  {ok_text}
  {close_text}
  align="center"
  pop_up={show_reasign}
  close={() => { show_reasign = false; location.reload(); }}
  confirm={reasign_coord}
>
  {#if action.code === "Exito"}
    <p>Coordinador reasignado con éxito!!!</p>
  {:else}
    <div class="ui centered container">
      <select
        id="search-select"
        name="coord"
        class="ui fluid search selection dropdown"
        bind:value={prepraii.evaluador}
      >
        {#each chiefs.map(c => ({ val: c.id, name: c })) as opt}
          <option value={opt.val}>{opt.name.name1}, {opt.name.surname1}</option>
        {/each}
      </select>
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
    close={() => { action.info = ''; location.reload(); }}
  >
    <p>
      Hubo un error al intentar reasignar Coordinador,
      por favor vuelva a intentar o contáctese con algún administrador proporcionando
      el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
