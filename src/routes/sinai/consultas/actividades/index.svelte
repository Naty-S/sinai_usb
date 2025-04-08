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
  import { init_date } from "$lib/utils/formatting";
  import { acts_kinds_by_year } from "$lib/utils/grouping";
  import { count_acts_kinds_by_year } from "$lib/utils/maths";

  import { init } from "$lib/utils/forms/searchs/init";
  import { validation } from "$lib/utils/forms/searchs/validation";
  import { submit } from "$lib/utils/forms/searchs/submit";

	import ActivitiesFilter from "$lib/components/forms/activities_filter.svelte";
	import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
	import Loader from "$lib/components/loader.svelte";
	import Modal from '$lib/components/modals/modal.svelte';
  import Pagination from "$lib/components/pagination.svelte";
  import Select from "$lib/components/forms/select.svelte";
  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import ResumeTable from "$lib/components/activities/resume_table.svelte";

  const years = 10;
  const initialValues = init("professor", 614, years);
  const onSubmit = submit();
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);
  
  const current_year = (new Date()).getFullYear();
  const date_start = init_date(new Date(`01-01-${current_year-years}`));
  const date_end = init_date(new Date(`01-01-${current_year}`));


  let professors: Profesor[] = [];
  let groups: Group[] = [];
  let departments: Department[] = [];
  let divisions: Division[] = [];
  let coordinations: Coordination[] = [];
  let action = { info: '', code: '' };

  let searching = false;
  let search_err = '';

  let owner: string;
  let activities: Activity[] = [];
  let activities_by_year: YearActivitiesT[];
  let activities_years_counts: ActivitiesCounts[];
  let page_activities: YearActivitiesT[];

  let pagination_size = 20;
  let current_page = 1;
  let start_pagination = 0;
  let end_pagination = pagination_size;

  $: show_invalid = Boolean($session.user);
  $: show_invalid ? detailed_kinds : detailed_kinds.shift();

  const show_search = async function(e: any) {
    
    searching = true;
    const res: Activities | string = await handleSubmit(e);
    
    if (res && typeof res !== "string") {
      
      reset();
      
      owner = res.owner.full_name;
      activities = res.activities;
      activities_by_year = acts_kinds_by_year(activities, show_invalid);
      activities_years_counts = count_acts_kinds_by_year(activities, show_invalid);
      page_activities = acts_kinds_by_year(activities.slice(start_pagination, end_pagination), show_invalid);
      searching = false;

    } else {
      search_err = res;
    };
  };

  const select_all = function () {
    $form.articulo_revista = true;
    $form.capitulo_libro = true;
    $form.composicion = true;
    $form.evento = true;
    $form.exposicion = true;
    $form.grabacion = true;
    $form.informe_tecnico = true;
    $form.libro = true;
    $form.memoria = true;
    $form.partitura = true;
    $form.patente = true;
    $form.premio = true;
    $form.premio_bienal = true;
    $form.proyecto_grado = true;
    $form.proyecto_investigacion = true;
    $form.recital = true;
  };

  const reset = function() {
    activities = [];
    pagination_size = 20;
    current_page = 1;
    start_pagination = 0;
    end_pagination = pagination_size;
  };

  const reset_filters = function() {
    $form.date_start = date_start;
    $form.date_end = date_end;

    if ($form.search_type == "professor") { select_all(); }
    else {
      $form.articulo_revista = true,
      $form.capitulo_libro = false,
      $form.composicion = false,
      $form.evento = false,
      $form.exposicion = false,
      $form.grabacion = false,
      $form.informe_tecnico = false,
      $form.libro = false,
      $form.memoria = false,
      $form.partitura = false,
      $form.patente = false,
      $form.premio = false,
      $form.premio_bienal = false,
      $form.proyecto_grado = false,
      $form.proyecto_investigacion = false,
      $form.recital = false
    }
  };

  const handleRadioChange = function(e: any, search: number) {
    handleChange(e);
    $form.search = search;
    reset();

    if (e.target.value == "professor") { select_all(); }
    else {
      $form.articulo_revista = true,
      $form.capitulo_libro = false,
      $form.composicion = false,
      $form.evento = false,
      $form.exposicion = false,
      $form.grabacion = false,
      $form.informe_tecnico = false,
      $form.libro = false,
      $form.memoria = false,
      $form.partitura = false,
      $form.patente = false,
      $form.premio = false,
      $form.premio_bienal = false,
      $form.proyecto_grado = false,
      $form.proyecto_investigacion = false,
      $form.recital = false
    }
  };

  const show_prev = function () {

    current_page -= 1;
    start_pagination = (current_page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    page_activities = filter_activities(
      activities, '', '', '', start_pagination, end_pagination, false, show_invalid) as YearActivitiesT[];
  };

  const show_page = function (page: number) {

    current_page = page;
    start_pagination = (page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    page_activities = filter_activities(
      activities, '', '', '', start_pagination, end_pagination, false, show_invalid) as YearActivitiesT[];
  };

  const show_next = function () {

    current_page += 1;
    start_pagination = (current_page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    page_activities = filter_activities(
      activities, '', '', '', start_pagination, end_pagination, false, show_invalid) as YearActivitiesT[];
  };

  const resize_pagination = function (size: number) {
    
    pagination_size = size;
    start_pagination = 0;
    end_pagination = pagination_size;
    
    page_activities = filter_activities(
      activities, '', '', '', start_pagination, end_pagination, false, show_invalid) as YearActivitiesT[];
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
      action.info = message;
      action.code = code;
    };
  });

  setContext(key, { form, errors, handleChange });
  $: console.log($form)
</script>

<form class="ui large form" on:submit|preventDefault={show_search} on:reset={handleReset}>
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
          on:change={(e) => handleRadioChange(e, 614)}
          on:blur={(e) => handleRadioChange(e, 614)}
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
          on:change={(e) => handleRadioChange(e, 1)}
          on:blur={(e) => handleRadioChange(e, 1)}
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
          on:change={(e) => {handleRadioChange(e, 2)}}
          on:blur={(e) => {handleRadioChange(e, 2)}}
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
          on:change={(e) => handleRadioChange(e, 1)}
          on:blur={(e) => handleRadioChange(e, 1)}
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
          on:change={(e) => handleRadioChange(e, 1)}
          on:blur={(e) => handleRadioChange(e, 1)}
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
      options={groups.map(o => ({ val: o.id.toString(), name: `Grupo ${o.id.toString()} - ${o.nombre}` }))}
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
      options={professors.map(o => ({ val: o.id.toString(), name: `${o.apellido1}, ${o.nombre1}` }))}
    />
  {/if}

  <ActivitiesFilter {date_start} {date_end} />
  {#if $form.search_type != "professor"}
    <ActionsButtons action="Buscar" reset="Reiniciar Filtros" on_reset={reset_filters} button="Seleccionar Todas" on_click={select_all} />
  {:else}
    <ActionsButtons action="Buscar" reset="Reiniciar Filtros" on_reset={reset_filters} />
  {/if}
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
      <div class="ui vertically fitted segment"><strong>Actividades por página:</strong></div>

      <div id="page_size" class="ui stackable small compact buttons segment">
        <button class="ui button" on:click={() => resize_pagination(20)}>20</button>
        <button class="ui button" on:click={() => resize_pagination(30)}>30</button>
        <button class="ui button" on:click={() => resize_pagination(50)}>50</button>
        <button class="ui button" on:click={() => resize_pagination(100)}>100</button>
        <button class="ui button" on:click={() => resize_pagination(200)}>200</button>
        <button class="ui button" on:click={() => resize_pagination(300)}>300</button>
        <button class="ui button" on:click={() => resize_pagination(500)}>500</button>
      </div>
    </div>

    <Pagination
      size={activities.length}
      page_size={pagination_size}
      start={start_pagination}
      end={end_pagination}
      {show_prev} {show_page} {show_next}
    />

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
    {show_prev} {show_page} {show_next}
  />
{:else}
  <div>
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
    <span class="ui red text">Detalles: {search_err ?? "No se encuentra en la lista de errores conocidos"}</span>
  </Modal>
{/if}

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code ?? "Desconocido"}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={location.reload}
  >
    <p>
      Hubo un problema al cargar la lista de profesores, por favor recargue la página
      o contáctese con algún administrador proporcionando el código del error.
    </p>
    <span class="ui red text">Detalles: {action.info ?? "No se encuentra en la lista de errores conocidos"}</span>
  </Modal>
{/if}
