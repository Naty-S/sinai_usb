<script lang="ts">
  import Modal from "$lib/components/modals/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import ErrorMsg from "$lib/components/forms/error_msg.svelte";

  export let jury_usb: any[];
  export let jury_out: any[];
  export let action: { info: string, code: string };
  export let f;
  
  const { form, errors, handleChange, handleSubmit, handleReset } = f;
</script>

<h2>Tomar decision</h2>

<form id="s1_novel_request_decision_form" class="ui large form segment" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>
  
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

  <div class="ten wide field fields" class:error={$errors.s1_novel.estado}>
    <label for="s1_novel.estado">Decisión</label>
    <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
      <label>
        <input
          type="radio"
          id="s1_novel.estado-Aprobado"
          name="s1_novel.estado"
          value="Aprobado"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
          checked
        >
        Aprobado
      </label>
      <label>
        <input
          type="radio"
          id="s1_novel.estado-Rechazado"
          name="s1_novel.estado"
          value="Rechazado"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
        >
        Rechazado
      </label>
    </div>

    <ErrorMsg error={$errors.s1_novel.estado} />
  </div>

  <div class="required field" class:error={$errors.s1_novel.comentario}>
    <label for="s1_novel.comentario">Comentario al Profesor solicitante:</label>
    <textarea
      name="s1_novel.comentario"
      bind:value={$form.s1_novel.comentario}
      rows="5"
      cols="50"
      aria-label="Textarea"
    />
    <ErrorMsg error={$errors.s1_novel.comentario} />
  </div>

  <div class="required field" class:error={$errors.s1_novel.observaciones_evaluador}>
    <label for="s1_novel.observaciones_evaluador">Mis obervaciones:</label>
    <textarea
      name="s1_novel.observaciones_evaluador"
      bind:value={$form.s1_novel.observaciones_evaluador}
      rows="5"
      cols="50"
      aria-label="Textarea"
    />
    <ErrorMsg error={$errors.s1_novel.observaciones_evaluador} />
  </div>

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
