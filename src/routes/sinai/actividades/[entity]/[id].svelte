<!-- 
  @component
  Display activities by year for profesor or group
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {

    const entity = params.entity === "grupo" ? "group" : "professor"
    const res = await fetch(`/api/activities/${entity}/${params.id}`);
   
    if (res.ok) {
      const activities = await res.json();

      return {
        props: {activities}
      };
    };

    const { message } = await res.json();
    return {
      error: new Error(message)
    };
  };
</script>
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import type { EntityActivities } from "$interfaces/activities";

	import Modal from '$components/modal.svelte';
  import ActivitiesModal from "$components/nav_menu/activities_modal.svelte";
  import YearsList from "$components/activities/years_list.svelte";
  import ResumeTable from "$components/activities/resume_table.svelte";

  export let activities: EntityActivities;

  const headers = ["Actividad"].concat(activities.by_year.map(a => a.year.toString()));

  $: act_created = Boolean($page.url.searchParams.get("act_created"));
  $: act_modified = Boolean($page.url.searchParams.get("act_modified"));

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
{#each activities.by_year.reverse() as activities}
  <YearsList {activities} editable/>
{/each}

{#if $page.params.entity === "profesor"} 
<!-- TODO: footer? -->
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
    title="Actividad creada con exito"
    ok_text="Ingresar"
    close_text="Cancelar"
    align="center"
    is_active={act_created}
    close={() => act_created = false}
    confirm={() => { act_created = false; location.replace($page.url.pathname); show_create = true; }}
  >
    <p>Desea ingresar otra actividad?</p>
  </Modal>
{/if}

{#if act_modified}
  <Modal
    id="act_modified"
    title="Actividad modificada con exito"
    close_text="Ok"
    align="center"
    is_active={act_modified}
    close={() => { act_modified = false; location.replace($page.url.pathname); }}
  />
{/if}
{#if show_create}
  <ActivitiesModal show={show_create} close={() => show_create = false} />
{/if}
