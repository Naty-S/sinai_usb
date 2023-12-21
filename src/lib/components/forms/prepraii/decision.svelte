<script lang="ts">
	import type { PrepraiiRequest } from "$lib/interfaces/prepraii";
  
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { page } from "$app/stores";

  import { init } from "$lib/utils/forms/prepraii/decision/init";
  import { validation } from "$lib/utils/forms/prepraii/decision/validation";
  import { submit } from "$lib/utils/forms/prepraii/decision/submit";

  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
	import Textarea from "$lib/components/forms/textarea.svelte";
	import Radio from "$lib/components/forms/radio.svelte";

  export let prepraii: PrepraiiRequest;

  const initialValues = init(prepraii);
  const onSubmit = submit(prepraii.id, $page.url.pathname);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });
</script>

<h2>Tomar Decisión</h2>

<form
  id="prepraii_request_decision_form"
  class="ui large form segment"
  on:submit|preventDefault={handleSubmit}
  on:reset={handleReset}
>
  <Radio
    label="Decisión"
    name="estado"
    value1="Aprobado"
    value2="Rechazado"
    error={$errors.estado}
    class="ten wide field fields"
  />

  <Radio
    label="Tipo"
    name="tipo"
    value1=1
    value2=2
    error={$errors.tipo}
    class="ten wide field fields"
  />

  <Textarea
    label="Comentario al Profesor solicitante"
    name="comentario"
    bind:value={$form.comentario}
    error={$errors.comentario}
    class="required field"
  />

  <Textarea
    label="Mis obervaciones"
    name="observaciones_evaluador"
    bind:value={$form.observaciones_evaluador}
    error={$errors.observaciones_evaluador}
    class="required field"
  />

  <ActionsButtons action="Tomar Decisión" />
</form>
