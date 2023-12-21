<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    const user = session.user;
    const professor = user?.professor;

    if (professor?.coord_chief) {
      const res = await fetch(`/api/prepraii/evals/${professor.id}`);
     
      if (res.ok) {
        const requests = await res.json();
  
        return {
          props: { requests }
        };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar los datos de las solicitudes.\n ${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como Coordinador."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
	import type { PrepraiiRequest } from "$lib/interfaces/prepraii";
  
	import { null_to_empty } from "svelte/internal";

  import { page } from "$app/stores";

	import { base64_to_blob } from "$lib/utils/conversions";

  import Modal from "$lib/components/modals/modal.svelte";
  import KindInfo from "$lib/components/activities/kind_info.svelte";

	import Decision from "$lib/components/forms/prepraii/decision.svelte";

  export let requests: PrepraiiRequest[];

  let prepraii: PrepraiiRequest;
  let decision = false;

  $: decision_made = Boolean($page.url.searchParams.get("decision_made"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
</script>

<h2>Solicitudes</h2>

<div class="ui middle aligned divided list">
  {#if decision}
    <Decision {prepraii} />
  {/if}

  {#each requests as r}    
    <div class="item">
      <div class="right floated content">
        {#if !r.pagada && r.Convocatoria.activo}
          {r.estado == "En_Revision" ? "En Revisión" : r.estado}
          <button type="button" class="ui button" on:click={() => {decision = true; prepraii = r}}>
            Tomar Decisión
          </button>
        {:else}
          {r.estado == "En_Revision" ? "Convocatoria cerrada" : r.estado}
        {/if}
      </div>
      <div class="content">
        Profesor solicitante: {`${r.Profesor.nombre1}, ${r.Profesor.apellido1}`}.
        <div class="ui list">
          <div class="item">
            <i class="comment icon"/>
            <div class="content">
              Observaciones: {r.observaciones_profesor}
            </div>
          </div>
          <div class="item">
            <i class="file pdf icon"/>
            <div class="content">
              Artículo:
              <a href={URL.createObjectURL(base64_to_blob(r.articulo))} target=”_blank”>
                Ver/Descargar
              </a>
            </div>
          </div>
          <div class="item">
            <i class="folder open icon"/>
            <div class="content">
              <div class="">Contratos/Constancias:</div>
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
          <div class="item">
            <i class="newspaper outline icon"/>
            <div class="content">
              Datos del artículo:
              {#if r.Actividad.articulo_revista}
                <KindInfo activity={r.Actividad.articulo_revista} kind="articulo_revista" />
              {/if}
            </div>
          </div>
          {#if r.Actividad.autores_usb.length > 0}
            <div class="item">
              <i class="users icon"/>
              <div class="content">
                <div class="">Autores USB:</div>
                <ul class="ui items">
                  {#each r.Actividad.autores_usb as au}
                    <div class="item"><li>
                      {#if au.es_estudiante}
                        Estudiante: {au.nombre} ({null_to_empty(au.estudiante_carrera)})
                      {:else}
                        Profesor: {au.nombre} {au.es_tutor ? "(Tutor)" : ''}.
                      {/if}
                      {null_to_empty(au.correo)}
                      {au.es_ponente ? "(Ponente)" : ''}
                    </li></div>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
          {#if r.Actividad.autores_externos.length > 0}
            <div class="item">
              <i class="users icon"/>
              <div class="content">
                <div class="">Autores Externos:</div>
                <ul class="ui items">
                  {#each r.Actividad.autores_externos as ae}
                    <div class="item"><li>
                      {#if ae.es_estudiante}
                        Estudiante: {ae.nombre} ({null_to_empty(ae.estudiante_carrera)})
                      {:else}
                        Profesor: {ae.nombre} {ae.es_tutor ? "(Tutor)" : ''}.
                      {/if}
                      {null_to_empty(ae.correo)}
                      {ae.es_ponente ? "(Ponente)" : ''}
                    </li></div>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>

{#if decision_made}
  <Modal
    id="prepraii_decision_made"
    title="PREPRAII"
    close_text="Ok"
    align="center"
    pop_up={decision_made}
    close={() => location.replace($page.url.pathname)}
  >
    <p>Evaluación realizada con éxito!!!</p>
  </Modal>
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
      Hubo un problema al intentar tomar la decisión, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {err}</span>
  </Modal>
{/if}
