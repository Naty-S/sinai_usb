<!-- 
  Display activities by year for dean, professor or group
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const { entity, id } = params;
    const _id = Number(id);
    const user = session.user;
    const professor = user?.professor;
    const in_group = professor?.groups.historico_grupos.map(g => g.Grupo.id).includes(_id);

    // si es decano que ve otros prof no mostrar las del decano
    if (user) {

      let _entity = entity === "decano" ? "dean" : "professor";

      if (entity === "grupo") {

        if (in_group || user?.dean ||
          professor?.is_dep_chief || professor?.is_dep_representative ||
          professor?.coord_chief || professor?.division_chief
        ) {
          _entity = "group";
  
        } else {
          return {
            error: new Error("Acceso denegado. Inicie sesión con el usuario adecuado."),
            status: 401
          };
        };
      }

      const api = user?.dean && _entity === "dean" ? `/api/activities/dean/${user?.email}`
                                                  : `/api/activities/${_entity}/${id}`;
      const res = await fetch(api);
     
      if (res.ok) {
        const activities: Activities = await res.json();
  
        return { props: { owner: activities.owner.full_name, activities: activities.activities } };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar actividades del ${entity}.\n${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión en el sistema."),
        status: 401
      };
    }
  };
</script>
<script lang="ts">
  import type { PropActivities } from "$lib/interfaces/activities";
  import type { Activities } from "$lib/interfaces/activities";
  import type { Activity } from "$lib/types/activities";
  
  import { page, session } from "$app/stores";

	import { detailed_kinds } from "$lib/constants";
	import { filter_activities } from "$lib/utils/filters";
  import { acts_kinds_by_prop, paginate } from "$lib/utils/grouping";
  import { count_acts_kinds_by_year } from "$lib/utils/maths";
  
	import Modal from '$lib/components/modals/modal.svelte';
  import Pagination from "$lib/components/pagination.svelte";
  import CreateActivities from "$lib/components/modals/create_activities.svelte";
  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import ResumeTable from "$lib/components/activities/resume_table.svelte";

  export let owner: string;
  export let activities: Activity[];

  const activities_by_year = acts_kinds_by_prop(activities) as PropActivities[];
  const activities_years_counts = count_acts_kinds_by_year(activities);
  const headers = ["Actividad"].concat(activities_by_year.map(a => a.prop));

  let pagination_size = 100;
  let current_page = 1;
  let start_pagination = 0;
  let end_pagination = pagination_size;
  let filtered_activities = activities;
  let paginated_activities = paginate(activities, pagination_size) as PropActivities[][];
  let page_activities = paginated_activities[current_page-1];

  let kind = '';
  let start_date = '';
  let end_date = '';

  let pop_create_act = false;
  let show_filters = false;
  let show_buttons = false;

  $: user = $session.user;
  $: professor = user?.professor;
  $: act_created = Boolean($page.url.searchParams.get("creada"));
  $: act_modified = Boolean($page.url.searchParams.get("modificada"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
  $: editable = $page.params.entity !== "grupo" || $session.user?.dean !== undefined;

  const show_prev = function () {

    current_page -= 1;
    start_pagination = (current_page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size) as PropActivities[][];
    page_activities = paginated_activities[current_page-1];
  };

  const show_page = function (page: number) {

    current_page = page;
    start_pagination = (page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size) as PropActivities[][];
    page_activities = paginated_activities[current_page-1];
  };

  const show_next = function () {

    current_page += 1;
    start_pagination = (current_page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size) as PropActivities[][];
    page_activities = paginated_activities[current_page-1];
  };

  const resize_pagination = function (size: number) {
    
    pagination_size = size;
    start_pagination = 0;
    end_pagination = pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size) as PropActivities[][];
    page_activities = paginated_activities[current_page-1];
  };

  const filter = function() {
    
    current_page = 1;
    start_pagination = 0;
    end_pagination = pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size) as PropActivities[][];
    page_activities = paginated_activities[current_page-1];
  };

  const go_down = function() {

    document.body.scrollIntoView();
    
    const top = document.getElementById("pagination")?.getBoundingClientRect().top ?? 0;
    const scroll = top - 150;

    document.body.scrollTo(0, scroll); // For Safari
    document.documentElement.scrollTo(0, scroll); // For Chrome, Firefox, IE and Opera
  }

  $: can_filter = function() {
    return user?.dean || professor?.is_dep_chief || professor?.is_dep_representative ||
      professor?.coord_chief || professor?.division_chief;
  };
