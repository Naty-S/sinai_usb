<script lang="ts">
  import ArticuloRevista from "$components/activities/forms/articulo_revista.svelte";
	import CapituloLibro from "$components/activities/forms/capitulo_libro.svelte";
	import Composicion from "$components/activities/forms/composicion.svelte";
  import Evento from "$components/activities/forms/evento.svelte";
  import Exposicion from "$components/activities/forms/exposicion.svelte";
  import Grabacion from "$components/activities/forms/grabacion.svelte";
  import InformeTecnico from "$components/activities/forms/informe_tecnico.svelte";
  import Libro from "$components/activities/forms/libro.svelte";
  import Memoria from "$components/activities/forms/memoria.svelte";
  import Partitura from "$components/activities/forms/partitura.svelte";
  import Patente from "$components/activities/forms/patente.svelte";
  import Premio from "$components/activities/forms/premio.svelte";
  import PremioBienal from "$components/activities/forms/premio_bienal.svelte";
  import ProyectoGrado from "$components/activities/forms/proyecto_grado.svelte";
  import ProyectoInvestigacion from "$components/activities/forms/proyecto_investigacion.svelte";
  import Recital from "$components/activities/forms/recital.svelte";
  
  import Authors from "$components/activities/forms/authors.svelte";
  import Groups from "$components/activities/forms/groups.svelte";
  import Observaciones from "$components/activities/forms/observaciones.svelte";
  
  import ActionsButtons from "$components/forms/actions_buttons.svelte";

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
