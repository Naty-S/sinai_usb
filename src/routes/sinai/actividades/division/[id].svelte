<!-- 
	Division actities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const _id = params.id;

    if (session.user?.professor?.division_chief || session.user?.dean) {

      const current_year = (new Date()).getFullYear();
      const res1 = await api.post(`/api/activities/division/${_id}`, {
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
        proyecto_grado: true,
        proyecto_investigacion: true,
        recital: true
      });
      const res2 = await fetch("/api/divisions");
      const res3 = await fetch("/api/professors");

      if (res1.ok && res2.ok && res3.ok) {
        
        const activities: Activities = parse(await res1.text());
        const divisions: Division[] = await res2.json();
        const profesores: Profesor[] = await res3.json();

        return {
          props: {activities, divisions, profesores}
        };
      };
  
      const { message: msg1, code: code1 } = await res1.json();
      const { message: msg2, code: code2 } = await res2.json();
      const { message: msg3, code: code3 } = await res2.json();
      return {
        error: new Error(`Error al cargar los datos de la División.\n${code1}. ${msg1}\n\
          ${code2}. ${msg2}\n${code3}. ${msg3}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como jefe de División o Decano."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import { page } from "$app/stores";

  import type { Activities } from "$lib/interfaces/activities";
	import type { Division } from "$lib/interfaces/divisions";
	import type { Profesor } from "$lib/interfaces/professors";
  
  import { parse } from "zipson";

  import * as api from "$lib/api";

	import { division_rank_activities } from "$lib/utils/formatting";

	import Loader from "$lib/components/loader.svelte";
  import Modal from "$lib/components/modals/modal.svelte";
	import PaginationTable from "$lib/components/pagination_table.svelte";
  import ResumeRank from "$lib/components/activities/resume_rank.svelte";

  export let activities: Activities;
  export let divisions: Division[];
  export let profesores: Profesor[];

  const years = 10;
  const current_year = (new Date()).getFullYear();
  const date_start = new Date(`01-01-${current_year-years}`);
  const date_end = new Date(`01-01-${current_year}`);

  let searching = false;
  let deparments_activities = division_rank_activities(activities, divisions, profesores, $page.params.id);
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
      proyecto_grado: true,
      proyecto_investigacion: true,
      recital: true
    };
    const res = await api.post(`/api/activities/division/${$page.params.id}`, filters);
    searching = false;

    if (res.ok) {
      const activitys = parse(await res.text());

      activities = activitys;
      deparments_activities = division_rank_activities(activities, divisions, profesores, $page.params.id);
      
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
      proyecto_grado: true,
      proyecto_investigacion: true,
      recital: true
    };
    const res = await api.post(`/api/activities/division/${$page.params.id}`, filters);
    searching = false;

    if (res.ok) {
      const activitys = parse(await res.text());

      activities = activitys;
      deparments_activities = division_rank_activities(activities, divisions, profesores, $page.params.id);
      
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
    <ResumeRank rank="division" rank_activities={activities} />
  {/key}
  {#key date_start}
    <PaginationTable
      size={current_year}
      start={date_start.getFullYear()}
      end={date_end.getFullYear()}
      {show_prev} {show_next}
    />
  {/key}

  {#key deparments_activities}
    {#each deparments_activities as rank_activities}
      <ResumeRank rank="departamento" {rank_activities} />
      {#key date_start}
        <PaginationTable
          size={current_year}
          start={date_start.getFullYear()}
          end={date_end.getFullYear()}
          {show_prev} {show_next}
        />
      {/key}
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
