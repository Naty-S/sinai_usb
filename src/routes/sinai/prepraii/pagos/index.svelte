<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean) {
      const res = await fetch("/api/prepraii/evals");
     
      if (res.ok) {
        const requests = await res.json();
  
        return { props: { requests } };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar los datos de las solicitudes.\n ${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Uso exclusivo del Decano."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import type { ProfessorE } from "$lib/interfaces/professors";
	import type { PrepraiiRequest } from "$lib/interfaces/prepraii";
  
	import { onMount } from "svelte";

  import * as api from "$lib/api";

	import { base64_to_blob } from "$lib/utils/conversions";

	import Modal from '$lib/components/modals/modal.svelte';
  
  import Pay from "$lib/components/forms/prepraii/pay.svelte";
  import Reasign from "$lib/components/forms/prepraii/reasign.svelte";

  export let requests: PrepraiiRequest[];

  let reasign = false;
  let pay = false;
  let prepraii: PrepraiiRequest;
  let chiefs: ProfessorE[];
  let action = { info: '', code: '' };

  const pay_request = function (r: PrepraiiRequest) {
    pay = true;
    reasign = false;
    prepraii = r;
  };

  const reasign_coord = function (r: PrepraiiRequest) {
    reasign = true;
    pay = false;
    prepraii = r;
  };

  onMount( async () => {
    const res1 = await api.get("/api/coordinators");

    if (res1.ok) { chiefs = await res1.json();
    } else {
      const { message, code } = await res1.json();
      action.info = message;
      action.code = code;
    };
  });
</script>

<h2>Solicitudes aprobadas pendientes por pagar</h2>

<div class="ui middle aligned divided list">
  {#if pay}
    <Pay {prepraii}  show_pay={pay} />
  {/if}
  {#if reasign}
    <Reasign {prepraii} {chiefs} show_reasign={reasign}/>
  {/if}

  {#each requests as r}    
    <div class="item">
      <div class="right floated content">
        {#if r.estado == "Aprobado" && !r.pagada}
          <button type="button" class="ui button" on:click={() => pay_request(r)}>
            Pagar
          </button>
          <button type="button" class="ui button" on:click={() => reasign_coord(r)}>
            Reasignar Coordinador
          </button>
        {:else}
          {r.estado}
        {/if}
      </div>
      <div class="content">
        Profesor solicitante: {`${r.Profesor.nombre1}, ${r.Profesor.apellido1}`}.
        <div class="ui list">
          <div class="item">
            <i class="comment icon"/>
            <div class="content">
              Titulo del artículo: {r.Actividad.titulo}
            </div>
          </div>
          <div class="item">
            <i class="money bill wave icon"/>
            <div class="content">
              Monto: {r.monto} Bs.
            </div>
          </div>
          <div class="item">
            <i class="users icon"/>
            <div class="content">
              <div class="">Coautores:</div>
              <ul class="ui items">
                {#each r.prepraii_profesores as p}
                  <div class="item"><li>
                    {p.Profesor.nombre1}, {p.Profesor.apellido1}:
                    <a href={URL.createObjectURL(base64_to_blob(p.contrato_constancia))} target=”_blank”>
                      Ver/Descargar
                    </a>
                  </li></div>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={() => { action.info = ''; location.reload(); }}
  >
    <p>
      Hubo un error al intentar cargar los Coordinadores,
      por favor vuelva a intentar o contáctese con algún administrador proporcionando
      el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
