<!-- 
	Groups activities
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.professor?.coord_chief || session.user?.dean) {

      const res = await fetch("/api/activities/coordination/4");

      if (res.ok) {
        
        const activities: Activities = parse(await res.text());

        return { props: { activities: activities.activities }  };
      };
  
      const { message: msg, code } = await res.json();
      return {
        error: new Error(`Error al cargar los datos de la Coordinación.\n${code}. ${msg}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como Coordinador de Integración o Decano"),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import type { GroupActivities as GroupActivitiesT } from "$lib/interfaces/activities";
  import type { Activities } from "$lib/interfaces/activities";
  import type { Activity } from "$lib/types/activities";
  
  import { parse } from "zipson";
  
	import { detailed_kinds } from "$lib/constants";
	import { filter_activities } from "$lib/utils/filters";
  import { paginate } from "$lib/utils/grouping";
  
  import Pagination from "$lib/components/pagination.svelte";
  import GroupActivities from "$lib/components/activities/group_activities.svelte";

  export let activities: Activity[];


  let pagination_size = 100;
  let current_page = 1;
  let start_pagination = 0;
  let end_pagination = pagination_size;
  let filtered_activities = activities;
  let paginated_activities = paginate(activities, pagination_size) as GroupActivitiesT[][];
  let page_activities = paginated_activities[current_page-1];

  let kind = '';
  let start_date = '';
  let end_date = '';
  let show_filters = false;

  const show_prev = function () {

    current_page -= 1;
    start_pagination = (current_page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size, true, "groups") as GroupActivitiesT[][];
    page_activities = paginated_activities[current_page-1];
  };

  const show_page = function (page: number) {

    current_page = page;
    start_pagination = (page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size, true, "groups") as GroupActivitiesT[][];
    page_activities = paginated_activities[current_page-1];
  };

  const show_next = function () {

    current_page += 1;
    start_pagination = (current_page - 1) * pagination_size;
    end_pagination = start_pagination + pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size, true, "groups") as GroupActivitiesT[][];
    page_activities = paginated_activities[current_page-1];
  };

  const resize_pagination = function (size: number) {
    
    pagination_size = size;
    start_pagination = 0;
    end_pagination = pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size, true, "groups") as GroupActivitiesT[][];
    page_activities = paginated_activities[current_page-1];
  };

  const filter = function() {

    current_page = 1;
    start_pagination = 0;
    end_pagination = pagination_size;

    filtered_activities = filter_activities(activities, kind, start_date, end_date);
    paginated_activities = paginate(filtered_activities, pagination_size, true, "groups") as GroupActivitiesT[][];
    page_activities = paginated_activities[current_page-1];
  };
  $: console.log(paginated_activities)
</script>

<h3>Actividades de los Grupos de Investigación</h3>

<div class="uk-clearfix">
  <button
    type="button"
    class="ui right floated primary mini button"
    on:click={() => show_filters = !show_filters}
  >
    <i class="filter icon"/>Filtro
  </button>
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
    {#each page_activities as group_activities}
      <GroupActivities {group_activities} />
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
