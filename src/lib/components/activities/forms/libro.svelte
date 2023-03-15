<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$lib/components/forms/input.svelte";

  import CountryStates from "./country_states.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  LIBROS PUBLICADOS
</h2>

<div name="libro form">
  <Input
    label="Título"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre de la Editorial"
    name="libro.editorial"
    bind:value={$form.libro.editorial}
    error={$errors.libro.editorial}
    class="required field"
  />
  <div class="three inline required fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha"
      name="libro.fecha"
      bind:value={$form.libro.fecha}
      error={$errors.libro.fecha}
      class="field"
    />
  </div>  
  <div class="two inline fields">
    <Input
      label="ISBN"
      name="libro.isbn"
      bind:value={$form.libro.isbn}
      error={$errors.libro.isbn}
      class="required field"
    />
    <Input
      type="checkbox"
      label="Aceptado para Publicación"
      name="libro.aceptado"
      bind:value={$form.libro.aceptado}
      class="inline field"
    />
  </div>
</div>
