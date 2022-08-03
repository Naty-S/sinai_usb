<!--
  @component
  Display the information of the activity depending of its kind
  
  @param {ActivityKind} activity - The activity kind to display its info
  @param {string}       kind     - Indicates the kind of the actvity
-->
<script lang="ts">
  import type { ActivityKind } from "$types/db/activities";
  import { format_date } from "$utils/frontend";

  export let activity: ActivityKind | any;
  export let kind: string;
</script>

{#if kind === "articulos_revistas"}

  <u>{activity.revista}</u>.
  <span class="uk-text-emphasis">Fecha de publicacion:</span> {format_date(activity.fecha_publicacion)}. <!-- anio -->
  {activity.indice ? "Indexada en el " + activity.indice + '.' : ''}
  {activity.articulo_invitado ? "Articulo Invitado." : ''}
  <span class="uk-text-emphasis">Vol.</span> {activity.volumen}, pp. {activity.pag_inicial} - {activity.pag_final}.
  
  <!--
  {activity.con_estudiantes ? "Con estudiantes." : ''}
  {activity.paginas ? "Paginas: " + activity.paginas + '.' : ''} -->

{:else if kind === "capitulos_libros"}

  pp. {activity.pag_inicial} - {activity.pag_final}.
  "{activity.titulo_libro}".
  Editores: {activity.editores}.
  <u>{activity.editorial}</u>.
  {activity.ciudad}, {activity.pais}.
  {format_date(activity.fecha)}. <!-- old: anio -->
  ISBN: {activity.isbn}.
  {activity.articulo_invitado ? "Articulo Invitado." : ''}

{:else if kind === "composiciones"}

  <u>Nombre del Evento: {activity.nombre_evento}</u>.
  {activity.ciudad}, {activity.pais}.
  {format_date(activity.fecha)}. <!-- anio -->
  Categoria: {activity.categoria}.
  Jurado: {activity.jurado}.
  Financiado por: {activity.financiado_por}.

{:else if kind === "eventos"}

  Modalidad: {activity.modalidad}.
  <u>{activity.nombre}</u>.
  {activity.ciudad}, {activity.pais}.
  {format_date(activity.fecha)}.
  {activity.institucion ? "Financiamiento: " + activity.institucion + '.' : ''}
  
{:else if kind === "exposiciones"}
  
  <u>Nombre del Evento: {activity.nombre_evento}</u>.
  Ciudad: {activity.ciudad}, Pais: {activity.pais}.
  {format_date(activity.fecha)}.
  {activity.categoria ? "Categoria: " + activity.categoria + '.' : ''}
  {activity.organizado_por ? "Organizado por: " + activity.organizado_por + '.' : ''}
  {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

{:else if kind === "grabaciones"}
  
  <u>{activity.editorial}</u>.
  {activity.nacional ? "Nacional." : "Internacional."}
  {format_date(activity.fecha)}.
  Jurado: {activity.jurado}.
  Categoria: {activity.categoria}.
  {activity.deposito_legal ? "Deposito legal: " + activity.deposito_legal + '.' : ''}
  {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

{:else if kind === "informes_tecnicos"}
  
  Fecha inicio: {format_date(activity.fecha_inicio)}.
  Financiamiento: {activity.institucion}.
  Evaluadores: {activity.evaluadores}.
  Duración: {activity.meses_duracion} meses.
  {activity.confidencial ? "Confidencial." : ''}
  {activity.evaluacion_did ? "Evaluado por el DID." : ''}

{:else if kind === "libros"}

  <u>{activity.editorial}</u>.
  {activity.ciudad}, {activity.pais}.
  {format_date(activity.fecha)}. <!-- old: anio -->
  ISBN: {activity.isbn}.
  <!-- Segun el codigo viejo deberia de decir si es un articulo invitado, pero en el esquema de la DB no aparece -->

{:else if kind === "memorias"}

  <u>{activity.congreso}</u>.
  {activity.ciudad}, {activity.pais}.
  {format_date(activity.fecha)}.
  {activity.formato}.
  {activity.medio_publicacion ? activity.medio_publicacion + '.' : ''}
  {activity.formato === "Libro" || activity.formato === "Revista" ? "Vol. " + activity.volumen : ''}
  pp. {activity.pag_inicial} - {activity.pag_final}.
  
  <!-- Con_estudiantes: {activity.con_estudiantes}.
  ISBN: {activity.isbn}.
  Paginas: {activity.paginas}.
  Tipo_congreso: {activity.tipo_congreso}. -->

{:else if kind === "partituras"}

  <u>{activity.editorial}</u>.
  {activity.nacional ? "Nacional." : "Internacional."}
  {format_date(activity.fecha)}.
  Jurado: {activity.jurado}.
  Categoria: {activity.categoria}.
  {activity.deposito_legal ? "Deposito legal: " + activity.deposito_legal + '.' : ''}
  {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

{:else if kind === "patentes"}

  {activity.pais}.
  Numero: {activity.numero}.
  {format_date(activity.fecha_inicio)} - {format_date(activity.fecha_fin)}. <!-- anios -->

{:else if kind === "premios"}

  {format_date(activity.fecha)}.
  Institucion que otorga: {activity.institucion}.

{:else if kind === "premios_bienales"}

  <u>Nombre del Evento: {activity.nombre_evento}</u>.
  Titulo del premio: "{activity.titulo_premio}".
  {format_date(activity.fecha)}.
  {activity.ciudad}, {activity.pais}.
  Categoria: {activity.categoria}.
  {activity.organizado_por ? "Organizado por: " + activity.organizado_por + '.' : ''}
  {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

{:else if kind === "proyectos_grado"}

  Titulo Academico: {activity.titulo_academico}.
  Coordinación Academica: {activity.coordinacion_academica}.
  Nivel Academico: {activity.nivel_academico}.
  Fecha de Defensa: {format_date(activity.fecha_defensa)}.

{:else if kind === "proyectos_investigacion"}

  Fecha inicio: {format_date(activity.fecha_inicio)}.
  Financiamiento: {activity.institucion}.
  Tiempo estimado de duración: {activity.meses_duracion} meses.
  
  <!-- Moneda: {activity.moneda}.
  Monto: {activity.monto}. -->

{:else if kind === "recitales"}

  <u>Nombre del Evento: {activity.nombre_evento}</u>.
  {activity.ciudad}, {activity.pais}.
  {format_date(activity.fecha_evento)}.
  Jurado: {activity.jurado}.
  Financiado por: {activity.financiado_por}.

{:else}
  ERROR kind: {kind}
{/if}
