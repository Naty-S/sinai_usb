<!-- 
  @component
  Public searches by:
  * Professor
  * Group
  * Department (TODO)
  * Division (TODO)
  * Coordination (TODO)
 -->
<script lang="ts">
  import type { profesor } from "@prisma/client";

  import type { EntityActivities } from "$lib/interfaces/activities";
	import type { Professor } from "$lib/interfaces/professors";
	import type { Group } from "$lib/interfaces/groups";
	import type { Department } from "$lib/interfaces/departments";
	import type { Division } from "$lib/interfaces/divisions";
	import type { Coordination } from "$lib/interfaces/coordinations";

  import { onMount, setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { init } from "$lib/utils/forms/searchs/init";
  import { validation } from "$lib/utils/forms/searchs/validation";
  import { submit } from "$lib/utils/forms/searchs/submit";

	import Modal from '$lib/components/modal.svelte';
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import Select from "$lib/components/forms/select.svelte";

  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import ResumeTable from "$lib/components/activities/resume_table.svelte";

  import * as api from "$lib/api";

  const initialValues = init();
  const onSubmit = submit();
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  let professors: Professor[] = [];
  let groups: Group[] = [];
  let departments: Department[] = [];
  let divisions: Division[] = [];
  let coordinations: Coordination[] = [];

  let activities: EntityActivities | undefined;
  let search_err = '';

  const show_search = async function(e: any) {
    
    const res = await handleSubmit(e);

    if (res.entity) {
      activities = res;
    } else {
      search_err = res;
    };
  };

  const _reset = function() {
    handleReset();
    activities = undefined;
  };

  onMount(async () => {
    const res1 = await api.get("/api/professors");
    const res2 = await api.get("/api/groups");
    const res3 = await api.get("/api/departments");
    const res4 = await api.get("/api/divisions");
    const res5 = await api.get("/api/coordinations");

    if (res1.ok && res2.ok && res3.ok && res4.ok && res5.ok) {
      
      const res1_json = await res1.clone().json();
      professors = res1_json.filter((p: profesor) => p.id !== 0).map((p: profesor) => (
        { id: p.id, name: p.perfil }
      ));
      groups = await res2.clone().json();
      departments = await res3.clone().json();
      divisions = await res4.clone().json();
      coordinations = await res5.clone().json();

    } else {

      const { message, code } = await res1.json();
      // action.info = message;
      // action.code = code;
      console.log(message)
    };
  });

  setContext(key, {
    form, errors, handleChange
  });  
</script>

<form class="ui large form" on:submit|preventDefault={show_search} on:reset={_reset}>
  <div class="field fields">
    <label for="search_type">
      Seleccione el tipo de búsqueda que desea realizar
    </label>
    <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
      <!-- professor -->
      <label>
        <input
          type="radio"
          id="search_type-professor"
          name="search_type"
          value="professor"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
          checked
        >
        Profesor
      </label>
      <!-- group -->
      <label>
        <input
          type="radio"
          id="search_type-group"
          name="search_type"
          value="group"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
        >
        Grupo
      </label>
      <!-- department -->
      <!-- <label>
        <input
          type="radio"
          id="search_type-departament"
          name="search_type"
          value="departament"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
        >
        Departamento
      </label> -->
      <!-- division -->
      <!-- <label>
        <input
          type="radio"
          id="search_type-division"
          name="search_type"
          value="division"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
        >
        División
      </label> -->
      <!-- coordination -->
      <!-- <label>
        <input
          type="radio"
          id="search_type-coordination"
          name="search_type"
          value="coordination"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
        >
        Coordinación
      </label> -->
    </div>

    {#if $errors.search_type}
      {$errors.search_type}
    {/if}
  </div>

  {#if $form.search_type === "group"}
    <Select
      label="Buscar Grupo"
      name="search"
      bind:value={$form.search}
      options={groups.map(o => ({ val: o.id.toString(), name: o.name }))}
    />
  {:else if $form.search_type === "department"}
    <Select
      label="Buscar Departamento"
      name="search"
      bind:value={$form.search}
      options={departments.map(o => ({ val: o.id.toString(), name: o.nombre }))}
    />
  {:else if $form.search_type === "division"}
    <Select
      label="Buscar División"
      name="search"
      bind:value={$form.search}
      options={divisions.map(o => ({ val: o.id.toString(), name: o.nombre }))}
    />
  {:else if $form.search_type === "coordination"}
    <Select
      label="Buscar Coordinación"
      name="search"
      bind:value={$form.search}
      options={coordinations.map(o => ({ val: o.id.toString(), name: o.nombre }))}
    />
  {:else}
    <Select
      label="Buscar Profesor"
      name="search"
      bind:value={$form.search}
      options={professors.map(o => ({ val: o.id.toString(), name: o.name }))}
    />
  {/if}

  <div>
    {#if activities}
      <button type="reset" name="reset_form" class="ui red button">
        Reset
      </button>
    {:else}
      <button type="submit" name="submit_form" class="ui green button">
        Buscar
      </button>
    {/if}
  </div>
</form>

<div class="ui divider" />

{#if activities}
  <h3>Resumen de Actividades del {activities.entity}</h3>

  <!-- Display activities resume table -->
  <ResumeTable
    headers={["Actividad"].concat(activities.by_year.map(a => a.year.toString()))}
    resume_kinds_counts={activities.years_counts}
    links
    row_total
    col_total
  />

  <div>
    {#each activities.by_year as year_activities}
      <YearActivities {year_activities}/>
    {/each}
  </div>
{:else}
  <div class="ui card">
    No se encontraron actividades
  </div>
{/if}

{#if search_err !== ''}
  <Modal
    id="search_err"
    title="Error al buscar datos"
    close_text="Ok"
    align="center"
    is_active={search_err !== ''}
    close={() => search_err = ''}
  >
    <p>Hubo un error al realizar la búsqueda. Por favor vuelva a intentar.</p>
    <span class="ui red text">Detalles: {search_err}</span>
  </Modal>
{/if}
