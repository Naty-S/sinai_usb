<!--
  @component
  Display the information of the activity depending of its kind
  
  @param {ActivityKind} activity - The activity kind to display its info
  @param {string}       kind     - Indicates the kind of the actvity
-->
<script lang="ts">
  import type { ActivityKind } from "$lib/types/activities";
  import { format_date } from "$utils/formatting";

  export let activity: ActivityKind;
  export let kind: string;
</script>

{#if activity}

  {#if kind === "articulo_revista"}

    <u>{activity.revista}</u>.
    <span class="uk-text-emphasis">Fecha de publicacion:</span> {format_date(activity.fecha_publicacion)}. <!-- anio -->
    {activity.indice ? "Indexada en el " + activity.indice + '.' : ''}
    {activity.articulo_invitado ? "Articulo Invitado." : ''}
    <span class="uk-text-emphasis">Vol.</span> {activity.volumen}, pp. {activity.pag_inicial} - {activity.pag_final}.
    
    <!--
    {activity.con_estudiantes ? "Con estudiantes." : ''}
    {activity.paginas ? "Paginas: " + activity.paginas + '.' : ''} -->

  {:else if kind === "capitulo_libro"}

    pp. {activity.pag_inicial} - {activity.pag_final}.
    "{activity.titulo_libro}".
    Editores: {activity.editores}.
    <u>{activity.editorial}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}. <!-- old: anio -->
    ISBN: {activity.isbn}.
    {activity.articulo_invitado ? "Articulo Invitado." : ''}

  {:else if kind === "composicion"}

    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}. <!-- anio -->
    Categoria: {activity.categoria}.
    Jurado: {activity.jurado}.
    Financiado por: {activity.financiado_por}.

  {:else if kind === "evento"}

    Modalidad: {activity.modalidad}.
    <u>{activity.nombre}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}.
    {activity.institucion ? "Financiamiento: " + activity.institucion + '.' : ''}
    
  {:else if kind === "exposicion"}
    
    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    Ciudad: {activity.ciudad}, Pais: {activity.pais}.
    {format_date(activity.fecha)}.
    {activity.categoria ? "Categoria: " + activity.categoria + '.' : ''}
    {activity.organizado_por ? "Organizado por: " + activity.organizado_por + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "grabacion"}
    
    <u>{activity.editorial}</u>.
    {activity.nacional ? "Nacional." : "Internacional."}
    {format_date(activity.fecha)}.
    Jurado: {activity.jurado || "Sin Jurado"}.
    Categoria: {activity.categoria}.
    {activity.deposito_legal ? "Deposito legal: " + activity.deposito_legal + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "informe_tecnico"}
    
    Fecha inicio: {format_date(activity.fecha_inicio)}.
    Financiamiento: {activity.institucion}.
    Evaluadores: {activity.evaluadores}.
    Duración: {activity.meses_duracion} meses.
    {activity.confidencial ? "Confidencial." : ''}
    {activity.evaluacion_did ? "Evaluado por el DID." : ''}

  {:else if kind === "libro"}

    <u>{activity.editorial}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}. <!-- old: anio -->
    ISBN: {activity.isbn}.
    <!-- Segun el codigo viejo deberia de decir si es un articulo invitado, pero en el esquema de la DB no aparece -->

  {:else if kind === "memoria"}

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

  {:else if kind === "partitura"}

    <u>{activity.editorial}</u>.
    {activity.nacional ? "Nacional." : "Internacional."}
    {format_date(activity.fecha)}.
    Jurado: {activity.jurado}.
    Categoria: {activity.categoria}.
    {activity.deposito_legal ? "Deposito legal: " + activity.deposito_legal + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "patente"}

    {activity.pais}.
    Numero: {activity.numero}.
    {format_date(activity.fecha_inicio)} - {format_date(activity.fecha_fin)}. <!-- anios -->

  {:else if kind === "premio"}

    {format_date(activity.fecha)}.
    Institucion que otorga: {activity.institucion}.

  {:else if kind === "premio_bienal"}

    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    Titulo del premio: "{activity.titulo_premio}".
    {format_date(activity.fecha)}.
    {activity.ciudad}, {activity.pais}.
    Categoria: {activity.categoria}.
    {activity.organizado_por ? "Organizado por: " + activity.organizado_por + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "proyecto_grado"}

    Titulo Academico: {activity.titulo_academico}.
    Coordinación Academica: {activity.coordinacion_academica}.
    Nivel Academico: {activity.nivel_academico}.
    Fecha de Defensa: {format_date(activity.fecha_defensa)}.

  {:else if kind === "proyecto_investigacion"}

    Fecha inicio: {format_date(activity.fecha_inicio)}.
    Financiamiento: {activity.institucion}.
    Tiempo estimado de duración: {activity.meses_duracion} meses.
    
    <!-- Moneda: {activity.moneda}.
    Monto: {activity.monto}. -->

  {:else if kind === "recital"}

    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha_evento)}.
    Jurado: {activity.jurado}.
    Financiado por: {activity.financiado_por}.

  {/if}

{:else}
  <span class="ui red text"><strong>
    ESTA ACTIVIDAD SE INGRESO DE FORMA INCORRECTA Y SUS DATOS NO SON VALIDOS
  </strong></span>
{/if}
