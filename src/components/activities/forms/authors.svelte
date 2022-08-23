<script lang="ts">
  import type { autor_tipo_actividad_enum } from "@prisma/client";
  import type { activity_form_ctx, kinds } from "$types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";
  import Input from "./input.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const tipo_actividad = param as autor_tipo_actividad_enum;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);

  const add_author_usb = function () {
    const init_author = {
      nombre: ''
      , es_estudiante: false
      , es_ponente: false
      , es_tutor: false
      , tipo_actividad
      , correo: null
      , profesor_id: null
      , estudiante_carrera: null
    };
		$form.autores_usb = $form.autores_usb.concat(init_author);
		$errors.autores_usb = $errors.autores_usb.concat(init_author);
	};

	const remove_author_usb = function (i: number) {
    $form.autores_usb = $form.autores_usb.filter( (_, j) => j !== i );
    $errors.autores_usb = $errors.autores_usb.filter( (_, j) => j !== i );
  };

	const add_author_out = function () {
    const init_author = {
      nombre: ''
      , universidad: ''
      , es_estudiante: false
      , es_ponente: false
      , es_tutor: false
      , tipo_actividad
      , correo: null
      , estudiante_carrera: null
    };
		$form.autores_externos = $form.autores_externos.concat(init_author);
		$errors.autores_externos = $errors.autores_externos.concat(init_author);
	};

	const remove_author_out = function (i: number) {
    $form.autores_externos = $form.autores_externos.filter( (_, j) => j !== i);
    $errors.autores_externos = $errors.autores_externos.filter( (_, j) => j !== i);
  };

  $: student_usb = function (i: number) { return $form.autores_usb[i].es_estudiante}
  $: student_out = function (i: number) { return $form.autores_externos[i].es_estudiante }
  $: tutor_usb = function (i: number) { return $form.autores_usb[i].es_tutor}
  $: tutor_out = function (i: number) { return $form.autores_externos[i].es_tutor }
</script>

