<!-- 
  @component
  Shows all activities for the Dean
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean) {
      const res = await fetch("/api/activities");
    
      if (res.ok) {
        const entities = await res.json();

        return {
          props: { entities }
        };
      };

      const { message } = await res.json();
      return {
        error: new Error(message)
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
  import type { DeanActivities } from "$interfaces/activities";

	import { goto } from "$app/navigation";
  
  export let entities: DeanActivities;
</script>


<h2 class="ui blue header uk-text-center">
  Coordinaciones
</h2>
<div class="ui middle aligned divided animated big list">
  {#each entities.coordinations as coord}
    <div class="item">
      <div class="right floated content">
        <button type="button" class="ui button" on:click={() => goto(`/sinai/actividades/coordinacion/${coord.id}`)}>
          Ver resúmen de actividades
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
  {#each entities.divisions as division}
    <div class="item">
      <div class="right floated content">
        <button type="button" class="ui button" on:click={() => goto(`/sinai/actividades/division/${division.id}`)}>
          Ver resúmen de actividades
        </button>
      </div>
      <div class="content">
        {division.nombre}
      </div>
    </div>
  {/each}
</div>
