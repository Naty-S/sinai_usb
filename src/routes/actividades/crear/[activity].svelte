<script>
  import { page } from "$app/stores";

  import ArticuloRevista from "$components/activities/forms/articulo_revista.svelte";
	import CapituloLibro from "$components/activities/forms/capitulo_libro.svelte";
	import Composicion from "$components/activities/forms/composicion.svelte";
  // import ActionsButtons from "$components/activities/forms/actions_buttons.svelte";
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

</script>

{#if $page.params.activity === "articulo_revista"}
  <ArticuloRevista />
{:else if $page.params.activity === "capitulo_libro"}
  <CapituloLibro />
{:else if $page.params.activity === "composicion"}
  <Composicion />
{:else if $page.params.activity === "evento"}
  <Evento />
{:else if $page.params.activity === "exposicion"}
  <Exposicion />
{:else if $page.params.activity === "grabacion"}
  <Grabacion />
{:else if $page.params.activity === "informe_tecnico"}
  <InformeTecnico />
{:else if $page.params.activity === "libro"}
  <Libro />
{:else if $page.params.activity === "memoria"}
  <Memoria />
{:else if $page.params.activity === "partitura"}
  <Partitura />
{:else if $page.params.activity === "patente"}
  <Patente />
{:else if $page.params.activity === "premio"}
  <Premio />
{:else if $page.params.activity === "premio_bienal"}
  <PremioBienal />
{:else if $page.params.activity === "proyecto_grado"}
  <ProyectoGrado />
{:else if $page.params.activity === "proyecto_investigacion"}
  <ProyectoInvestigacion />
{:else if $page.params.activity === "recital"}
  <Recital />
{:else}
  ERROR, actividad invalida
{/if}

<!-- <ActionsButtons /> -->
