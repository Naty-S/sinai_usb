<!-- 
	@component
  Activity authors section form
 -->
<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { key } from "svelte-forms-lib";
  
  import type { autor_tipo_actividad_enum, profesor } from "@prisma/client";

  import { page } from "$app/stores";
  
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import * as api from "$lib/api";

  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";
  import Modal from "$lib/components/modal.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const tipo_actividad = param as autor_tipo_actividad_enum;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);

  let professors: { id: number, nombre: string }[] = [];
  let action = { info: '', code: '' };

  onMount(async () => {
    const res = await api.get("/api/professors");

    if (res.ok) {
      const res_json = await res.clone().json();
      professors = res_json.filter((p: profesor) => p.activo && p.id !== 0).map((p: profesor) => (
        {
          id: p.id,
          nombre: p.perfil
        }
      ));

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  });

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
    $form.autores_usb = $form.autores_usb.filter((_, j) => j !== i);
    $errors.autores_usb = $errors.autores_usb.filter((_, j) => j !== i);
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
    $form.autores_externos = $form.autores_externos.filter((_, j) => j !== i);
    $errors.autores_externos = $errors.autores_externos.filter((_, j) => j !== i);
  };

  $: student_usb = function (i: number) { return $form.autores_usb[i].es_estudiante }
  $: student_out = function (i: number) { return $form.autores_externos[i].es_estudiante }
  $: tutor_usb = function (i: number) { return $form.autores_usb[i].es_tutor }
  $: tutor_out = function (i: number) { return $form.autores_externos[i].es_tutor }

  $: $form.autores_usb.map(a => {
    if (!a.es_estudiante) {
      a.profesor_id = professors.find(p => p.nombre === a.nombre)?.id || null;
    } else {
      a.profesor_id = null;
    };
  });
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
        {#if student_usb(i)}
          <Input
            label="Nombre Estudiante"
            name="autores_usb[{i}].nombre"
            bind:value={$form.autores_usb[i].nombre}
            error={$errors.autores_usb[i]?.nombre}
            class="ten wide required field"
          />
        {:else}
          <Select
            label="Nombre Profesor"
            name="autores_usb[{i}].nombre"
            bind:value={$form.autores_usb[i].nombre}
            options={professors.map(p => ({ val: p.nombre, name: p.nombre }))}
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
        
        {#if !tutor_usb(i)}
          <Input
            type="checkbox"
            label="Estudiante"
            name="autores_usb[{i}].es_estudiante"
            bind:value={$form.autores_usb[i].es_estudiante}
            class="three wide field"
          />
        {/if}        
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

    <button type="button" class="ui blue button" on:click|preventDefault={add_author_usb}>
      Agregar
    </button>
    {#if $form.autores_usb.length > 0}
      <button type="button" class="ui red button" on:click={() => $form.autores_usb = []}>
        Limpiar
      </button>
    {/if}
  </div>
  
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

      {#if student_out(i)}
        <div class="two inline fields">
          <Input
            label="Carrera"
            name="autores_externos[{i}].estudiante_carrera"
            bind:value={$form.autores_externos[i].estudiante_carrera}
            error={$errors.autores_externos[i]?.estudiante_carrera}
            class="ten wide required field"
          />
          <Input
            label="Correo"
            name="autores_externos[{i}].correo"
            bind:value={$form.autores_externos[i].correo}
            error={$errors.autores_externos[i]?.correo}
            class="ten wide field"
          />
        </div>
      {/if}
      
      <div class="three inline fields">
        <Input
          type="checkbox"
          label="Ponente"
          name="autores_externos[{i}].es_ponente"
          bind:value={$form.autores_externos[i].es_ponente}
          class="three wide field"
        />                
        {#if !tutor_out(i)}
          <Input
            type="checkbox"
            label="Estudiante"
            name="autores_externos[{i}].es_estudiante"
            bind:value={$form.autores_externos[i].es_estudiante}
            class="three wide field"
          />
        {/if}        
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
    
    <button type="button" class="ui blue button" on:click|preventDefault={add_author_out}>
      Agregar
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
    is_active={action.info !== ''}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la acción por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
