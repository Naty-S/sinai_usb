<!-- 
  @component
  Public searches by:
  * Professor
  * Group
  * Department
  * Division
  * Coordination
 -->
<script lang="ts">
  import type { profesor } from "@prisma/client";

  import type {
      Activities
    , ActivitiesCounts
    , YearActivities as YearActivitiesT
  } from "$lib/interfaces/activities";
	import type { Profesor } from "$lib/interfaces/professors";
	import type { Group } from "$lib/interfaces/groups";
	import type { Department } from "$lib/interfaces/departments";
	import type { Division } from "$lib/interfaces/divisions";
	import type { Coordination } from "$lib/interfaces/coordinations";
	
  import type { Activity } from "$lib/types/activities";

  import { onMount, setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

	import { session } from '$app/stores';

  import * as api from "$lib/api";

	import { detailed_kinds } from "$lib/constants";
	import { filter_activities } from "$lib/utils/filters";
  import { acts_kinds_by_year } from "$lib/utils/grouping";
  import { count_acts_kinds_by_year } from "$lib/utils/maths";

  import { init } from "$lib/utils/forms/searchs/init";
  import { validation } from "$lib/utils/forms/searchs/validation";
  import { submit } from "$lib/utils/forms/searchs/submit";

	import Loader from "$lib/components/loader.svelte";
	import Modal from '$lib/components/modals/modal.svelte';
  import Pagination from "$lib/components/pagination.svelte";
  import Select from "$lib/components/forms/select.svelte";
  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import ResumeTable from "$lib/components/activities/resume_table.svelte";

  const initialValues = init();
  const onSubmit = submit();
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  let professors: Profesor[] = [];
  let groups: Group[] = [];
  let departments: Department[] = [];
  let divisions: Division[] = [];
  let coordinations: Coordination[] = [];

  let searching = false;
  let search_err = '';

  let owner: string;
  let activities: Activity[] = [];
  let activities_by_year: YearActivitiesT[];
  let activities_years_counts: ActivitiesCounts[];
  let page_activities: YearActivitiesT[];

  let pagination_size = 20;
  let start_pagination = 0;
  let end_pagination = pagination_size;

  let kind = '';
  let start_date: string = '';
  let end_date: string = '';

  $: show_invalid = Boolean($session.user);
  $: show_invalid ? detailed_kinds : detailed_kinds.shift();

  const show_search = async function(e: any) {
    
    searching = true;
    const res: Activities | string = await handleSubmit(e);
    searching = false;

    if (typeof res !== "string") {
      
      owner = res.owner.full_name;
      activities = res.activities;
      activities_by_year = acts_kinds_by_year(activities, show_invalid);
      activities_years_counts = count_acts_kinds_by_year(activities, show_invalid);
      page_activities = acts_kinds_by_year(activities.slice(start_pagination, end_pagination), show_invalid);

    } else {
      search_err = res;
    };
  };

  const _reset = function() {
    handleReset();
    activities = [];
    kind = '';
    start_pagination = 0;
    end_pagination = pagination_size;
    start_date = '';
    end_date = '';
  };

  const show_prev = function () {

    start_pagination -= pagination_size;
    end_pagination -= pagination_size;

    page_activities = filter_activities(
      activities, kind, start_date, end_date, start_pagination, end_pagination, show_invalid);
  };

  const show_page = function (page: number) {

    start_pagination = page === 0 ? page : end_pagination;
    end_pagination = page === 0 ? pagination_size : start_pagination + pagination_size;

    page_activities = filter_activities(
      activities, kind, start_date, end_date, start_pagination, end_pagination, show_invalid);
  };

  const show_next = function () {

    start_pagination += pagination_size;
    end_pagination += pagination_size;

    page_activities = filter_activities(
      activities, kind, start_date, end_date, start_pagination, end_pagination, show_invalid);
  };

  const resize_pagination = function (size: number) {
    pagination_size = size;
    start_pagination = 0;
    end_pagination = pagination_size;
    page_activities = filter_activities(
      activities, kind, start_date, end_date, start_pagination, end_pagination, show_invalid)
  };

  const filter = function() {
    page_activities = filter_activities(
      activities, kind, start_date, end_date, start_pagination, end_pagination, show_invalid);
  };

  onMount(async () => {
    const res1 = await api.get("/api/professors");
    const res2 = await api.get("/api/groups");
    const res3 = await api.get("/api/departments");
    const res4 = await api.get("/api/divisions");
    const res5 = await api.get("/api/coordinations");

    if (res1.ok && res2.ok && res3.ok && res4.ok && res5.ok) {
      
      const profesors: Profesor[] = await res1.clone().json();

      professors = profesors.filter(p => p.activo);
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
      <label>
        <input
          type="radio"
          id="search_type-departament"
          name="search_type"
          value="department"
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
        >
        Departamento
      </label>
      <!-- division -->
      <label>
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
      </label>
      <!-- coordination -->
      <label>
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
      </label>
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
      options={groups.map(o => ({ val: o.id.toString(), name: o.nombre }))}
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
      options={professors.map(o => ({ val: o.id.toString(), name: o.perfil }))}
    />
  {/if}

  <div id="action_buttons">
    {#if activities.length >0}
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

{#if searching}
  <Loader />
{:else if activities.length > 0}
  <h3>Resumen de Actividades {owner}</h3>

  <!-- Display all activities resume table -->
  <ResumeTable
    headers={["Actividad"].concat(activities_by_year.map(a => a.year.toString()))}
    resume_kinds_counts={activities_years_counts}
    row_total
    col_total
  />

  <!-- Display activities by year -->
  <div>
    
    <!-- Filters -->
    <div id="filters" class="ui segments">
      <div class="ui vertically fitted segment"><strong>Filtrar Actividades:</strong></div>

      <div id="page_size" class="ui stackable small compact buttons segment">
        <button class="ui button" on:click={() => resize_pagination(20)}>20</button>
        <button class="ui button" on:click={() => resize_pagination(30)}>30</button>
        <button class="ui button" on:click={() => resize_pagination(50)}>50</button>
        <button class="ui button" on:click={() => resize_pagination(100)}>100</button>
      </div>

      <div id="date_filter" class="ui horizontal stackable segments">
        <div class="ui segment">
          <label for="start_date">Fecha Inicio</label>
          <input type="date" name="start_date" bind:value={start_date}>
        </div>
        <div class="ui segment">
          <label for="end_date">Fecha Final</label>
          <input type="date" name="end_date" bind:value={end_date}>
        </div>
        <div class="ui segment">        
          <button type="button" class="ui green mini button" on:click={filter}>
            Filtrar
          </button>
        </div>
      </div>

      <div id="kind_filter" class="ui segment segments">
        <label class="ui segment" for="kinds">Tipos de Actividad</label>
        <div class="ui segment">
          <button class="ui blue mini button" on:click={() => {kind = ''; filter()}}>
            TODAS
          </button>
          <select
            name="kinds"
            class="ui fluid selection dropdown"
            bind:value={kind}
            on:change={filter}
          >
            {#each detailed_kinds as k}
              <option value={k}>{k}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    {#key page_activities}
      {#each page_activities as year_activities}
        <YearActivities {year_activities}/>
      {/each}
    {/key}
  </div>

  <Pagination
    size={activities.length}
    page_size={pagination_size}
    start={start_pagination}
    end={end_pagination}
    {show_prev} {show_next}
  />
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
    pop_up={search_err !== ''}
    close={() => { search_err = ''; location.reload(); }}
  >
    <p>Hubo un error al realizar la búsqueda. Por favor vuelva a intentar.</p>
    <span class="ui red text">Detalles: {search_err}</span>
  </Modal>
{/if}
