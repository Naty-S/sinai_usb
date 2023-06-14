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
  
      const { message } = await res.json();
      return {
        error: new Error(`Error al cargar actividades del ${entity}.\n` + message),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión"),
        status: 401
      };
    }
  };
</script>
<script lang="ts">
  import { page, session } from "$app/stores";

  import type { EntityActivities } from "$lib/interfaces/activities";

	import Modal from '$lib/components/modal.svelte';
  import ActivitiesModal from "$lib/components/navbar/activities_modal.svelte";
  import YearActivities from "$lib/components/activities/year_activities.svelte";
  import ResumeTable from "$lib/components/activities/resume_table.svelte";

  export let activities: EntityActivities;

  const headers = ["Actividad"].concat(activities.by_year.map(a => a.year.toString()));

  $: act_created = Boolean($page.url.searchParams.get("creada"));
  $: act_modified = Boolean($page.url.searchParams.get("modificada"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
  $: editable = $page.params.entity !== "grupo" || $session.user?.dean !== undefined;

  let show_create = false;
</script>

<h3>Resumen de Actividades del {activities.entity}</h3>

<!-- Display activities resume table -->
<ResumeTable
  {headers}
  resume_kinds_counts={activities.years_counts}
  row_total
  col_total
/>

<!-- Display activities by year -->
{#each activities.by_year as year_activities}
  <YearActivities {year_activities} {editable}/>
{/each}

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
    close={() => act_created = false}
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
    close={() => { act_modified = false; location.replace($page.url.pathname); }}
  />
{/if}

{#if show_create}
  <ActivitiesModal show={show_create} close={() => show_create = false} />
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
