<script lang="ts" context="module">
  import type { Load, RequestEvent } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {

    const res = await fetch(`/api/professor/${params.id}`);
   
    if (res.ok) {
      const profile = await res.json();

      return {
        props: {profile}
      };
    };

    const { message } = await res.json();
    return {
      error: new Error(message)
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
  import * as cookie from "cookie";

  import { session, page } from "$app/stores";
  import {  } from "$app/paths";

  import { init } from "$lib/shared/forms/profile/init";
  import { validation } from "$lib/shared/forms/profile/validation";
  import { submit } from "$lib/shared/forms/profile/submit";

  import ActionsButtons from "$components/forms/actions_buttons.svelte";
  import Input from "$components/forms/input.svelte";
  import Select from "$components/forms/select.svelte";
  
  import ResearchLines from "$components/forms/profile/research_lines.svelte";

  export let profile;
  
  const initialValues = init(profile);
  $: onSubmit = submit($page.params.id, $page.url);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset, isSubmitting } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });

  $: update_user = function (e: any) {
    // console.log(e)

    if (isSubmitting && $session.user?.professor) {
      $session.user.professor.profile = $form.perfil;
      $session.user.professor.page = $form.url;
      $session.user.professor.category = $form.categoria;
      $session.user.professor.dedication = $form.dedicacion;
      $session.user.professor.diploma = $form.diploma_tipo;
      $session.user.professor.diploma_university = $form.diploma_universidad;
      $session.user.professor.research_lines = $form.lineas_investigacion;
  
      // const cookies = cookie.parse(e.request.headers.get("cookie") || '');
      // const jwt = Buffer.from(JSON.stringify($session.user)).toString("base64");
      // cookies.jwt = jwt;
      // console.log(cookies)
      // e.request.headers.set("cookie", JSON.stringify(cookies))
    };
  };
</script>

<!-- <svelte:window on:submit={update_user} ></svelte:window> -->

<form id="profile_form" class="ui large form" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>
  
  <h2 class="uk-text-center">
    Datos Personales
  </h2>
  
  <div class="ui divider" />

  <div class="ui centered grid field">
    <div class="two column row">
      <div class="column">Nombre: {profile?.name1}</div>
      <div class="column">Segundo Nombre: {profile?.name2}</div>
    </div>

    <div class="two column row">
      <div class="column">Apellido: {profile?.surname1}</div>
      <div class="column">Segundo Apellido: {profile?.surname2}</div>
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
      <div class="column">Grupos de Investigación: 
        {profile?.groups.grupos_investigacion.map(g => g.nombre).join(", ")}.
        {profile?.groups.historico_grupos.map(g => g.Grupo.nombre).join(", ")}.
      </div>
    </div>

    <div class="one column row">
      <div class="column">Departamento: {profile?.department.name}</div>
    </div>

    <div class="two column row">
      <div class="column">Número del PEI: {profile?.ppi_number}</div>
      <div class="column">Nivel: {profile?.ppi_level}</div>
    </div>
  </div>

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
