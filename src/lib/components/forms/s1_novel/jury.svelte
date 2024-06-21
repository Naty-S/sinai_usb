<script lang="ts">
	import type { Profesor } from "$lib/interfaces/professors";

  import { setContext, onMount } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { page } from "$app/stores";

  import * as api from "$lib/api";

  import { init } from "$lib/utils/forms/s1_novel/jury/init";
  import { validation } from "$lib/utils/forms/s1_novel/jury/validation";
  import { submit } from "$lib/utils/forms/s1_novel/jury/submit";

  import Modal from "$lib/components/modals/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import Input from "$lib/components/forms/input.svelte";
	import Datalist from "$lib/components/forms/datalist.svelte";

  export let s1_novel: number;

  const initialValues = init();
  const onSubmit = submit($page.url.pathname);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  let professors: Profesor[] = [];
  let action = { info: '', code: '' };
  let jurado_usb: any[] = [];
  let jurado_externo: any[] = [];

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

  setContext(key, { form, errors, handleChange });

  const add_jury_usb = function () {
    
    const init_jury = {
        profesor: 0
      , s1_novel
    };

    jurado_usb = jurado_usb.concat(init_jury);
		$errors.jurado_usb = $errors.jurado_usb.concat(init_jury);
	};

	const remove_jury_usb = function (i: number) {
    jurado_usb = jurado_usb.filter((_, j) => j !== i);
    $form.jurado_usb = jurado_usb;
    $errors.jurado_usb = $errors.jurado_usb.filter((_, j) => j !== i);
  };

	const add_jury_out = function () {
    
    const init_jury = {
      s1_novel
    , correo: null
    , nombre: ''
    , universidad: null
    };
		
		jurado_externo = jurado_externo.concat(init_jury);
		$errors.jurado_externo = $errors.jurado_externo.concat(init_jury);
	};

	const remove_jury_out = function (i: number) {
    jurado_externo = jurado_externo.filter((_, j) => j !== i);
    $form.jurado_externo = jurado_externo;
    $errors.jurado_externo = $errors.jurado_externo.filter((_, j) => j !== i);
  };
</script>

<h2>Asignar Jurado</h2>

<form id="s1_novel_assing_jury_form" class="ui large form segment" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>

  {#if $form.jurado_usb.length === 0 && $form.jurado_externo.length === 0}
    <div class="ui field tiny negative message">
      Ingrese al menos 1 jurado
    </div>
  {/if}

  <!-- Jurado USB -->
  <div class="field">
    <span class="ui header">USB</span>

    {#each jurado_usb as jury, i}

      <div class="two inline fields">
        <Datalist
          label="Profesor"
          name="jurado_usb[{i}].profesor"
          bind:value={jurado_usb[i].profesor}
          customHandleChange={(e) => {
            $form.jurado_usb = jurado_usb;
            $form.jurado_usb[i].profesor = e.target.value;
          }}
          options={professors.map(p => ({
            val: p.id,
            name: `${p.apellido2 ?? ''} ${p.apellido1}, ${p.nombre2 ?? ''} ${p.nombre1} - ${p.correo}`
          }))}
          class="twelve wide required field"
          error={$errors.jurado_usb[i]?.profesor}
        />
        
        <!-- TODO: #81 -->
        
        <button type="button" class="ui red button" on:click={() => remove_jury_usb(i)}>
          Elminar
        </button>
      </div>
    {/each}

    {#if $form.jurado_usb.length == 3 || $form.jurado_externo.length == 3 ||
        $form.jurado_usb.length + $form.jurado_externo.length == 3
    }
      <div class="ui mini message">Puede agregar máximo 3 jurados</div>
    {:else}
      <button type="button" class="ui blue button" on:click|preventDefault={() => add_jury_usb()}>
        Agregar Profesor
      </button>
    {/if}
    {#if $form.jurado_usb.length > 0}
      <button type="button" class="ui red button" on:click={() => {$form.jurado_usb = []; jurado_usb = []}}>
        Limpiar
      </button>
    {/if}
  </div>

  <!-- Jurado Externo -->
  <div class="field">
    <span class="ui header">Externos</span>

    {#each jurado_externo as jury, i}

      <Input
        label="Nombre"
        name="jurado_externo[{i}].nombre"
        bind:value={jurado_externo[i].nombre}
        customHandleChange={(e) => {
          $form.jurado_externo = jurado_externo;
          $form.jurado_externo[i].nombre = e.target.value;
        }}
        error={$errors.jurado_externo[i]?.nombre}
        class="required field"
      />
      <Input
        label="Universidad"
        name="jurado_externo[{i}].universidad"
        bind:value={jurado_externo[i].universidad}
        customHandleChange={(e) => {
          $form.jurado_externo = jurado_externo;
          $form.jurado_externo[i].universidad = e.target.value;
        }}
        error={$errors.jurado_externo[i]?.universidad}
        class="field"
      />

      <div class="two inline fields">
        <Input
          label="Correo"
          name="jurado_externo[{i}].correo"
          bind:value={jurado_externo[i].correo}
          customHandleChange={(e) => {
            $form.jurado_externo = jurado_externo;
            $form.jurado_externo[i].correo = e.target.value;
          }}
          error={$errors.jurado_externo[i]?.correo}
          class="twelve wide field"
        />
        <button type="button" class="ui red button" on:click={() => remove_jury_out(i)}>
          Elminar
        </button>
      </div>
    {/each}
    
    {#if $form.jurado_usb.length == 3 || $form.jurado_externo.length == 3 ||
         $form.jurado_usb.length + $form.jurado_externo.length == 3
    }
      <div class="ui mini message">Puede agregar máximo 3 jurados</div>
    {:else}
      <button type="button" class="ui blue button" on:click|preventDefault={() => add_jury_out()}>
        Agregar Profesor
      </button>
    {/if}
    {#if $form.jurado_externo.length > 0}      
      <button type="button" class="ui red button"
        on:click={() => {$form.jurado_externo = []; jurado_externo = []}}
      >
        Limpiar
      </button>
    {/if}
  </div>

  <ActionsButtons action="Asignar" />
</form>

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
