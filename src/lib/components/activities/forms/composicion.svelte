<!-- 
	@component
  Composicion activity form
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";
  import { composicion_categoria_enum } from "@prisma/client";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";
  
  import CountryStates from "./country_states.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  COMPOSICIONES SOLICITADAS POR ORQUESTAS SINFÓNICAS O AGRUPACIONES RECONOCIDAS
</h2>

<div name="composicion form">
  <Input
    label="Título de la Obra"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre del Evento"
    name="composicion.nombre_evento"
    bind:value={$form.composicion.nombre_evento}
    error={$errors.composicion.nombre_evento}
    class="required field"
  />
  <div class="three inline required fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha"
      name="composicion.fecha"
      bind:value={$form.composicion.fecha}
      error={$errors.composicion.fecha}
      class="field"
    />
  </div>
  <Select
    label="Categoría"
    name="composicion.categoria"
    bind:value={$form.composicion.categoria}
    options={Object.entries(composicion_categoria_enum).map(([_, cat]) => ({ val: cat, name: cat }))}
    class="inline field"
  />
  <div class="two inline fields">
    <Input
      label="Financiado Por"
      name="composicion.jurado"
      bind:value={$form.composicion.jurado}
      error={$errors.composicion.jurado}
      class="ten wide required field"
    />
    <Input
      label="Jurado, Árbitro o Comité Editorial"
      name="composicion.financiado_por"
      bind:value={$form.composicion.financiado_por}
      error={$errors.composicion.financiado_por}
      class="eight wide field"
    />
  </div>
</div>
