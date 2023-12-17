<!-- 
	@component
  Activity authors section form
 -->
<script lang="ts">
  import type { autor_tipo_actividad_enum } from "@prisma/client";
  import type { activity_form_ctx, kinds } from "$lib/types/forms";
	import type { Profesor } from "$lib/interfaces/professors";

  import { getContext, onMount } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import { page } from "$app/stores";

  import * as api from "$lib/api";

  import Datalist from "$lib/components/forms/datalist.svelte";
  import Input from "$lib/components/forms/input.svelte";
  import Modal from "$lib/components/modals/modal.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const tipo_actividad = param as autor_tipo_actividad_enum;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);

  let professors: Profesor[] = [];
  let action = { info: '', code: '' };

  onMount(async () => {
    const res = await api.get("/api/professors");

    if (res.ok) {

      const profesors: Profesor[] = await res.clone().json();
      professors = profesors.filter(p => p.activo);

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  });

  const add_author_usb = function (est: boolean) {
    
    const init_author = {
      nombre: ''
      , es_estudiante: est
      , es_ponente: false
      , es_tutor: false
      , tipo_actividad
      , correo: null
      , profesor_id: null
      , estudiante_carrera: null
    };

    $form.autores_usb.push(init_author);
		$errors.autores_usb = $errors.autores_usb.concat(init_author);
	};

	const remove_author_usb = function (i: number) {
    $form.autores_usb = $form.autores_usb.filter((_, j) => j !== i);
    $errors.autores_usb = $errors.autores_usb.filter((_, j) => j !== i);
  };

	const add_author_out = function (est: boolean) {
    
    const init_author = {
      nombre: ''
      , universidad: ''
      , es_estudiante: est
      , es_ponente: false
      , es_tutor: false
      , tipo_actividad
      , correo: null
      , estudiante_carrera: null
    };
		
    $form.autores_externos.push(init_author);
		$errors.autores_externos = $errors.autores_externos.concat(init_author);
	};

	const remove_author_out = function (i: number) {
    $form.autores_externos = $form.autores_externos.filter((_, j) => j !== i);
    $errors.autores_externos = $errors.autores_externos.filter((_, j) => j !== i);
  };

  $: student_usb = function (i: number) { return $form.autores_usb[i].es_estudiante }
  $: student_out = function (i: number) { return $form.autores_externos[i].es_estudiante }

  $: $form.autores_usb.map(a => {
    if (!a.es_estudiante) {
      a.profesor_id = professors.find(p => p.perfil === a.nombre)?.id || 0;
    } else {
      a.profesor_id = null;
    };

    return a;
  });
</script>

<div class="required field">
  <label for="">Autores</label>

  {#if $form.autores_usb.length === 0 && $form.autores_externos.length === 0}
    <div class="ui five wide field tiny negative message">
      Ingrese al menos 1 autor
    </div>
  {/if}

  <!-- Autores USB -->
  <div class="field">
    <span class="ui header">USB</span>

    {#each $form.autores_usb as author, i}

      <div class="four inline fields">
        {#if student_usb(i)}
          <Input
            label="Nombre Estudiante"
            name="autores_usb[{i}].nombre"
            bind:value={$form.autores_usb[i].nombre}
            error={$errors.autores_usb[i]?.nombre}
            class="ten wide required field"
          />
        {:else}
          <Datalist
            label="Nombre Profesor"
            name="autores_usb[{i}].nombre"
            bind:value={$form.autores_usb[i].nombre}
            options={professors.map(p => ({ val: p.perfil, name: p.perfil }))}
            class="ten wide required field"
          />
        {/if}
        
        <Input
          type="checkbox"
          label="Ponente"
          name="autores_usb[{i}].es_ponente"
          bind:value={$form.autores_usb[i].es_ponente}
          class="three wide field"
        />
        
        <!-- TODO: #81 -->
        
        {#if !student_usb(i)}
          <Input
            type="checkbox"
            label="Tutor"
            name="autores_usb[{i}].es_tutor"
            bind:value={$form.autores_usb[i].es_tutor}
            class="three wide field"
          />
        {/if}

        <button type="button" class="ui red button" on:click={() => remove_author_usb(i)}>
          Elminar
        </button>
      </div>

      {#if student_usb(i)}
        <div class="two inline fields">
          <Input
            label="Carrera"
            name="autores_usb[{i}].estudiante_carrera"
            bind:value={$form.autores_usb[i].estudiante_carrera}
            error={$errors.autores_usb[i]?.estudiante_carrera}
            class="ten wide required field"
          />
          <Input
            label="Correo"
            name="autores_usb[{i}].correo"
            bind:value={$form.autores_usb[i].correo}
            error={$errors.autores_usb[i]?.correo}
            class="ten wide field"
          />
        </div>
      {/if}
    {/each}

    <button type="button" class="ui blue button" on:click|preventDefault={() => add_author_usb(false)}>
      Agregar Profesor
    </button>
    <button type="button" class="ui blue button" on:click|preventDefault={() => add_author_usb(true)}>
      Agregar Estudiante
    </button>
    {#if $form.autores_usb.length > 0}
      <button type="button" class="ui red button" on:click={() => $form.autores_usb = []}>
        Limpiar
      </button>
    {/if}
  </div>
  
  <!-- Autores Externos -->
  <div class="field">
    <span class="ui header">Externos</span>

    {#each $form.autores_externos as author, i}

      <div class="two inline fields">
        <Input
          label="Nombre"
          name="autores_externos[{i}].nombre"
          bind:value={$form.autores_externos[i].nombre}
          error={$errors.autores_externos[i]?.nombre}
          class="ten wide required field"
        />
        <Input
          label="Universidad"
          name="autores_externos[{i}].universidad"
          bind:value={$form.autores_externos[i].universidad}
          error={$errors.autores_externos[i]?.universidad}
          class="ten wide required field"
        />
      </div>

      <div class="two inline fields">
        {#if student_out(i)}
          <Input
            label="Carrera"
            name="autores_externos[{i}].estudiante_carrera"
            bind:value={$form.autores_externos[i].estudiante_carrera}
            error={$errors.autores_externos[i]?.estudiante_carrera}
            class="ten wide required field"
          />
        {/if}
        <Input
          label="Correo"
          name="autores_externos[{i}].correo"
          bind:value={$form.autores_externos[i].correo}
          error={$errors.autores_externos[i]?.correo}
          class="ten wide field"
        />
        </div>
      
      <div class="three inline fields">
        <Input
          type="checkbox"
          label="Ponente"
          name="autores_externos[{i}].es_ponente"
          bind:value={$form.autores_externos[i].es_ponente}
          class="three wide field"
        />                
        {#if !student_out(i)}
          <Input
            type="checkbox"
            label="Tutor"
            name="autores_externos[{i}].es_tutor"
            bind:value={$form.autores_externos[i].es_tutor}
            class="three wide field"
          />
        {/if}

        <button type="button" class="ui red button" on:click={() => remove_author_out(i)}>
          Elminar
        </button>
      </div>
    {/each}
    
    <button type="button" class="ui blue button" on:click|preventDefault={() => add_author_out(false)}>
      Agregar Profesor
    </button>
    <button type="button" class="ui blue button" on:click|preventDefault={() => add_author_out(true)}>
      Agregar Estudiante
    </button>
    {#if $form.autores_externos.length > 0}      
      <button type="button" class="ui red button" on:click={() => $form.autores_externos = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={location.reload}
  >
    <p>
      Hubo un problema al cargar la lista de profesores, por favor recargue la página
      o contáctese con algún administrador proporcionando el código del error.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
