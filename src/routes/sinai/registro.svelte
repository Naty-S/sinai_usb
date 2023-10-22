<!--
  New professor register page
-->
<script lang="ts" context="module">
  import { redirect } from "$lib/utils/session";
  
  export const load = redirect;
</script>
<script lang="ts">
  import type { Department } from "$lib/interfaces/departments";

  import { onMount, setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";
  
  import {
    profesor_categoria_enum,
    profesor_condicion_enum,
    profesor_dedicacion_enum,
    profesor_diploma_tipo_enum,
    pei_nivel_enum
  } from "@prisma/client";

  import { page } from "$app/stores";

  import * as api from "$lib/api";

  import { init } from "$lib/utils/forms/auth/register/init";
  import { validation } from "$lib/utils/forms/auth/register/validation";
  import { submit } from "$lib/utils/forms/auth/register/submit";
  
  import Modal from "$lib/components/modals/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import Input from "$lib/components/forms/input.svelte";
  import Select from "$lib/components/forms/select.svelte";

	import GoogleSchoolarPosts from "$lib/components/forms/register/google_schoolar_posts.svelte";
	import OrcidPosts from "$lib/components/forms/register/orcid_posts.svelte";
	import ResearchGatePosts from "$lib/components/forms/register/research_gate_posts.svelte";

  // Config form
  const initialValues = init();
  const onSubmit = submit();
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  let departments: Department[] = [];
  let action = { info: '', code: '' };
  let registered = false;

  const register = async function (e: any) {

    const res = await handleSubmit(e);

    if (res?.message) {
      
      action.info = res.message;
      action.code = res.code;

    } else {
      registered = res;
    };
  };
  
  $: not_active = Boolean($page.url.searchParams.get("no_activo"));

  onMount(async () => {
    const res = await api.get("/api/departments");

    if (res.ok) {
      departments = await res.clone().json();
    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  });

  setContext(key, {
    form, errors, handleChange
  });
</script>

{#if registered}
  <p class="uk-text-center">
    Se ha registrado de forma exitosa en el sistema del SINAI. <br/>
    Se le ha notificado al coordinador de su departamento para que sea activado en el 
    sistema y pueda ingresar.
  </p>
{:else if not_active}
  <p class="uk-text-center">
    Usted NO se encuentra activo en el sistema. <br/>
    Por favor comuníquese con su coordinador para activarse en el SINAI.
  </p>
{:else}
  <form class="ui large form" on:submit|preventDefault={register} on:reset={handleReset}>
    <div id="name" class="two inline fields">
      <Input
        label="Primer Nombre"
        name="professor.nombre1"
        bind:value={$form.professor.nombre1}
        error={$errors.professor.nombre1}
        class="required field"
      />
      <Input
        label="Segundo Nombre"
        name="professor.nombre2"
        bind:value={$form.professor.nombre2}
        error={$errors.professor.nombre2}
        class="field"
      />
    </div>
    <div id="surname" class="two inline fields">
      <Input
        label="Primer Apellido"
        name="professor.apellido1"
        bind:value={$form.professor.apellido1}
        error={$errors.professor.apellido1}
        class="required field"
      />
      <Input
        label="Segundo Apellido"
        name="professor.apellido2"
        bind:value={$form.professor.apellido2}
        error={$errors.professor.apellido2}
        class="field"
      />
    </div>
    <Input
      label="Perfil"
      name="professor.perfil"
      placeholder="Apellido, Nombre"
      bind:value={$form.professor.perfil}
      error={$errors.professor.perfil}
      class="required field"
    />
    <div class="three inline fields">
      <Input
        label="Cédula"
        name="professor.cedula"
        placeholder={"12345678"}
        bind:value={$form.professor.cedula}
        error={$errors.professor.cedula}
        class="required field"
      />
      <Input
        label="Correo"
        name="professor.correo"
        placeholder="USBID@usb.ve"
        bind:value={$form.professor.correo}
        error={$errors.professor.correo}
        class="required field"
      />
      <Select
        label="Sexo"
        name="professor.sexo"
        bind:value={$form.professor.sexo}
        options={[{ val: 'F', name: 'F'}, { val: 'M', name: 'M'}]}
        class="inline field"
      />
    </div>
    <div class="three inline fields">
      <Select
        label="Categoría"
        name="professor.categoria"
        bind:value={$form.professor.categoria}
        options={Object.entries(profesor_categoria_enum).map(([_, categoria]) => ({ val: categoria, name: categoria }))}
        class="inline field"
      />
      <Select
        label="Condición"
        name="professor.condicion"
        bind:value={$form.professor.condicion}
        options={Object.entries(profesor_condicion_enum).map(([_, condicion]) => ({ val: condicion, name: condicion }))}
        class="inline field"
      />
      <Select
        label="Dedicación"
        name="professor.dedicacion"
        bind:value={$form.professor.dedicacion}
        options={Object.entries(profesor_dedicacion_enum).map(([_, dedicacion]) => ({ val: dedicacion, name: dedicacion }))}
        class="inline field"
      />
    </div>
    <div class="field">
      <label for="">PEI</label>
      <div class="three inline fields">
        <Input
          label="Número"
          name="pei.numero"
          placeholder="v-xxxxxxxx-xx-xxxx"
          bind:value={$form.pei.numero}
          error={$errors.pei.numero}
          class="required field"
        />
        <Input
          label="Anio"
          name="pei.anio"
          bind:value={$form.pei.anio}
          error={$errors.pei.anio}
          class="required field"
        />
        <Select
          label="Nivel"
          name="pei.nivel"
          bind:value={$form.pei.nivel}
          options={Object.entries(pei_nivel_enum).map(([_, nivel]) => ({ val: nivel, name: nivel }))}
          class="inline field"
        />
      </div>
    </div>
    <div class="two inline fields">
      <Select
        label="Último Diploma"
        name="professor.diploma_tipo"
        bind:value={$form.professor.diploma_tipo}
        options={Object.entries(profesor_diploma_tipo_enum).map(([_, diploma]) => ({ val: diploma, name: diploma }))}
        class="five wide inline field"
      />
      <Input
        label="Universidad donde lo obtuvo"
        name="professor.diploma_universidad"
        bind:value={$form.professor.diploma_universidad}
        error={$errors.professor.diploma_universidad}
        class="eleven wide required field"
      />
    </div>
    <Select
      label="Departamento"
      name="professor.departamento"
      bind:value={$form.professor.departamento}
      options={departments.map(d => ({ val: d.id.toString(), name: `${d.id} - ${d.nombre}`}))}
      class="field"
    />
    <Input
      label="Página Web Personal"
      name="professor.url"
      placeholder="http://www.example.com"
      bind:value={$form.professor.url}
      error={$errors.professor.url}
      class="field"
    />

    <div class="field">
      <label for="">Perfil de Orcid</label>
      <div class="two inline fields">
        <Input
          type="number"
          label="Id"
          name="professor.orcid_id"
          bind:value={$form.professor.orcid_id}
          error={$errors.professor.orcid_id}
          class="field"
        />
        <Input
          label="Link del perfil"
          name="professor.orcid_profile"
          placeholder="http://www.example.com"
          bind:value={$form.professor.orcid_profile}
          error={$errors.professor.orcid_profile}
          class="twelve wide field"
        />
      </div>
      <OrcidPosts />
    </div>

    <div class="field">
      <label for="">Perfil de Google Schoolar</label>
      <div class="two inline fields">
        <Input
          type="number"
          label="Id"
          name="professor.google_schoolar_id"
          bind:value={$form.professor.google_schoolar_id}
          error={$errors.professor.google_schoolar_id}
          class="field"
        />
        <Input
          label="Link del perfil"
          name="professor.google_schoolar_profile"
          placeholder="http://www.example.com"
          bind:value={$form.professor.google_schoolar_profile}
          error={$errors.professor.google_schoolar_profile}
          class="twelve wide field"
        />
      </div>
      <GoogleSchoolarPosts />
    </div>

    <div class="field">
      <label for="">Perfil de Research Gate</label>
      <div class="two inline fields">
        <Input
          type="number"
          label="Id"
          name="professor.research_gate_id"
          bind:value={$form.professor.research_gate_id}
          error={$errors.professor.research_gate_id}
          class="field"
        />
        <Input
          label="Link del perfil"
          name="professor.research_gate_profile"
          placeholder="http://www.example.com"
          bind:value={$form.professor.research_gate_profile}
          error={$errors.professor.research_gate_profile}
          class="twelve wide field"
        />
      </div>
      <ResearchGatePosts />
    </div>

    <ActionsButtons action="Registrarse" />
  </form>
{/if}

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
      Hubo un problema al cargar el formulario o registro, por favor recargue la página 
      o contáctese con algún administrador proporcionando el código del error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
