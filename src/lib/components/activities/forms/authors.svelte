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
  let autores_usb: any[] = [];
  let autores_externos: any[] = [];

  onMount(async () => {
    const res = await api.get("/api/professors");

    if (res.ok) {

      const profesors: Profesor[] = await res.clone().json();
      professors = profesors.filter(p => p.activo);
  
      autores_usb = autores_usb.concat($form.autores_usb);

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

		autores_usb = autores_usb.concat(init_author);
    $form.autores_usb = autores_usb;
		$errors.autores_usb = $errors.autores_usb.concat(init_author);
	};

	const remove_author_usb = function (i: number) {
    autores_usb = autores_usb.filter((_, j) => j !== i);
    $form.autores_usb = autores_usb;
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
		
    autores_externos.push(init_author);
    $form.autores_externos = autores_externos;
		$errors.autores_externos = $errors.autores_externos.concat(init_author);
	};

	const remove_author_out = function (i: number) {
    autores_externos = autores_externos.filter((_, j) => j !== i);
    $form.autores_externos = autores_externos;
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

    {#each autores_usb as author, i}

      <div class="four inline fields">
        {#if student_usb(i)}
          <Input
            label="Nombre Estudiante"
            name="autores_usb[{i}].nombre"
            bind:value={autores_usb[i].nombre}
            customHandleChange={(e) => {
              $form.autores_usb = autores_usb;
              $form.autores_usb[i].nombre = e.target.value;
            }}
            error={$errors.autores_usb[i]?.nombre}
            class="ten wide required field"
          />
        {:else}
          <Datalist
            label="Nombre Profesor"
            name="autores_usb[{i}].nombre"
            bind:value={autores_usb[i].nombre}
            customHandleChange={(e) => {
              $form.autores_usb = autores_usb;
              $form.autores_usb[i].nombre = e.target.value;
            }}
            options={professors.map(p => ({
              val: p.perfil,
              name: `${p.apellido2 ?? ''} ${p.apellido1}, ${p.nombre2 ?? ''} ${p.nombre1} - ${p.correo}`
            }))}
            class="ten wide required field"
            error={$errors.autores_externos[i]?.nombre}
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
            bind:value={autores_usb[i].estudiante_carrera}
            customHandleChange={(e) => {
              $form.autores_usb = autores_usb;
              $form.autores_usb[i].estudiante_carrera = e.target.value;
            }}
            error={$errors.autores_usb[i]?.estudiante_carrera}
            class="ten wide required field"
          />
          <Input
            label="Correo"
            name="autores_usb[{i}].correo"
            bind:value={autores_usb[i].correo}
            customHandleChange={(e) => {
              $form.autores_usb = autores_usb;
              $form.autores_usb[i].correo = e.target.value;
            }}
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
      <button type="button" class="ui red button" on:click={() => {$form.autores_usb = []; autores_usb = []}}>
        Limpiar
      </button>
    {/if}
  </div>
  
  <!-- Autores Externos -->
  <div class="field">
    <span class="ui header">Externos</span>

    {#each autores_externos as author, i}

      <div class="two inline fields">
        <Input
          label="Nombre"
          name="autores_externos[{i}].nombre"
          bind:value={autores_externos[i].nombre}
          customHandleChange={(e) => {
            $form.autores_externos = autores_externos;
            $form.autores_externos[i].nombre = e.target.value;
          }}
          error={$errors.autores_externos[i]?.nombre}
          class="ten wide required field"
        />
        <Input
          label="Universidad"
          name="autores_externos[{i}].universidad"
          bind:value={autores_externos[i].universidad}
          customHandleChange={(e) => {
            $form.autores_externos = autores_externos;
            $form.autores_externos[i].universidad = e.target.value;
          }}
          error={$errors.autores_externos[i]?.universidad}
          class="ten wide required field"
        />
      </div>

      <div class="two inline fields">
        {#if student_out(i)}
          <Input
            label="Carrera"
            name="autores_externos[{i}].estudiante_carrera"
            bind:value={autores_externos[i].estudiante_carrera}
            customHandleChange={(e) => {
              $form.autores_externos = autores_externos;
              $form.autores_externos[i].estudiante_carrera = e.target.value;
            }}
            error={$errors.autores_externos[i]?.estudiante_carrera}
            class="ten wide required field"
          />
        {/if}
        <Input
          label="Correo"
          name="autores_externos[{i}].correo"
          bind:value={autores_externos[i].correo}
          customHandleChange={(e) => {
            $form.autores_externos = autores_externos;
            $form.autores_externos[i].correo = e.target.value;
          }}
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
      <button type="button" class="ui red button" 
        on:click={() => {$form.autores_externos = []; autores_externos = []}}
      >
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
