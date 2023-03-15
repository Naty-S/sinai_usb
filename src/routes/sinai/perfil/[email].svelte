<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params, session }) => {

    if (session.user?.professor) {
      const res = await fetch(`/api/professor/${params.email}`);
     
      if (res.ok) {
        const profile = await res.json();
  
        return {
          props: { profile }
        };
      };
  
      const { message } = await res.json();
      return {
        error: new Error(message)
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesion como profesor."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import {
      profesor_categoria_enum
    , profesor_dedicacion_enum
    , profesor_diploma_tipo_enum
  } from "@prisma/client";

  import { session, page } from "$app/stores";

  import { init } from "$lib/utils/forms/profile/init";
  import { validation } from "$lib/utils/forms/profile/validation";
  import { submit } from "$lib/utils/forms/profile/submit";

  import Modal from "$lib/components/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";

  import ResearchLines from "$lib/components/forms/profile/research_lines.svelte";

  export let profile;
  
  const initialValues = init(profile);
  const onSubmit = submit($page.params.email, $page.url.pathname);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });

  $: professor = $session.user?.professor;
  $: modified = Boolean($page.url.searchParams.get("modificado"));
</script>

<form id="profile_form" class="ui large form" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>
  
  <h2 class="uk-text-center">
    Datos Personales
  </h2>
  
  <div class="ui divider" />

  <div class="ui centered grid field">
    <div class="two column row">
      <div class="column">Nombre: {professor?.name1}</div>
      <div class="column">Segundo Nombre: {professor?.name2}</div>
    </div>

    <div class="two column row">
      <div class="column">Apellido: {professor?.surname1}</div>
      <div class="column">Segundo Apellido: {professor?.surname2}</div>
    </div>
  </div>

  <div class="two inline fields">
    <Input
      label="Perfil"
      name="perfil"
      bind:value={$form.perfil}
      error={$errors.perfil}
      class="required field"
    />
    <Input
      label="Página url"
      name="url"
      bind:value={$form.url}
      error={$errors.url}
      class="field"
    />
  </div>

  <div class="ui divider" />

  <h2 class="uk-text-center">
    Datos Académicos
  </h2>

  <div class="ui divider" />

  <div class="two inline fields">
    <Select
      label="Categoría"
      name="categoria"
      bind:value={$form.categoria}
      options={Object.entries(profesor_categoria_enum).map(([_, cat]) => ({ val: cat, name: cat }))}
      class="inline field"
    />
    <Select
      label="Dedicación"
      name="dedicacion"
      bind:value={$form.dedicacion}
      options={Object.entries(profesor_dedicacion_enum).map(([_, ded]) => ({ val: ded, name: ded }))}
      class="inline field"
    />
  </div>

  <div class="ui centered grid field">
    <div class="one column row">
      <div class="column">Responsable de los Grupos de Investigación: 
        {professor?.groups.grupos_investigacion.map(g => g.nombre).join(", ")}
      </div>
    </div>

    <div class="one column row">
      <div class="column">Departamento: {professor?.department.name}</div>
    </div>

    <div class="two column row">
      <div class="column">Número del PPI: {professor?.ppi_number}</div>
      <div class="column">Nivel: {professor?.ppi_level}</div>
    </div>
  </div>
  <div>Aplica a PEI</div> <!-- TODO!!!! -->
  <div class="two inline required fields">
    <Select
      label="Último Diploma"
      name="diploma_tipo"
      bind:value={$form.diploma_tipo}
      options={Object.entries(profesor_diploma_tipo_enum).map(([_, d]) => ({ val: d, name: d }))}
      class="six wide inline field"
    />
    <Input
      label="Universidad del Diploma"
      name="diploma_universidad"
      bind:value={$form.diploma_universidad}
      error={$errors.diploma_universidad}
      class="ten wide required field"
    />
  </div>

  <ResearchLines />
  <ActionsButtons action="Modificar" />
</form>

{#if modified}
  <Modal
    id="profile_modified"
    title="Perfil Modificado"
    close_text="Ok"
    align="center"
    is_active={modified}
    close={() => location.replace($page.url.pathname)}
  >
    <p>Perfil modificado con éxito!!!</p>
  </Modal>
{/if}
