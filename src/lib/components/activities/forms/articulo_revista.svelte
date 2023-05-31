<!-- 
	@component
  Articulo en revista activity form
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  import Input from "$lib/components/forms/input.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<h2 class="uk-text-center">
  ARTÍCULOS EN REVISTAS
</h2>

<div name="articulo_revista form">
  <Input
    label="Título del Artículo"
    name="actividad.titulo"
    bind:value={$form.actividad.titulo}
    error={$errors.actividad.titulo}
    class="required field"
  />

  <!-- TODO: #9 -->
  <Input
    label="Nombre de la Revista Arbitrada"
    name="articulo_revista.revista"
    bind:value={$form.articulo_revista.revista}
    error={$errors.articulo_revista.revista}
    class="required field"
  />
  
  <div class="two inline fields">
    <Input
      label="Índice"
      name="articulo_revista.indice"
      bind:value={$form.articulo_revista.indice}
      error={$errors.articulo_revista.indice}
      class="field"
    />
    <Input
      label="Volumen"
      name="articulo_revista.volumen"
      bind:value={$form.articulo_revista.volumen}
      error={$errors.articulo_revista.volumen}
      class="required field"
    />
  </div>
  <div class="three inline required fields">
    <Input
      type="number"
      label="Cantidad de Páginas"
      name="articulo_revista.paginas"
      bind:value={$form.articulo_revista.paginas}
      error={$errors.articulo_revista.paginas}
      class="field"
    />
    <Input
      label="Página Inicial"
      name="articulo_revista.pag_inicial"
      bind:value={$form.articulo_revista.pag_inicial}
      error={$errors.articulo_revista.pag_inicial}
      class="field"
    />
    <Input
      label="Página Final"
      name="articulo_revista.pag_final"
      bind:value={$form.articulo_revista.pag_final}
      error={$errors.articulo_revista.pag_final}
      class="field"
    />
  </div>
  <div class="two inline fields">
    <div class="ten wide field fields">
      <label for="articulo_revista.estado">Estado</label>
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input
            type="radio"
            id="articulo_revista.estado-Aceptado_via_publicacion"
            name="articulo_revista.estado"
            value="Aceptado_via_publicacion"
            class="uk-radio"
            on:change={handleChange}
            on:blur={handleChange}
            checked
          >
          Aceptado en Vias de Publicacion
        </label>
        <label>
          <input
            type="radio"
            id="articulo_revista.estado-Publicado"
            name="articulo_revista.estado"
            value="Publicado"
            class="uk-radio"
            on:change={handleChange}
            on:blur={handleChange}
          >
          Publicado
        </label>
      </div>

      {#if $errors.articulo_revista?.estado}
        {$errors.articulo_revista.estado}
      {/if}
      
    </div>
    <Input
      type="checkbox"
      label="Artículo Invitado"
      name="articulo_revista.articulo_invitado"
      bind:value={$form.articulo_revista.articulo_invitado}
      class="field"
    />
  </div>

  {#if $form.articulo_revista.estado === "Publicado"}
    <Input
      type="date"
      label="Fecha de Publicación"
      name="articulo_revista.fecha_publicacion"
      bind:value={$form.articulo_revista.fecha_publicacion}
      error={$errors.articulo_revista.fecha_publicacion}
      class="field"
    />
  {/if}
</div>