</script>

<h3>Resumen de Actividades {owner}</h3>

<!-- Display activities resume table -->
<ResumeTable
  {headers}
  resume_kinds_counts={activities_years_counts}
  row_total
  col_total
/>

<div id="buttons" class="uk-clearfix">
  {#if can_filter()}  
    <button
      type="button"
      class="ui right floated primary mini button"
      on:click={() => show_filters = !show_filters}
    >
      <i class="filter icon"/>Filtro
    </button>
  {/if}
  {#if $page.params.entity !== "grupo"}
    <button
      type="button"
      class="ui right floated primary mini button"
      on:click={() => {show_buttons = !show_buttons; go_down()}}
    >
      <i class="pen icon"/>Modificar
    </button>
  {/if}
</div>

<!-- Filters -->
{#if show_filters}
  <div id="filters" class="ui segments">

    <div id="pagination_size" class="ui segment">
      <strong>Actividades por página:</strong>
      <div id="page_size" class="ui stackable small compact buttons">
        <button class="ui button" on:click={() => resize_pagination(20)}>20</button>
        <button class="ui button" on:click={() => resize_pagination(30)}>30</button>
        <button class="ui button" on:click={() => resize_pagination(50)}>50</button>
        <button class="ui button" on:click={() => resize_pagination(100)}>100</button>
      </div>
    </div>

    <div id="date_filter" class="ui horizontal stackable segments segment">
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

    <div id="kind_filter" class="ui stackable grid segment">
      <label class="two wide column" for="kinds">
        <strong>
          Tipo de Actividad
        </strong>
        <button class="ui blue mini button" on:click={() => {kind = ''; filter()}}>
          TODAS
        </button>
      </label>
      <div class="fourteen wide column">
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
{/if}
  
<!-- Display activities by year -->
{#if page_activities?.length > 0}

  <Pagination
    size={filtered_activities.length}
    page_size={pagination_size}
    start={start_pagination}
    end={end_pagination}
    {show_prev} {show_page} {show_next}
  />

  <!-- Activities by year -->
  {#key page_activities}
    {#each page_activities as year_activities}
      <YearActivities {year_activities} {editable} {show_buttons}/>
    {/each}
  {/key}
  
  <Pagination
    size={filtered_activities.length}
    page_size={pagination_size}
    start={start_pagination}
    end={end_pagination}
    {show_prev} {show_page} {show_next}
  />
{:else}
  <div />
{/if}

{#if $page.params.entity === "profesor"} 
  <div class="uk-text-center">
    <p>
      Nota: Las actividades ingresadas en el Sistema podrán ser consultadas públicamente
      por lo que se recomienda a los profesores tomar las medidas necesarias.
    </p>
    <p>
      Ante cualquier duda o problema con el sistema, comuníqueselo al Webmaster.
    </p>
  </div>
{/if}

{#if act_created}
  <Modal
    id="act_created"
    title="Actividad creada con éxito"
    ok_text="Ingresar"
    close_text="Cancelar"
    align="center"
    pop_up={act_created}
    close={() => location.replace($page.url.pathname)}
    confirm={() => { act_created = false; pop_create_act = true; }}
  >
    <p>Desea ingresar otra actividad?</p>
  </Modal>
{/if}

{#if act_modified}
  <Modal
    id="act_modified"
    title="Actividad modificada con éxito"
    close_text="Ok"
    align="center"
    pop_up={act_modified}
    close={() => location.replace($page.url.pathname)}
  />
{/if}

{#if pop_create_act}
  <CreateActivities pop_up={pop_create_act} close={() => location.replace($page.url.pathname)} />
{/if}

{#if err}
  <Modal
    id="error"
    title="Error. {err_code ?? "Desconocido"}"
    close_text="Ok"
    align="center"
    pop_up={Boolean(err)}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la acción, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">
      Detalles: {err ?? "No se encuentra en la lista de errores conocidos"}
    </span>
  </Modal>
{/if}
