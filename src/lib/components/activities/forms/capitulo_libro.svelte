<script lang="ts">
  import type { activity_form_ctx, kinds } from "$types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  import Input from "$lib/components/forms/input.svelte";
  
  import CountryStates from "./country_states.svelte";
  import Editors from "./editors.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  CAPÍTULOS DE LIBROS
</h2>

<div name="capitulo_libro form">
  <Input
    label="Título del Capítulo"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />
  <div class="two required inline fields">
    <Input
      label="Página Inicial"
      name="capitulo_libro.pag_inicial"
      bind:value={$form.capitulo_libro.pag_inicial}
      error={$errors.capitulo_libro.pag_inicial}
      class="required field"
    />
    <Input
      label="Página Final"
      name="capitulo_libro.pag_final"
      bind:value={$form.capitulo_libro.pag_final}
      error={$errors.capitulo_libro.pag_final}
      class="required field"
    />
  </div>
  <Input
    label="Título del Libro"
    name="capitulo_libro.titulo_libro"
    bind:value={$form.capitulo_libro.titulo_libro}
    error={$errors.capitulo_libro.titulo_libro}
    class="required field"
  />
  <Input
    label="Casa Editorial"
    name="capitulo_libro.editorial"
    bind:value={$form.capitulo_libro.editorial}
    error={$errors.capitulo_libro.editorial}
    class="required field"
  />
  <div class="three inline required fields">
    <CountryStates />
    <Input
      type="date"
      label="Fecha"
      name="capitulo_libro.fecha"
      bind:value={$form.capitulo_libro.fecha}
      error={$errors.capitulo_libro.fecha}
      class="field"
    />
  </div>
  <div class="three inline fields">
    <Input
      label="ISBN"
      name="capitulo_libro.isbn"
      bind:value={$form.capitulo_libro.isbn}
      error={$errors.capitulo_libro.isbn}
      class="required field"
    />
    <Input
      type="checkbox"
      label="Aceptado para Publicación"
      name="capitulo_libro.aceptado"
      bind:value={$form.capitulo_libro.aceptado}
      class="field"
    />
    <Input
      type="checkbox"
      label="Artículo Invitado"
      name="capitulo_libro.articulo_invitado"
      bind:value={$form.capitulo_libro.articulo_invitado}
      class="field"
    />
  </div>
  <Editors />
</div>
