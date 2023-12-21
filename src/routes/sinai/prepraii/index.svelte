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
	import type { Prepraii } from "$lib/interfaces/prepraii";
	
	import { format_date } from "$lib/utils/formatting";

  import Notifications from "$lib/components/notifications.svelte";

  export let prepraii: Prepraii[];

  const actual = prepraii.find(p => p.activo);
</script>

<h2>Convocatoria PREPRAII Actual</h2>

{#if actual}
  <div class="ui middle aligned divided list">
    <div class="item">
      <div class="right floated content">
        Convocatoria: {format_date(actual.inicio)} - {format_date(actual.fin)}
      </div>
      <div class="content">
        Solicitudes:
        {#each actual.solicitudes as s}          
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
        {/each}
      </div>
    </div>
  </div>
{:else}
  <Notifications header_msg="No hay una convocatoria activa actualmente" />
{/if}

<h2>Convocatorias PREPRAII Anteriores</h2>

<div class="ui middle aligned divided list">
  {#each prepraii.filter(p => !p.activo) as p}
    <div class="item">
      <div class="right floated content">
        Convocatoria: {format_date(p.inicio)} - {format_date(p.fin)}
      </div>
      <div class="content">
        Solicitudes:
        {#each p.solicitudes as s}          
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
        {/each}
      </div>
    </div>
  {/each}
</div>
