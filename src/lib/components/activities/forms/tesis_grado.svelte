<!-- 
	@component
  Proyecto de grado activity form
 -->
<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$lib/types/forms";
  
  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";
  import { tesis_grado_nivel_academico_enum } from "$lib/constants";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  TESIS DE GRADO DIRIGIDOS
</h2>

<div class="grouped fields" name="tesis_grado form">
  <Input
    label="Título del Proyecto"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <div class="two required fields">
    <Input
      label="Título Académico al que se optó"
      name="tesis_grado.titulo_academico"
      bind:value={$form.tesis_grado.titulo_academico}
      error={$errors.tesis_grado.titulo_academico}
      class="eight wide field"
    />
    <Input
      label="Coordinación Académica"
      name="tesis_grado.coordinacion_academica"
      bind:value={$form.tesis_grado.coordinacion_academica}
      error={$errors.tesis_grado.coordinacion_academica}
      class="eight wide field"
    />
  </div>
  <div class="two fields">
    <Select
      label="Tipo de Tutoría"
      name="tesis_grado.nivel_academico"
      bind:value={$form.tesis_grado.nivel_academico}
      error={$errors.tesis_grado.nivel_academico}
      options={Object.entries(tesis_grado_nivel_academico_enum).map(([nivel, name]) => ({
        val: nivel,
        name: name
      }))}
      class="eight wide field"
    />
    <Input
      type="date"
      label="Fecha de la Defensa"
      name="tesis_grado.fecha_defensa"
      bind:value={$form.tesis_grado.fecha_defensa}
      error={$errors.tesis_grado.fecha_defensa}
      class="eight wide field"
    />
  </div>
</div>
