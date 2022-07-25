<script>
  import ArticuloRevista from "$components/activities/forms/articulo_revista.svelte";
	import CapituloLibro from "$components/activities/forms/capitulo_libro.svelte";
	import Composicion from "$components/activities/forms/composicion.svelte";
  import CreateBackButtons from "$components/activities/forms/create_back_buttons.svelte";
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

  const articulo_revista = true;
  const capitulo_libro = true;
</script>

{#if articulo_revista}
  <ArticuloRevista />
{:else if capitulo_libro}
  <CapituloLibro />
{:else}
  ERROR, this kind of activity can't be created
{/if}
<Composicion />
<Evento />
<Exposicion />
<Grabacion />
<InformeTecnico />
<Libro />
<Memoria />
<Partitura />
<Patente />
<Premio />
<PremioBienal />
<ProyectoGrado />
<ProyectoInvestigacion />
<Recital />

<CreateBackButtons />
