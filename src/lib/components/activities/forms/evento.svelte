<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { evento_modalidad_enum } from "@prisma/client";
  
  import { page } from "$app/stores";
  
  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";
  
  import CountryStates from "./country_states.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  ASISTENCIA A EVENTOS
</h2>

<div name="evento form">
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
  <div class="three inline required fields">
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
  <div class="two inline fields">
    <Select
      label="Modalidad"
      name="evento.modalidad"
      bind:value={$form.evento.modalidad}
      options={Object.entries(evento_modalidad_enum).map(([_, mod]) => ({ val: mod, name: mod }))}
      class="six wide field"
    />
    <Input
      label="Institución que financia o patrocina"
      name="evento.institucion"
      bind:value={$form.evento.institucion}
      error={$errors.evento.institucion}
      class="ten wide field"
    />
  </div>
</div>
