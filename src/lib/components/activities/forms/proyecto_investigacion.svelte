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
  import ErrorMsg from "$lib/components/forms/error_msg.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);

  let fonacit = true;
</script>

<h2 class="uk-text-center">
  PROYECTOS DE INVESTIGACIÓN Y DESARROLLO
</h2>

<div name="proyecto_investigacion form">
  <Input
    label="Título del Trabajo"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <div class="two inline required fields">
    <Input
      type="date"
      label="Fecha de Inicio"
      name="proyecto_investigacion.fecha_inicio"
      bind:value={$form.proyecto_investigacion.fecha_inicio}
      error={$errors.proyecto_investigacion.fecha_inicio}
      class="field"
    />
    <div class="twelve wide field fields">
      <label for="proyecto_investigacion.institucion">
        Institución que financia o patrocina
      </label>
      <div>
        <label>
          <input
            type="radio"
            id="proyecto_investigacion.institucion-Fonacit"
            name="proyecto_investigacion.institucion"
            value="Fonacit"
            class="uk-radio"
            on:change={handleChange}
            on:blur={handleChange}
            on:click={() => fonacit = true}
            checked
          >
          Fonacit
        </label>
        <label>
          <input
            type="radio"
            id="proyecto_investigacion.institucion-Otro"
            name="proyecto_investigacion.institucion"
            class="uk-radio"
            bind:value={$form.proyecto_investigacion.institucion}
            on:change={handleChange}
            on:blur={handleChange}
            on:click={() => {fonacit = false; $form.proyecto_investigacion.institucion = ''}}
          >
          Otro
        </label>
        <input
          type="text"
          id="proyecto_investigacion.institucion-Otro"
          name="proyecto_investigacion.institucion"
          bind:value={$form.proyecto_investigacion.institucion}
          on:change={handleChange}
          on:blur={handleChange}
          hidden={fonacit}
        >
      </div>
      <ErrorMsg error={$errors.proyecto_investigacion.institucion} />      
    </div>
  </div>
  <div class="two required inline fields">
    <Input
      type="number"
      label="Duración estimada (meses)"
      name="proyecto_investigacion.meses_duracion"
      bind:value={$form.proyecto_investigacion.meses_duracion}
      error={$errors.proyecto_investigacion.meses_duracion}
      class="five wide field"
    />
    <div class="two inline twelve wide field fields">
      <Input
        type="number"
        label="Monto Financiado"
        name="proyecto_investigacion.monto"
        bind:value={$form.proyecto_investigacion.monto}
        error={$errors.proyecto_investigacion.monto}
        class="eight wide required field"
      />
      <!-- TODO: #13 -->
      <Select
        label=""
        name="proyecto_investigacion.moneda"
        bind:value={$form.proyecto_investigacion.moneda}
        options={[{ val: "Bs.", name: "Bs."}, ({ val: "$ (USD)", name: "$ (USD)" })]}
        class="five wide field"
      />
    </div>
  </div>
</div>
