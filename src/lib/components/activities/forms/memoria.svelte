<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { memoria_formato_enum, memoria_tipo_congreso_enum } from "@prisma/client";

  import { page } from "$app/stores";

  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";

  import CountryStates from "./country_states.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  MEMORIAS ARBITRADAS DE CONGRESOS
</h2>
<h4 class="uk-text-center">
  (In Extenso)
</h4>

<div name="memoria form">
  <Input
    label="Título del Trabajo"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <Input
    label="Nombre del Evento"
    name="memoria.congreso"
    bind:value={$form.memoria.congreso}
    error={$errors.memoria.congreso}
    class="required field"
  />
  <div class="three inline required fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha del Evento"
      name="memoria.fecha"
      bind:value={$form.memoria.fecha}
      error={$errors.memoria.fecha}
      class="field"
    />
  </div>
  <div class="three inline fields">    
    <Input
      label="Nombre del Medio de Publicación"
      name="memoria.medio_publicacion"
      bind:value={$form.memoria.medio_publicacion}
      error={$errors.memoria.medio_publicacion}
      class="eight wide field"
    />
    <Input
      label="Volumen"
      name="memoria.volumen"
      bind:value={$form.memoria.volumen}
      error={$errors.memoria.volumen}
      class="field"
    />
    <Input
      label="ISBN"
      name="memoria.isbn"
      bind:value={$form.memoria.isbn}
      error={$errors.memoria.isbn}
      class="field"
    />
  </div>
  <div class="three inline fields">
    <Input
      type="number"
      label="Cantidad de Páginas"
      name="memoria.paginas"
      bind:value={$form.memoria.paginas}
      error={$errors.memoria.paginas}
      class="field"
    />
    <Input
      label="Página Inicial"
      name="memoria.pag_inicial"
      bind:value={$form.memoria.pag_inicial}
      error={$errors.memoria.pag_inicial}
      class="field"
    />
    <Input
      label="Página Final"
      name="memoria.pag_final"
      bind:value={$form.memoria.pag_final}
      error={$errors.memoria.pag_final}
      class="field"
    />
  </div>
  <div class="two inline fields">
    <Select
      label="Formato"
      name="memoria.formato"
      bind:value={$form.memoria.formato}
      options={Object.entries(memoria_formato_enum).map(([_, f]) => ({ val: f, name: f }))}
      class="field"
    />
    <Select
      label="Tipo de Congreso"
      name="memoria.tipo_congreso"
      bind:value={$form.memoria.tipo_congreso}
      options={Object.entries(memoria_tipo_congreso_enum).map(([_, t]) => ({ val: t, name: t }))}
      class=" field"
    />
  </div>
</div>
