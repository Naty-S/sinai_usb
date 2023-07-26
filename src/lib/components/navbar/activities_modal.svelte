<!-- 
	@component
  Renders list of activities the user can create

  * `pop_up`: boolean
  * `close`: () => void
 -->
<script lang="ts">
  import Modal from "../modal.svelte";

  export let pop_up: boolean;
  export let close: () => void;
</script>

<Modal
  title="Ingresar nueva actividad"
  id="create_activity"
  align="left"
  {pop_up}
  {close}
>
  <li><a href="/sinai/actividades/crear/articulo_revista" on:click={close} >
    Artículos en Revistas
  </a></li>
  <li><a href="/sinai/actividades/crear/capitulo_libro" on:click={close} >
    Capítulos de Libros
  </a></li>
  <li><a href="/sinai/actividades/crear/composicion" on:click={close} >
    Composiciones solicitadas por Orquestas Sinfónicas o Agrupaciones Reconocidas
  </a></li>
  <li><a href="/sinai/actividades/crear/evento" on:click={close} >
    Asistencia a Eventos
  </a></li>
  <li><a href="/sinai/actividades/crear/exposicion" on:click={close} >
    Selección en Exposiciones, Bienales, Salones o Concursos Arbitrados
  </a></li>
  <li><a href="/sinai/actividades/crear/grabacion" on:click={close} >
    Grabaciones Sonoras Evaluadas por Árbitros
  </a></li>
  <li><a href="/sinai/actividades/crear/informe_tecnico" on:click={close} >
    Informes Técnicos
  </a></li>
  <li><a href="/sinai/actividades/crear/libro" on:click={close} >
    Libros Publicados
  </a></li>
  <li><a href="/sinai/actividades/crear/memoria" on:click={close} >
    Memorias de Congresos
  </a></li>
  <li><a href="/sinai/actividades/crear/partitura" on:click={close} >
    Partituras, Videos o CDs publicados en editoriales reconocidas
  </a></li>
  <li><a href="/sinai/actividades/crear/patente" on:click={close} >
    Patentes
  </a></li>
  <li><a href="/sinai/actividades/crear/premio" on:click={close} >
    Premios
  </a></li>
  <li><a href="/sinai/actividades/crear/premio_bienal" on:click={close} >
    Trabajos Reconocidos o Premiados en Bienales, Salones, Concursos o Exposiciones
  </a></li>
  <li><a href="/sinai/actividades/crear/proyecto_grado" on:click={close} >
    Proyectos de Grado Dirigidos
  </a></li>
  <li><a href="/sinai/actividades/crear/proyecto_investigacion" on:click={close} >
    Proyectos de Investigación y Desarrollo
  </a></li>
  <li><a href="/sinai/actividades/crear/recital" on:click={close} >
    Recitales o Conciertos Arbitrados
  </a></li>
</Modal>
