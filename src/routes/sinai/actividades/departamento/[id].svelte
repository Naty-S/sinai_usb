<!-- 
  Departament activities resume page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    const _id = params.id;
    const user = session.user;
    const professor = user?.professor;

    if (user?.dean || professor?.coord_chief ||
        professor?.is_dep_chief || professor?.is_dep_representative
    ) {
      const current_year = (new Date()).getFullYear();
      const res1 = await api.post(`/api/activities/department/${_id}`, {
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
      const res2 = await fetch("/api/professors");
     
      if (res1.ok && res2.ok) {
        
        const activities: Activities = await res1.json();
        const profesores: Profesor[] = await res2.json();

        return {
          props: { activities, profesores }
        };
      };
  
      const { message, code } = await res1.json();
      return {
        error: new Error(`Error al cargar las actividades del departamento.\n${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. \
          Inicie sesión como jefe o representante de Departamento, Coordinador o Decano."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import { page } from "$app/stores";

  import type { Activities } from "$lib/interfaces/activities";
	import type { Profesor } from "$lib/interfaces/professors";

  import * as api from "$lib/api";

	import { department_rank_activities } from "$lib/utils/formatting";

  import Modal from "$lib/components/modals/modal.svelte";
	import PaginationTable from "$lib/components/pagination_table.svelte";
  import ResumeEntity from "$lib/components/activities/resume_entity.svelte";
  import ResumeRank from "$lib/components/activities/resume_rank.svelte";
  
  export let activities: Activities;
  export let profesores: Profesor[];

  const years = 10;
  const current_year = (new Date()).getFullYear();
  const date_start = new Date(`01-01-${current_year-years}`);
  const date_end = new Date(`01-01-${current_year}`);

  let professors_activities = department_rank_activities(activities, profesores, $page.params.id);
  let action = { info: '', code: '' };


  const show_prev = async function () {

    date_start.setFullYear(date_start.getFullYear() - years);
    date_end.setFullYear(date_end.getFullYear() - years);
    
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
    const res = await api.post(`/api/activities/departamento/${$page.params.id}`, filters);

    if (res.ok) {
      const activitys = await res.json();

      activities = activitys;
      professors_activities = department_rank_activities(activitys, profesores, $page.params.id);
      
    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const show_next = async function () {

    date_start.setFullYear(date_start.getFullYear() + years);
    date_end.setFullYear(date_end.getFullYear() + years);
    
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
    const res = await api.post(`/api/activities/departamento/${$page.params.id}`, filters);

    if (res.ok) {
      const activitys = await res.json();

      professors_activities = department_rank_activities(activitys, profesores, $page.params.id);

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };
</script>

<PaginationTable
  size={current_year}
  start={date_start.getFullYear()}
  end={date_end.getFullYear()}
  {show_prev} {show_next}
/>
{#key activities}
  <ResumeRank rank="departamento" rank_activities={activities} />
{/key}
<PaginationTable
  size={current_year}
  start={date_start.getFullYear()}
  end={date_end.getFullYear()}
  {show_prev} {show_next}
/>

<div class="uk-text-center">
  <a href="/sinai/BRA/departamento/{$page.params.id}" class="ui button disabled">
    Vista BRA Departamental
  </a>
</div>

{#key professors_activities}  
  <div class="uk-text-center">
    Número total de profesores de su departamento resgistrados en el sistema:
    ({professors_activities.length})
  </div>

  <div class="uk-text-center">
    Nota: La suma de las actividades de los profesores no es igual al total del departamento,
    pues pueden tener varios autores del mismo departamento.
  </div>

  <div class="ui divider" />

  <PaginationTable
    size={current_year}
    start={date_start.getFullYear()}
    end={date_end.getFullYear()}
    {show_prev} {show_next}
  />
  <ResumeEntity entity="profesor" entity_activities={professors_activities} />
  <PaginationTable
    size={current_year}
    start={date_start.getFullYear()}
    end={date_end.getFullYear()}
    {show_prev} {show_next}
  />
{/key}

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
