<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { grabacion_categoria_enum } from "@prisma/client";

  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  GRABACIONES SONORAS EVALUADAS POR ÁRBITROS
</h2>

<div name="grabacion form">
  <Input
    label="Título de la Obra"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre de la Editorial"
    name="grabacion.editorial"
    bind:value={$form.grabacion.editorial}
    error={$errors.grabacion.editorial}
    class="required field"
  />
  <div class="two inline fields">
    <Input
      type="date"
      label="Fecha"
      name="grabacion.fecha"
      bind:value={$form.grabacion.fecha}
      error={$errors.grabacion.fecha}
      class="required field"
    />
    <Input
      type="checkbox"
      label="Nacional"
      name="grabacion.nacional"
      bind:value={$form.grabacion.nacional}
      class="inline field"
    />
  </div>
  <div class="two inline fields">
    <Select
      label="Categoría"
      name="grabacion.categoria"
      bind:value={$form.grabacion.categoria}
      options={Object.entries(grabacion_categoria_enum).map(([_, cat]) => ({ val: cat, name: cat }))}
      class="eight wide field"
    />
    <Input
      label="Jurado, Árbitro o Comité Editorial"
      name="grabacion.jurado"
      bind:value={$form.grabacion.jurado}
      error={$errors.grabacion.jurado}
      class="eight wide field"
    />
  </div>
  
  <div class="two inline fields">
    <Input
      label="Depósito Legal"
      name="grabacion.deposito_legal"
      bind:value={$form.grabacion.deposito_legal}
      error={$errors.grabacion.deposito_legal}
      class="eight wide field"
    />
    <Input
      label="Financiado Por"
      name="grabacion.financiado_por"
      bind:value={$form.grabacion.financiado_por}
      error={$errors.grabacion.financiado_por}
      class="eight wide field"
    />
  </div>
</div>
