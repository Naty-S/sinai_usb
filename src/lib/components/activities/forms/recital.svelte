<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";
  
  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$lib/components/forms/input.svelte";
  
  import CountryStates from "./country_states.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  RECITALES O CONCIERTOS ARBITRADOS
</h2>

<div name="recital form">
  <Input
    label="Título de la Obra"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre del Evento"
    name="recital.nombre_evento"
    bind:value={$form.recital.nombre_evento}
    error={$errors.recital.nombre_evento}
    class="required field"
  />
  <div class="three inline fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha del Evento"
      name="recital.fecha_evento"
      bind:value={$form.recital.fecha_evento}
      error={$errors.recital.fecha_evento}
      class="required field"
    />
  </div>
  <div class="two inline fields">
    <Input
      label="Jurado o Árbitro"
      name="recital.jurado"
      bind:value={$form.recital.jurado}
      error={$errors.recital.jurado}
      class="eight wide required field"
    />
    <Input
      label="Financiado Por"
      name="recital.financiado_por"
      bind:value={$form.recital.financiado_por}
      error={$errors.recital.financiado_por}
      class="eight wide field"
    />
  </div>
</div>
