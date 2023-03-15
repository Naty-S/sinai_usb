<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { partitura_categoria_enum } from "@prisma/client";

  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  PARTITURAS, VIDEOS O CDs PUBLICADOS EN EDITORIALES RECONOCIDAS
</h2>

<div name="partitura form">
  <Input
    label="Título de la Obra"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre de la Editorial"
    name="partitura.editorial"
    bind:value={$form.partitura.editorial}
    error={$errors.partitura.editorial}
    class="required field"
  />
  <div class="two inline fields">
    <Input
      type="date"
      label="Fecha del Evento"
      name="partitura.fecha"
      bind:value={$form.partitura.fecha}
      error={$errors.partitura.fecha}
      class="required field"
    />
    <Input
      type="checkbox"
      label="Nacional"
      name="partitura.nacional"
      bind:value={$form.partitura.nacional}
      class="inline field"
    />
  </div>
  <div class="two inline fields">
    <Select
      label="Categoría"
      name="partitura.categoria"
      bind:value={$form.partitura.categoria}
      options={Object.entries(partitura_categoria_enum).map(([_, cat]) => ({ val: cat, name: cat }))}
      class="five wide field"
    />
    <Input
      label="Jurado, Árbitro o Comité Editorial"
      name="partitura.jurado"
      bind:value={$form.partitura.jurado}
      error={$errors.partitura.jurado}
      class="ten wide field"
    />
  </div>
  <div class="two inline fields">
    <Input
      label="Depósito Legal"
      name="partitura.deposito_legal"
      bind:value={$form.partitura.deposito_legal}
      error={$errors.partitura.deposito_legal}
      class="eight wide field"
    />
    <Input
      label="Financiado Por"
      name="partitura.financiado_por"
      bind:value={$form.partitura.financiado_por}
      error={$errors.partitura.financiado_por}
      class="eight wide field"
    />
  </div>
</div>
