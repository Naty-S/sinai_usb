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
    if (professor?.id === _id || in_group || user?.dean ||
      professor?.is_dep_chief || professor?.is_dep_representative ||
      professor?.coord_chief || professor?.division_chief
    ) {

      const _entity = entity === "grupo" ? "group" : (entity === "decano" ? "dean" : "professor")
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
        error: new Error("Acceso denegado. Inicie sesión con el usuario adecuado."),
        status: 401
      };
    }
  };
</script>
<script lang="ts">
import type { YearActivities as YearActivitiesT } from "$lib/interfaces/activities";
  import type { Activities } from "$lib/interfaces/activities";
  import type { Activity } from "$lib/types/activities";
  
  import { page, session } from "$app/stores";

	import { detailed_kinds } from "$lib/constants";
	import { filter_activities } from "$lib/utils/filters";
  import { acts_kinds_by_year } from "$lib/utils/grouping";
  import { count_acts_kinds_by_year } from "$lib/utils/maths";
  
	import Modal from '$lib/components/modals/modal.svelte';
  import Pagination from "$lib/components/pagination.svelte";
  import CreateActivities from "$lib/components/modals/create_activities.svelte";
  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import ResumeTable from "$lib/components/activities/resume_table.svelte";

  export let owner: string;
  export let activities: Activity[];

  const activities_by_year = acts_kinds_by_year(activities);
  const activities_years_counts = count_acts_kinds_by_year(activities);
  const headers = ["Actividad"].concat(activities_by_year.map(a => a.year.toString()));

  let page_activities = acts_kinds_by_year(activities.slice(0, activities.length));;
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

  const filter = function() {
    page_activities = filter_activities(
      activities, kind, start_date, end_date, 0, activities.length) as YearActivitiesT[];
  };

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
  links
  row_total
  col_total
/>

<div class="uk-clearfix">
  {#if can_filter()}  
    <button
      type="button"
      class="ui right floated primary mini button"
      on:click={() => show_filters = !show_filters}
    >
      <i class="filter icon"/>Filtro
    </button>
  {/if}
  <button
    type="button"
    class="ui right floated primary mini button"
    on:click={() => show_buttons = !show_buttons}
  >
    <i class="pen icon"/>Modificar
  </button>
</div>

<!-- Display activities by year -->
<div>
  <!-- Filters -->
  {#if show_filters}    
    <div id="filters" class="ui segments">
      <div class="ui vertically fitted segment"><strong>Filtrar Actividades:</strong></div>

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
  {/if}
  
  <!-- Activities by year -->
  {#key page_activities}    
    {#each page_activities as year_activities}
      <YearActivities {year_activities} {editable} {show_buttons}/>
    {/each}
  {/key}
</div>

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
    title="Error. {err_code}"
    close_text="Ok"
    align="center"
    pop_up={Boolean(err)}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la acción, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {err}</span>
  </Modal>
{/if}
