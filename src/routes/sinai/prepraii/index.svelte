<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean) {
      const res = await fetch("/api/prepraii");
     
      if (res.ok) {
        const prepraii = await res.json();
  
        return {
          props: { prepraii }
        };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar los datos de las convocatorias.\n ${code}. ${message}`),
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
	import type { Prepraii } from "$lib/interfaces/prepraii";
	
	import { onMount } from "svelte";

  import * as api from "$lib/api";

	import { format_date } from "$lib/utils/formatting";

  import Notifications from "$lib/components/notifications.svelte";
	import Modal from '$lib/components/modals/modal.svelte';
  
  import Reasign from "$lib/components/forms/prepraii/reasign.svelte";

  export let prepraii: Prepraii[];

  const actual = prepraii.find(p => p.activo);

  let reasign = false;
  let prepraiiR: PrepraiiRequest;

  let chiefs: ProfessorE[];
  let action = { info: '', code: '' };

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

<h2>Histórico PREPRAII</h2>

<h3>Convocatoria Actual</h3>

{#if reasign}
  <Reasign prepraii={prepraiiR} {chiefs} show_reasign={reasign}/>
{/if}

{#if actual}
  <div class="ui middle aligned divided list">
    <h4>
      Solicitudes: {format_date(actual.inicio)} - {format_date(actual.fin)}
    </h4>
    {#each actual.solicitudes as s}          
      <div class="item">
        <div class="content">
          <div class="ui list">
            {#if s.Evaluador.correo == s.Profesor.correo}                  
              <div class="item">
                <div class="content">
                  <button type="button" class="ui small button"
                    on:click={() => {reasign = true; prepraiiR = s;}}
                  >
                    Reasignar Coordinador
                  </button>
                </div>
              </div>
            {/if}
            <div class="item">
              <i class="user icon"/>
              <div class="content">
                Profesor solicitante: {`${s.Profesor.nombre1}, ${s.Profesor.apellido1}`}.
              </div>
            </div>
            <div class="item">
              <i class="user tie icon"/>
              <div class="content">
                Evaluador: {`${s.Evaluador.nombre1}, ${s.Evaluador.apellido1}`}.
              </div>
            </div>
            <div class="item">
              <i class="thumbtack icon"/>
              <div class="content">
                Titulo del artículo: {s.Actividad.titulo}
              </div>
            </div>
            <div class="item">
              <i class="info circle icon"/>
              <div class="content">
                {s.estado == "En_Revision" ? "En Revisión" : s.estado}
              </div>
            </div>
            <div class="item">
              <i class="money bill wave icon"/>
              <div class="content">
                Monto: {s.monto ? s.monto + " Bs." : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <Notifications header_msg="No hay una convocatoria activa actualmente" />
{/if}

<h3>Convocatorias Anteriores</h3>

<div class="ui middle aligned divided list">
  {#each prepraii.filter(p => !p.activo) as p}
    <h4>
      Solicitudes: {format_date(p.inicio)} - {format_date(p.fin)}
    </h4>
    {#each p.solicitudes as s}          
      <div class="item">
        <div class="content">
          <div class="ui list">
            <div class="item">
              <i class="user icon"/>
              <div class="content">
                Profesor solicitante: {`${s.Profesor.nombre1}, ${s.Profesor.apellido1}`}.
              </div>
            </div>
            <div class="item">
              <i class="user tie icon"/>
              <div class="content">
                Evaluador: {`${s.Evaluador.nombre1}, ${s.Evaluador.apellido1}`}.
              </div>
            </div>
            <div class="item">
              <i class="thumbtack icon"/>
              <div class="content">
                Titulo del artículo: {s.Actividad.titulo}
              </div>
            </div>
            <div class="item">
              <i class="info circle icon"/>
              <div class="content">
                {s.estado == "En_Revision" ? "En Revisión" : s.estado}
              </div>
            </div>
            <div class="item">
              <i class="money bill wave icon"/>
              <div class="content">
                Monto: {s.monto ? s.monto + " Bs." : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}

    <div class="ui divider" />
  {/each}
</div>

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code ?? "Desconocido"}"
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
    <span class="ui red text">Detalles: {action.info ?? "No se encuentra en la lista de errores conocidos"}</span>
  </Modal>
{/if}
