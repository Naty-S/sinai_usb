<!-- 
	@component
  Evento activity form
 -->
<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";
  
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";
  import { evento_modalidad_enum } from "$lib/constants";
  
  import CountryStates from "./country_states.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  ASISTENCIA A EVENTOS
</h2>

<div class="grouped fields" name="evento form">
  <Input
    label="Título del Trabajo"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre del Evento"
    name="evento.nombre"
    bind:value={$form.evento.nombre}
    error={$errors.evento.nombre}
    class="required field"
  />
  <div class="three required fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha del Evento"
      name="evento.fecha"
      bind:value={$form.evento.fecha}
      error={$errors.evento.fecha}
      class="field"
    />
  </div>
  <div class="three fields">
    <Select
      label="Modalidad"
      name="evento.modalidad"
      bind:value={$form.evento.modalidad}
      options={evento_modalidad_enum.map(mod => ({ val: mod, name: mod }))}
      class="three wide field"
    />
    <Input
      label="Institución que financia o patrocina"
      name="evento.institucion"
      bind:value={$form.evento.institucion}
      error={$errors.evento.institucion}
      class="ten wide field"
    />
    <Input
      type="checkbox"
      label="Evento Internacional"
      name="evento.internacional"
      bind:value={$form.evento.internacional}
      error={$errors.evento.internacional}
      class="three wide field"
    />
  </div>
</div>
