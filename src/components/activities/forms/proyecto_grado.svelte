<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { proyecto_grado_nivel_academico_enum } from "@prisma/client";

  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$components/forms/input.svelte";
  import Select from "$components/forms/select.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  PROYECTOS DE GRADO DIRIGIDOS
</h2>

<div name="proyecto_grado form">
  <Input
    label="Título del Proyecto"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <div class="two inline required fields">
    <Input
      label="Título Académico al que se optó"
      name="proyecto_grado.titulo_academico"
      bind:value={$form.proyecto_grado.titulo_academico}
      error={$errors.proyecto_grado.titulo_academico}
      class="eight wide field"
    />
    <Input
      label="Coordinación Académica"
      name="proyecto_grado.coordinacion_academica"
      bind:value={$form.proyecto_grado.coordinacion_academica}
      error={$errors.proyecto_grado.coordinacion_academica}
      class="eight wide field"
    />
  </div>
  <div class="two inline required fields">
    <Select
      label="Nivel Académico"
      name="proyecto_grado.nivel_academico"
      bind:value={$form.proyecto_grado.nivel_academico}
      options={Object.entries(proyecto_grado_nivel_academico_enum).map(([_, nivel]) => nivel)}
      class="five wide field"
    />
    <Input
      type="date"
      label="Fecha de la Defensa"
      name="proyecto_grado.fecha_defensa"
      bind:value={$form.proyecto_grado.fecha_defensa}
      error={$errors.proyecto_grado.fecha_defensa}
      class="field"
    />
  </div>
</div>
