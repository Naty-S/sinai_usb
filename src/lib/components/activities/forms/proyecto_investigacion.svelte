<!-- 
	@component
  Proyecto de investigación activity form
 -->
<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";
	import Radio from "$lib/components/forms/radio.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);

  let fonacit = $form.proyecto_investigacion.institucion === "Fonacit";
</script>

<h2 class="uk-text-center">
  PROYECTOS DE INVESTIGACIÓN Y DESARROLLO
</h2>

<div class="grouped fields" name="proyecto_investigacion form">
  <Input
    label="Título del Trabajo"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Radio
    label="Institución que financia o patrocina"
    name="proyecto_investigacion.institucion"
    checked1={fonacit}
    checked2={!fonacit}
    value1="Fonacit"
    value2="Otro"
    click1={() => fonacit = true}
    click2={() => {fonacit = false; $form.proyecto_investigacion.institucion = ''}}
    error={$errors.proyecto_investigacion.institucion}
    class="field"
  >
    <input
      type="text"
      id="proyecto_investigacion.institucion-Otro"
      name="proyecto_investigacion.institucion"
      bind:value={$form.proyecto_investigacion.institucion}
      on:change={handleChange}
      on:blur={handleChange}
      hidden={fonacit}
    >
  </Radio>
  <div class="four required fields">
    <Input
      type="date"
      label="Fecha de Inicio"
      name="proyecto_investigacion.fecha_inicio"
      bind:value={$form.proyecto_investigacion.fecha_inicio}
      error={$errors.proyecto_investigacion.fecha_inicio}
      class="four wide required field"
    />
    <Input
      type="number"
      label="Duración estimada (meses)"
      name="proyecto_investigacion.meses_duracion"
      bind:value={$form.proyecto_investigacion.meses_duracion}
      error={$errors.proyecto_investigacion.meses_duracion}
      class="four wide field"
    />
    <Input
      type="number"
      label="Monto Financiado (Decimales separados con punto, 1000.00)"
      name="proyecto_investigacion.monto"
      bind:value={$form.proyecto_investigacion.monto}
      error={$errors.proyecto_investigacion.monto}
      class="six wide field"
    />
    <!-- TODO: #13 -->
    <Select
      label="Moneda"
      name="proyecto_investigacion.moneda"
      bind:value={$form.proyecto_investigacion.moneda}
      error={$errors.proyecto_investigacion.moneda}
      options={[{ val: "Bs.", name: "Bs."}, ({ val: "$ (USD)", name: "$ (USD)" })]}
      class="two wide field"
    />
  </div>
</div>
