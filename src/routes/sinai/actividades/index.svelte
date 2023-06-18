<!-- 
  Shows all activities for the Dean
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean) {
      const res = await fetch("/api/activities");
    
      if (res.ok) {
        const ranks = await res.json();

        return {
          props: { ranks }
        };
      };

      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar las actividades.\n${code}. ${message}`),
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
  import type { Ranks } from "$lib/interfaces/activities";

	import { goto } from "$app/navigation";
  
  export let ranks: Ranks;
</script>


<h2 class="ui blue header uk-text-center">
  Coordinaciones
</h2>
<div class="ui middle aligned divided animated big list">
  {#each ranks.coordinations as coord}
    <div class="item">
      <div class="right floated content">
        <button type="button" class="ui button" on:click={() => goto(`/sinai/actividades/coordinacion/${coord.id}`)}>
          Ver resumen de actividades
        </button>
      </div>
      <div class="content">
        {coord.nombre}
      </div>
    </div>
  {/each}
</div>

<h2 class="ui blue header uk-text-center">
  Divisiones
</h2>
<div class="ui middle aligned divided animated big list">
  {#each ranks.divisions as division}
    <div class="item">
      <div class="right floated content">
        <button type="button" class="ui button" on:click={() => goto(`/sinai/actividades/division/${division.id}`)}>
          Ver resumen de actividades
        </button>
      </div>
      <div class="content">
        {division.nombre}
      </div>
    </div>
  {/each}
</div>
