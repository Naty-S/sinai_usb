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
	import type { PrepraiiRequest } from "$lib/interfaces/prepraii";
  
	import { base64_to_blob } from "$lib/utils/conversions";

  import Pay from "$lib/components/forms/prepraii/pay.svelte";

  export let requests: PrepraiiRequest[];

  let pay = false;
  let prepraii: PrepraiiRequest;
</script>

<h2>Pagos PREPRAII</h2>
<h3>Solicitudes aprobadas pendientes por pagar</h3>

{#if pay}
  <Pay {prepraii} show_pay={pay} />
{/if}

<div id="s1_novel_requests" class="ui fluid styled accordion" uk-accordion="animation: false;">
  {#each requests as r}    
    <section id="prepraii_request_{r.id}">
      <div class="uk-accordion-title title">
        <div class="ui three column grid">
          <div class="column">
            Profesor solicitante: {`${r.Profesor.nombre1}, ${r.Profesor.apellido1}`}.
          </div>
          <div class="center aligned column">
            Profesor evaluador: {`${r.Evaluador.nombre1}, ${r.Evaluador.apellido1}`}.
          </div>
          <div class="right aligned column">
            {#if r.estado == "Aprobado" && !r.pagada}
              <button type="button" class="ui button" on:click={() => {pay = true; prepraii = r;}}>
                Pagar
              </button>
            {:else}
              {r.estado}
            {/if}
          </div>
        </div>
      </div>

      <div class="uk-accordion-content">
        <div class="content">
          <div class="ui list">
            <div class="item">
              <div class="content">
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
                </div>
              </div>
            </div>
            <div class="item">
              <i class="users icon"/>
              <div class="content">
                <div class="medium header">Contratos y Constancias de los Autores:</div>
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
    </section>
  {/each}
</div>
