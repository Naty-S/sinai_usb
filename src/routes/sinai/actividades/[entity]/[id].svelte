<!-- 
  Display activities by year for dean, professor or group
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const { entity, id } = params;
    const user = session.user;
    const professor = user?.professor;
    const prof_group = professor?.groups.historico_grupos.map(g => g.Grupo.id).includes(Number(id));

    // si es decano que ve otros prof no mostrar las del decano
    if (professor?.id === Number(id) || prof_group || user?.dean ||
      professor?.is_dep_chief || professor?.is_dep_representative ||
      professor?.coord_chief || professor?.division_chief
    ) {

      const _entity = entity === "grupo" ? "group" : (entity === "decano" ? "dean" : "professor")
      const api = user?.dean && _entity === "dean" ? `/api/activities/dean/${user?.email}`
                                                  : `/api/activities/${_entity}/${id}`;
      const res = await fetch(api);
     
      if (res.ok) {
        const activities = await res.json();
  
        return {
          props: {activities}
        };
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
  import { page, session } from "$app/stores";

  import type { EntityActivities } from "$lib/interfaces/activities";

  import { format_date } from "$lib/utils/formatting";
  
	import Modal from '$lib/components/modal.svelte';
  import ActivitiesModal from "$lib/components/navbar/activities_modal.svelte";
  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import ResumeTable from "$lib/components/activities/resume_table.svelte";

  export let activities: EntityActivities;

  const headers = ["Actividad"].concat(activities.by_year.map(a => a.year.toString()));
  const kinds = [
    "ACTIVIDAD INVALIDA"
    , "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"
    , "Publicaciones en Revistas Indexadas en Otros Indices"
    , "Publicaciones en Revistas Arbitradas No Indexadas"
    , "Articulos Aceptados en Vías de Publicación"
    , "Publicaciones en Revistas Arbitradas"
    , "Publicaciones de Capítulos de Libros"
    , "Composiciones Solicitadas por Orquestas Sinfónicas o Agrupaciones Reconocidas"
    , "Asistencia a Eventos Internacionales"
    , "Asistencia a Eventos Nacionales"
    , "Eventos en Venezuela"
    , "Eventos en el Exterior"
    , "Eventos"
    , "Selección en Exposiciones, Bienales, Salones o Concursos Arbitrados"
    , "Grabaciones Sonoras Evaluadas Por Árbitros"
    , "Informes Técnicos"
    , "Libro Nacional"
    , "Libro Internacional"
    , "Publicaciones de Libros"
    , "Memorias *Arbitradas* de Congresos"
    , "Partituras, Video o CD's Publicados en Editoriales Reconocidas"
    , "Patentes Nacional"
    , "Patentes Internacional"
    , "Patentes"
    , "Premios"
    , "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones"
    , "Tutoría de Tesis Doctorales"
    , "Tutoría de Trabajos de Grado (Mestrías)"
    , "Tutoría de Proyectos de Grado (Especializaciones)"
    , "Proyectos de Grado (Postgrados)"
    , "Tutoría de Proyectos de Grado (Licencituras)"
    , "Tutoría de Proyectos de Grado (Ingenierías)"
    , "Proyectos de Grado (Pasantías Largas)"
    , "Proyectos de Grado Dirigidos"
    , "Proyectos de IYD (Vigentes)"
    , "Proyectos de IYD"
    , "Recitales o Conciertos Arbitrados"
  ];

  $: act_created = Boolean($page.url.searchParams.get("creada"));
  $: act_modified = Boolean($page.url.searchParams.get("modificada"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
  $: editable = $page.params.entity !== "grupo" || $session.user?.dean !== undefined;

  let show_create = false;
  let show_filters = false;
  let start_date: string;
  let end_date: string;
  let filtered_acts = activities.by_year;

  const filter_by_date = function() {

    filtered_acts = activities.by_year.map(y_acts => {
    
      const kind_activities = Object.entries(y_acts.kind_activities).reduce((a, [kind, acts]) => ({
        ...a,
        [kind]: acts.filter(a => 
          start_date <= format_date(a.fecha_creacion, "yyyy-MM-dd") && 
          format_date(a.fecha_creacion, "yyyy-MM-dd") <= end_date
        )
      }), {});

      return {
        year: y_acts.year,
        kind_activities
      };
    });
  };

  const can_filter = function() {
    const user = $session.user;
    const professor = user?.professor;

    return user?.dean || professor?.is_dep_chief || professor?.is_dep_representative ||
      professor?.coord_chief || professor?.division_chief;
  };
</script>

<h3>Resumen de Actividades del {activities.entity}</h3>

<!-- Display activities resume table -->
<ResumeTable
  {headers}
  resume_kinds_counts={activities.years_counts}
  links
  row_total
  col_total
/>

{#if can_filter()}  
  <div class="uk-clearfix">
    <button
      type="button"
      class="ui right floated primary mini button"
      on:click={() => show_filters = !show_filters}
    >
      <i class="filter icon"/>Filtro
    </button>
  </div>
{/if}

<!-- Display activities by year -->
<div uk-filter="target: .js-filter; animation: delayed-fade;">
  
  <!-- Filters -->
  {#if show_filters}    
    <div class="ui segments">
      <div class="ui vertically fitted segment"><strong>Filtrar Actividades:</strong></div>
      <div class="ui horizontal stackable segments">
        <div class="ui segment">
          <label for="start_date">Fecha Inicio</label>
          <input type="date" name="start_date" bind:value={start_date}>
        </div>
        <div class="ui segment">
          <label for="end_date">Fecha Final</label>
          <input type="date" name="end_date" bind:value={end_date}>
        </div>
        <div class="ui segment">        
          <button type="button" class="ui green mini button" on:click={filter_by_date}>
            Filtrar
          </button>
        </div>
      </div>
      <ul class="ui segment uk-subnav uk-subnav-pill">
        <li class="uk-active" uk-filter-control><a href="#">Todas</a></li>
        <li class="uk-width-2-3">
          <a href="#">Tipos de Actividad <span uk-icon="icon: triangle-down"></span></a>
          <div uk-dropdown="mode: click, hover; delay-hide:1; offset: 2;">
            <div class="uk-panel uk-panel-scrollable">
              
              <ul class="uk-nav uk-dropdown-nav">
                {#each kinds as k}
                  <li uk-filter-control="[data-kind='{k}']"><a href="#">
                    {k}
                  </a></li>
                {/each}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  {/if}
  
  <!-- Activities by year -->
  {#key filtered_acts}    
    {#each filtered_acts as year_activities}
      <YearActivities {year_activities} {editable}/>
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
    is_active={act_created}
    close={() => location.replace($page.url.pathname)}
    confirm={() => { act_created = false; show_create = true; }}
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
    is_active={act_modified}
    close={() => location.replace($page.url.pathname)}
  />
{/if}

{#if show_create}
  <ActivitiesModal show={show_create} close={() => location.replace($page.url.pathname)} />
{/if}

{#if err}
  <Modal
    id="error"
    title="Error. {err_code}"
    close_text="Ok"
    align="center"
    is_active={Boolean(err)}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la acción por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {err}</span>
  </Modal>
{/if}
