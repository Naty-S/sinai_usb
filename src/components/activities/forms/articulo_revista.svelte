<script lang="ts">
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { init  } from "$lib/shared/forms/init";
  import { validationSchema  } from "$lib/shared/forms/validation";
  import { submit  } from "$lib/shared/forms/submit";

  import ActionsButtons from "./actions_buttons.svelte";
  import Authors from './authors.svelte';
	import Groups from './groups.svelte';  
  import Observaciones from './observaciones.svelte';
  import Input from "./input.svelte";

  const initialValues = init("articulo_revista");
  const onSubmit = submit("articulo_revista");
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });
</script>

<h2 class="uk-text-center">
  ARTÍCULOS EN REVISTAS
</h2>

<form class="ui large form" on:submit|preventDefault={handleSubmit}>

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
  
  <div class="three inline fields">
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
      class="required field"
    />
    <Input
      label="Página Final"
      name="articulo_revista.pag_final"
      bind:value={$form.articulo_revista.pag_final}
      error={$errors.articulo_revista.pag_final}
      class="required field"
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
  <Groups />
  <Authors />
  <Observaciones />
  <ActionsButtons />
</form>
