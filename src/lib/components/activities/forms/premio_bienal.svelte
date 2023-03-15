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
  TRABAJOS RECONOCIDOS O PREMIADOS EN BIENALES, SALONES, CONCURSOS O EXPOSICIONES
</h2>

<div name="premio_bienal form">
  <Input
    label="Título de la Obra"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Título del Premio"
    name="premio_bienal.titulo_premio"
    bind:value={$form.premio_bienal.titulo_premio}
    error={$errors.premio_bienal.titulo_premio}
    class="required field"
  />
  <Input
    label="Nombre del Evento"
    name="premio_bienal.nombre_evento"
    bind:value={$form.premio_bienal.nombre_evento}
    error={$errors.premio_bienal.nombre_evento}
    class="required field"
  />
  <div class="three inline required fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha del Evento"
      name="premio_bienal.fecha"
      bind:value={$form.premio_bienal.fecha}
      error={$errors.premio_bienal.fecha}
      class="field"
    />
  </div>
  <Input
    label="Categoría"
    name="premio_bienal.categoria"
    bind:value={$form.premio_bienal.categoria}
    error={$errors.premio_bienal.categoria}
    class="required field"
  />
  <div class="two inline fields">
    <Input
      label="Institución organizadora"
      name="premio_bienal.organizado_por"
      bind:value={$form.premio_bienal.organizado_por}
      error={$errors.premio_bienal.organizado_por}
      class="eight wide field"
    />
    <Input
      label="Financiado Por"
      name="premio_bienal.financiado_por"
      bind:value={$form.premio_bienal.financiado_por}
      error={$errors.premio_bienal.financiado_por}
      class="eight wide field"
    />
  </div>
</div>
