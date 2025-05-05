<!-- 
	@component
  Articulo en revista activity form
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";
  import { init_date } from "$lib/utils/formatting";

  import Input from "$lib/components/forms/input.svelte";
	import Radio from "$lib/components/forms/radio.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);

  $form.articulo_revista.fecha_publicacion = $form.articulo_revista.fecha_publicacion || init_date();
</script>

<h2 class="uk-text-center">
  ARTÍCULOS EN REVISTAS
</h2>

<div class="grouped fields" name="articulo_revista form">
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
  
  <div class="two fields">
    <Input
      label="Índice"
      name="articulo_revista.indice"
      bind:value={$form.articulo_revista.indice}
      error={$errors.articulo_revista.indice}
      class="eight wide field"
    />
    <Input
      label="Volumen"
      name="articulo_revista.volumen"
      bind:value={$form.articulo_revista.volumen}
      error={$errors.articulo_revista.volumen}
      class="eight wide required field"
    />
  </div>
  <div class="three required fields">
    <Input
      type="number"
      label="Cantidad de Páginas"
      name="articulo_revista.paginas"
      bind:value={$form.articulo_revista.paginas}
      error={$errors.articulo_revista.paginas}
      class="seven wide field"
    />
    <Input
      label="Página Inicial"
      name="articulo_revista.pag_inicial"
      bind:value={$form.articulo_revista.pag_inicial}
      error={$errors.articulo_revista.pag_inicial}
      class="seven wide field"
    />
    <Input
      label="Página Final"
      name="articulo_revista.pag_final"
      bind:value={$form.articulo_revista.pag_final}
      error={$errors.articulo_revista.pag_final}
      class="seven wide field"
    />
  </div>
  <div class="two inline fields">
    <div class="field">
      <Radio
        label="Estado"
        name="articulo_revista.estado"
        checked1={$form.articulo_revista.estado === "Aceptado_via_publicacion"}
        checked2={$form.articulo_revista.estado === "Publicado"}
        value1="Aceptado_via_publicacion"
        value2="Publicado"
        text1="Aceptado en Vías de Publicación"
        error={$errors.articulo_revista.estado}
        class="field"
      />
      {#if $form.articulo_revista.estado === "Publicado"}
        <Input
          type="date"
          label="Fecha de Publicación"
          name="articulo_revista.fecha_publicacion"
          bind:value={$form.articulo_revista.fecha_publicacion}
          error={$errors.articulo_revista.fecha_publicacion}
          class="required inline field"
        />
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
</div>
