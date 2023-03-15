<script lang="ts">
  import ArticuloRevista from "$lib/components/activities/forms/articulo_revista.svelte";
	import CapituloLibro from "$lib/components/activities/forms/capitulo_libro.svelte";
	import Composicion from "$lib/components/activities/forms/composicion.svelte";
  import Evento from "$lib/components/activities/forms/evento.svelte";
  import Exposicion from "$lib/components/activities/forms/exposicion.svelte";
  import Grabacion from "$lib/components/activities/forms/grabacion.svelte";
  import InformeTecnico from "$lib/components/activities/forms/informe_tecnico.svelte";
  import Libro from "$lib/components/activities/forms/libro.svelte";
  import Memoria from "$lib/components/activities/forms/memoria.svelte";
  import Partitura from "$lib/components/activities/forms/partitura.svelte";
  import Patente from "$lib/components/activities/forms/patente.svelte";
  import Premio from "$lib/components/activities/forms/premio.svelte";
  import PremioBienal from "$lib/components/activities/forms/premio_bienal.svelte";
  import ProyectoGrado from "$lib/components/activities/forms/proyecto_grado.svelte";
  import ProyectoInvestigacion from "$lib/components/activities/forms/proyecto_investigacion.svelte";
  import Recital from "$lib/components/activities/forms/recital.svelte";
  
  import Authors from "$lib/components/activities/forms/authors.svelte";
  import Groups from "$lib/components/activities/forms/groups.svelte";
  import Observaciones from "$lib/components/activities/forms/observaciones.svelte";
  
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";

  export let handleSubmit: svelte.JSX.EventHandler<SubmitEvent, HTMLFormElement>;
  export let handleReset: any;
  export let activity: string;
  export let action: string;
</script>

<form class="ui large form" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>

  {#if activity === "articulo_revista"}
    <ArticuloRevista />
  {:else if activity === "capitulo_libro"}
    <CapituloLibro />
  {:else if activity === "composicion"}
    <Composicion />
  {:else if activity === "evento"}
    <Evento />
  {:else if activity === "exposicion"}
    <Exposicion />
  {:else if activity === "grabacion"}
    <Grabacion />
  {:else if activity === "informe_tecnico"}
    <InformeTecnico />
  {:else if activity === "libro"}
    <Libro />
  {:else if activity === "memoria"}
    <Memoria />
  {:else if activity === "partitura"}
    <Partitura />
  {:else if activity === "patente"}
    <Patente />
  {:else if activity === "premio"}
    <Premio />
  {:else if activity === "premio_bienal"}
    <PremioBienal />
  {:else if activity === "proyecto_grado"}
    <ProyectoGrado />
  {:else if activity === "proyecto_investigacion"}
    <ProyectoInvestigacion />
  {:else if activity === "recital"}
    <Recital />
  {:else}
    ERROR, actividad invalida
  {/if}

  {#if activity !== "patente" && activity !== "premio"}
    <Groups />
  {/if}
  <Authors />
  <Observaciones />
  <ActionsButtons {action} />
</form>
