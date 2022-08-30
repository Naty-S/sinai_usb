<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$components/forms/input.svelte";


  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  PREMIOS
</h2>

<div name="premio form">
  <Input
    label="Título del Premio"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <div class="two inline required fields">
    <Input
      type="date"
      label="Fecha"
      name="premio.fecha"
      bind:value={$form.premio.fecha}
      error={$errors.premio.fecha}
      class="field"
    />
    <Input
      label="Institución que otorga"
      name="premio.institucion"
      bind:value={$form.premio.institucion}
      error={$errors.premio.institucion}
      class="twelve wide field"
    />
  </div>
</div>
