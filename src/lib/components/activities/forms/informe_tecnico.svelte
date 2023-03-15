<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$lib/components/forms/input.svelte";

  import Evaluators from "./evaluators.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  INFORMES TÉCNICOS
</h2>

<div name="informe_tecnico form">
  <Input
    label="Título"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <div class="two inline required fields">
    <Input
      type="date"
      label="Fecha de Inicio"
      name="informe_tecnico.fecha_inicio"
      bind:value={$form.informe_tecnico.fecha_inicio}
      error={$errors.informe_tecnico.fecha_inicio}
      class="field"
    />
    <Input
      label="Institución que financia"
      name="informe_tecnico.institucion"
      bind:value={$form.informe_tecnico.institucion}
      error={$errors.informe_tecnico.institucion}
      class="twelve wide field"
    />
  </div>
  <div class="three inline fields">
    <Input
      type="number"
      label="Duración estimada del Proyecto (meses)"
      name="informe_tecnico.meses_duracion"
      bind:value={$form.informe_tecnico.meses_duracion}
      error={$errors.informe_tecnico.meses_duracion}
      class="required field"
    />
    <Input
      type="checkbox"
      label="Contrato de Confidencialidad"
      name="informe_tecnico.confidencial"
      bind:value={$form.informe_tecnico.confidencial}
      class="inline field"
    />
    <Input
      type="checkbox"
      label="Informe de evaluación en DID"
      name="informe_tecnico.evaluacion_did"
      bind:value={$form.informe_tecnico.evaluacion_did}
      class="inline field"
    />
  </div>
  <Evaluators />
</div>
