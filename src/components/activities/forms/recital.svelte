<script lang="ts">
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { init  } from "$lib/shared/forms/init";
  import { validationSchema  } from "$lib/shared/forms/validation";
  import { submit  } from "$lib/shared/forms/submit";

  import ActionsButtons from "./actions_buttons.svelte";
  import Authors from "./authors.svelte";
  import CountryStates from "./country_states.svelte";
  import Observaciones from './observaciones.svelte';
  import Input from "./input.svelte";

  const initialValues = init("recital");
  const onSubmit = submit("recital");
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });
</script>

<h2 class="uk-text-center">
  RECITALES O CONCIERTOS ARBITRADOS
</h2>

<form class="ui large form" on:submit|preventDefault={handleSubmit}>
  <Input
    label="Título de la Obra"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre del Evento"
    name="recital.nombre_evento"
    bind:value={$form.recital.nombre_evento}
    error={$errors.recital.nombre_evento}
    class="required field"
  />
  <div class="three inline fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha del Evento"
      name="recital.fecha_evento"
      bind:value={$form.recital.fecha_evento}
      error={$errors.recital.fecha_evento}
      class="required field"
    />
  </div>
  <div class="two inline fields">
    <Input
      label="Jurado o Árbitro"
      name="recital.jurado"
      bind:value={$form.recital.jurado}
      error={$errors.recital.jurado}
      class="eight wide required field"
    />
    <Input
      label="Financiado Por"
      name="recital.financiado_por"
      bind:value={$form.recital.financiado_por}
      error={$errors.recital.financiado_por}
      class="eight wide field"
    />
  </div>
  <Authors />
  <Observaciones />
  <ActionsButtons />
</form>