<div class="required field">
  <label for="">Autores</label>

  {#if $form.autores_usb.length === 0 && $form.autores_externos.length === 0}
    <div class="ui five wide field tiny negative message">
      Ingrese al menos 1 autor
    </div>
  {/if}

  <div class="field">
    <span class="ui header">USB</span>

    {#each $form.autores_usb as author, i}
      <div class="four inline fields">
        <!-- TODO: dropdown con los usuarios -->
        <Input
          label="Nombre"
          name={`autores_usb[${i}].nombre`}
          bind:value={$form.autores_usb[i].nombre}
          error={$errors.autores_usb[i]?.nombre}
          class="ten wide required field"
        />
        <Input
          type="checkbox"
          label="Ponente"
          name={`autores_usb[${i}].es_ponente`}
          bind:value={$form.autores_usb[i].es_ponente}
          class="three wide field"
        />                
        {#if !tutor_usb(i)}
          <Input
            type="checkbox"
            label="Estudiante"
            name={`autores_usb[${i}].es_estudiante`}
            bind:value={$form.autores_usb[i].es_estudiante}
            class="three wide field"
          />
        {/if}        
        {#if !student_usb(i)}
          <Input
            type="checkbox"
            label="Tutor"
            name={`autores_usb[${i}].es_tutor`}
            bind:value={$form.autores_usb[i].es_tutor}
            class="three wide field"
          />
        {/if}
        <button class="ui red button" on:click={() => remove_author_usb(i)}>
          Elminar
        </button>
      </div>

      {#if student_usb(i)}
        <div class="two inline fields">
          <Input
            label="Carrera"
            name={`autores_usb[${i}].estudiante_carrera`}
            bind:value={$form.autores_usb[i].estudiante_carrera}
            error={$errors.autores_usb[i]?.estudiante_carrera}
            class="ten wide required field"
          />
          <Input
            label="Correo"
            name={`autores_usb[${i}].correo`}
            bind:value={$form.autores_usb[i].correo}
            class="ten wide field"
          >
            {#if $errors.autores_usb[i]?.correo}
              <div class="ui mini error message">
                {$errors.autores_usb[i].correo}
              </div>
            {/if}
          </Input>
        </div>
      {/if}
    {/each}

    <button class="ui blue button" on:click|preventDefault={add_author_usb}>
      Agregar
    </button>
    {#if $form.autores_usb.length > 0}      
      <button class="ui red button" on:click={() => $form.autores_usb = []}>
        Limpiar
      </button>
    {/if}
  </div>
  
  <div class="field">
    <span class="ui header">Externos</span>

    {#each $form.autores_externos as author, i}      
      <div class="two inline fields">
        <div class="ten wide required field" class:error={$errors.autores_externos[i]?.nombre}>
          <label for={`autores_externos[${i}].nombre`}>Nombre</label>
          <input
            type="text"
            name={`autores_externos[${i}].nombre`}
            bind:value={$form.autores_externos[i].nombre}
            on:change={handleChange}
          >
          {#if $errors.autores_externos[i]?.nombre}
            <div class="ui four wide field mini error message">
              Requerido
            </div>
          {/if}
        </div>
        
        <div class="ten wide required field" class:error={$errors.autores_externos[i]?.universidad}>
          <label for={`autores_externos[${i}].nombre`}>Universidad</label>
          <input
            type="text"
            name={`autores_externos[${i}].universidad`}
            bind:value={$form.autores_externos[i].universidad}
            on:change={handleChange}
          >
          {#if $errors.autores_externos[i]?.universidad}
            <div class="ui four wide field mini error message">
              Requerido
            </div>
          {/if}
        </div>
      </div>

      {#if student_out(i)}
        <div class="two inline fields">
          <div class="ten wide required field" class:error={$errors.autores_externos[i]?.estudiante_carrera}>
            <label for={`autores_externos[${i}].estudiante_carrera`}>Carrera</label>
            <input
              type="text"
              name={`autores_externos[${i}].estudiante_carrera`}
              bind:value={$form.autores_externos[i].estudiante_carrera}
              on:change={handleChange}
            >
            {#if $errors.autores_externos[i]?.estudiante_carrera}
              <div class="ui four wide field mini error message">
                Requerido
              </div>
            {/if}
          </div>
          <div class="ten wide field">
            <label for={`autores_externos[${i}].correo`}>Correo</label>
            <input
              type="text"
              name={`autores_externos[${i}].correo`}
              bind:value={$form.autores_externos[i].correo}
              on:change={handleChange}
            >
            {#if $errors.autores_externos[i]?.correo}
              {$errors.autores_externos[i].correo}
            {/if}
          </div>
        </div>
      {/if}
      
      <div class="three inline fields">
        <div class="three wide field">
          <label for={`autores_externos[${i}].es_ponente`}>Ponente</label>
          <input
            type="checkbox"
            name={`autores_externos[${i}].es_ponente`}
            class="ui checkbox"
            bind:value={$form.autores_externos[i].es_ponente}
            on:change={handleChange}
          >
        </div>
        
        {#if !tutor_out(i)}
          <div class="three wide field">
            <label for={`autores_externos[${i}].es_estudiante`}>Estudiante</label>
            <input
              type="checkbox"
              name={`autores_externos[${i}].es_estudiante`}
              class="ui checkbox"
              bind:value={$form.autores_externos[i].es_estudiante}
              on:change={handleChange}
            >
          </div>
        {/if}
        
        {#if !student_out(i)}
          <div class="three wide field">
            <label for={`autores_externos[${i}].es_tutor`}>Tutor</label>
            <input
              type="checkbox"
              name={`autores_externos[${i}].es_tutor`}
              class="ui checkbox"
              bind:value={$form.autores_externos[i].es_tutor}
              on:change={handleChange}
            >
          </div>
        {/if}

        <button class="ui red button" on:click={() => remove_author_out(i)}>
          Elminar
        </button>
      </div>
    {/each}
    
    <button class="ui blue button" on:click|preventDefault={add_author_out}>
      Agregar
    </button>
    {#if $form.autores_externos.length > 0}      
      <button class="ui red button" on:click={() => $form.autores_externos = []}>
        Limpiar
      </button>
    {/if}
  </div>
  
</div>
