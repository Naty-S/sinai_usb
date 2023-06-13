<!-- 
	@component
  Exposicion activity form
 -->
<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";
  
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";

  import CountryStates from "./country_states.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  SELECCIÓN EN EXPOSICIONES, BIENALES, SALONES O CONCURSOS ARBITRADOS
</h2>

<div name="exposicion form">
  <Input
    label="Título de la Obra"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre del Evento"
    name="exposicion.nombre_evento"
    bind:value={$form.exposicion.nombre_evento}
    error={$errors.exposicion.nombre_evento}
    class="required field"
  />
  <div class="three inline required fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha"
      name="exposicion.fecha"
      bind:value={$form.exposicion.fecha}
      error={$errors.exposicion.fecha}
      class="field"
    />
  </div>
  <Input
    label="Categoría"
    name="exposicion.categoria"
    bind:value={$form.exposicion.categoria}
    error={$errors.exposicion.categoria}
    class="inline field"
  />  
  <div class="two inline fields">
    <Input
      label="Organizado Por"
      name="exposicion.organizado_por"
      bind:value={$form.exposicion.organizado_por}
      error={$errors.exposicion.organizado_por}
      class="eight wide field"
    />
    <Input
      label="Financiado Por"
      name="exposicion.financiado_por"
      bind:value={$form.exposicion.financiado_por}
      error={$errors.exposicion.financiado_por}
      class="eight wide field"
    />
  </div>
</div>
