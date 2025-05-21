<!-- 
	Coordination activities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const _id = params.id;

    if (session.user?.professor?.coord_chief || session.user?.dean) {

      const current_year = (new Date()).getFullYear();
      const res1 = await fetch(`/api/activities/coordination/${_id}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          date_start: new Date(`01-01-${current_year-10}`),
          date_end: new Date(`01-01-${current_year}`),
          articulo_revista: true,
          capitulo_libro: true,
          composicion: true,
          evento: true,
          exposicion: true,
          grabacion: true,
          informe_tecnico: true,
          libro: true,
          memoria: true,
          partitura: true,
          patente: true,
          premio: true,
          premio_bienal: true,
          tesis_grado: true,
          proyecto_investigacion: true,
          recital: true
        })
      });
      const res2 = await fetch("/api/coordinations");
      let res3;

      if (Number(_id) === 4) {
        res3 = await fetch("/api/groups");
      } else {
        res3 = await fetch("/api/professors");
      };

      if (res1.ok && res2.ok && res3.ok) {
        
        const activities: Activities = parse(await res1.text());
        const coords: Coordination[] = await res2.json();

        let profesores: Profesor[];
        let grupos: GroupE[];
        let ranks: Department[] | GroupE[];

        if (Number(_id) === 4) {
          grupos = await res3.json();
          ranks = grupos;
        } else {
          profesores = await res3.json();
          ranks = coords.find(c => c.id === Number(_id))?.departamentos || [];
        };

        return {
          props: {activities, ranks, profesores}
        };
      };
  
      const { message: msg1, code: code1 } = await res1.json();
      const { message: msg2, code: code2 } = await res2.json();
      const { message: msg3, code: code3 } = await res3.json();
      return {
        error: new Error(`Error al cargar los datos de la Coordinación.\n${code1}. ${msg1}\n\
          ${code2}. ${msg2}\n${code3}. ${msg3}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como Coordinador o Decano"),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import { page } from "$app/stores";

	import type { Activity } from "$lib/types/activities";
  import type { Activities } from "$lib/interfaces/activities";
	import type { Coordination } from "$lib/interfaces/coordinations";
	import type { Department } from "$lib/interfaces/departments";
	import type { GroupE } from "$lib/interfaces/groups";
	import type { Profesor } from "$lib/interfaces/professors";

  import { parse } from "zipson";
  
  import * as api from "$lib/api";

	import { coordination_rank_activities } from "$lib/utils/formatting";

	import Loader from "$lib/components/loader.svelte";
  import Modal from "$lib/components/modals/modal.svelte";
	import PaginationTable from "$lib/components/pagination_table.svelte";
  import ResumeRank from "$lib/components/activities/resume_rank.svelte";

  export let activities: Activities;
  export let ranks: Department[] | GroupE[];
  export let profesores: Profesor[];

  const years = 10;
  const current_year = (new Date()).getFullYear();
  const date_start = new Date(`01-01-${current_year-years}`);
  const date_end = new Date(`01-01-${current_year}`);
  const rank = activities.owner.id === 4 ? "grupo" : "departamento";

  let searching = false;
  let coordination_activities = coordination_rank_activities(activities, ranks, profesores, $page.params.id);
  let action = { info: '', code: '' };

  const show_prev = async function () {

    date_start.setFullYear(date_start.getFullYear() - years);
    date_end.setFullYear(date_end.getFullYear() - years);
    
    searching = true;
    const filters = {
      date_start,
      date_end,
      articulo_revista: true,
      capitulo_libro: true,
      composicion: true,
      evento: true,
      exposicion: true,
      grabacion: true,
      informe_tecnico: true,
      libro: true,
      memoria: true,
      partitura: true,
      patente: true,
      premio: true,
      premio_bienal: true,
      tesis_grado: true,
      proyecto_investigacion: true,
      recital: true
    };
    const res = await api.post(`/api/activities/coordination/${$page.params.id}`, filters);
    
    if (res.ok) {
      const activitys = parse(await res.text());
      
      activities = activitys;
      coordination_activities = coordination_rank_activities(activities, ranks, profesores, $page.params.id);
      searching = false;
      
    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const show_next = async function () {

    date_start.setFullYear(date_start.getFullYear() + years);
    date_end.setFullYear(date_end.getFullYear() + years);
    
    searching = true;
    const filters = {
      date_start,
      date_end,
      articulo_revista: true,
      capitulo_libro: true,
      composicion: true,
      evento: true,
      exposicion: true,
      grabacion: true,
      informe_tecnico: true,
      libro: true,
      memoria: true,
      partitura: true,
      patente: true,
      premio: true,
      premio_bienal: true,
      tesis_grado: true,
      proyecto_investigacion: true,
      recital: true
    };
    const res = await api.post(`/api/activities/coordination/${$page.params.id}`, filters);
    searching = false;

    if (res.ok) {
      const activitys = parse(await res.text());

      activities = activitys;
      coordination_activities = coordination_rank_activities(activities, ranks, profesores, $page.params.id);
      
    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };
</script>

{#if searching}
  <Loader />
{:else}
  {#key date_start}  
    <PaginationTable
      size={current_year}
      start={date_start.getFullYear()}
      end={date_end.getFullYear()}
      {show_prev} {show_next}
    />
  {/key}
  {#key activities}
    <ResumeRank rank="coordinacion" rank_activities={activities} />
  {/key}
  {#key date_start}  
    <PaginationTable
      size={current_year}
      start={date_start.getFullYear()}
      end={date_end.getFullYear()}
      {show_prev} {show_next}
    />
  {/key}

  {#key coordination_activities}
    {#each coordination_activities as rank_activities}
      <ResumeRank {rank} {rank_activities} />
      {#if rank_activities.activities.length > 0}
        {#key date_start}  
          <PaginationTable
            size={current_year}
            start={date_start.getFullYear()}
            end={date_end.getFullYear()}
            {show_prev} {show_next}
          />
        {/key}
      {/if}
    {/each}
  {/key}
{/if}

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code ?? "Desconocido"}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={() => location.reload()}
  >
    <p>
      Hubo un problema al intentar realizar la acción, por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info ?? "No se encuentra en la lista de errores conocidos"}</span>
  </Modal>
{/if}
