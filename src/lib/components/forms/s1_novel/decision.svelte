<script lang="ts">
  import { setContext } from "svelte";
  import { key } from "svelte-forms-lib";

  import Modal from "$lib/components/modals/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import ErrorMsg from "$lib/components/forms/error_msg.svelte";
	import Textarea from "$lib/components/forms/textarea.svelte";
	import Radio from "$lib/components/forms/radio.svelte";

  export let jury_usb;
  export let jury_out;
  export let action: { info: string, code: string };
  export let f;
  
  const { form, errors, handleChange, handleSubmit, handleReset } = f;
  
  setContext(key, { form, errors, handleChange });
</script>

<h2>Tomar decision</h2>

<form
  id="s1_novel_request_decision_form" class="ui large form segment"
  on:submit|preventDefault={handleSubmit}
  on:reset={handleReset}
>
  
  <div class="fields">
    {#each jury_usb as j_usb, i}
      <div class="required field" class:error={$errors.jurado_usb[i].veredicto}>
        <label for="jurado_usb[{i}].veredicto">
          Veredicto del Jurado: {j_usb.Profesor.nombre1}, {j_usb.Profesor.apellido1}
        </label>
        <input
          type="file"
          name="jurado_usb[{i}].veredicto"
          accept=".pdf"
          bind:value={$form.jurado_usb[i].veredicto}
          on:change={handleChange}
        />

        <ErrorMsg error={$errors.jurado_usb[i].veredicto} />
      </div>
    {/each}
  </div>

  <div class="fields">
    {#each jury_out as j_out, i}
      <div class="required field" class:error={$errors.jurado_externo[i].veredicto}>
        <label for="jurado_externo[{i}].veredicto">Veredicto del Jurado: {j_out.nombre}</label>
        <input
          type="file"
          name="jurado_externo[{i}].veredicto"
          accept=".pdf"
          bind:value={$form.jurado_externo[i].veredicto}
          on:change={handleChange}
        />
          
        <ErrorMsg error={$errors.jurado_externo[i].veredicto} />
      </div>
    {/each}
  </div>

  <Radio
    label="Decisión"
    name="s1_novel.estado"
    value1="Aprobado"
    value2="Rechazado"
    error={$errors.s1_novel.estado}
    class="ten wide field fields"
  />

  <Textarea
    label="Comentario al Profesor solicitante"
    name="s1_novel.comentario"
    bind:value={$form.s1_novel.comentario}
    error={$errors.s1_novel.comentario}
    class="required field"
  />

  <Textarea
    label="Mis obervaciones"
    name="s1_novel.observaciones_evaluador"
    bind:value={$form.s1_novel.observaciones_evaluador}
    error={$errors.s1_novel.observaciones_evaluador}
    class="required field"
  />

  <ActionsButtons action="Tomar decisión" />
</form>

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={location.reload}
  >
    <p>
      Hubo un problema al cargar el jurado, por favor recargue la página
      o contáctese con algún administrador proporcionando el código del error.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
