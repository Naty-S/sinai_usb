<!-- 
	@component
  Patente activity form
 -->
<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

  import { getCountries }  from 'cs-list';

  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
  const countries = getCountries();
</script>

<h2 class="uk-text-center">
  PATENTES
</h2>

<div class="grouped fields" name="patente form">
  <Input
    label="Título"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <div class="ui dividing small header">Vigencia
    <div class="two fields">
      <Input
        type="date"
        label="Fecha de Inicio"
        name="patente.fecha_inicio"
        bind:value={$form.patente.fecha_inicio}
        error={$errors.patente.fecha_inicio}
        class="eight wide field"
      />
      <Input
        type="date"
        label="Fecha Fin"
        name="patente.fecha_fin"
        bind:value={$form.patente.fecha_fin}
        error={$errors.patente.fecha_fin}
        class="eight wide field"
      />
    </div>
  </div>
  <div class="two required fields">
    <Input
      label="Número"
      name="patente.numero"
      bind:value={$form.patente.numero}
      error={$errors.patente.numero}
      class="eight wide field"
    />
    <Input
      label="País que otorga"
      name="patente.pais"
      bind:value={$form.patente.pais}
      error={$errors.patente.pais}
      class="eight wide field"
    />
  </div>
</div>
