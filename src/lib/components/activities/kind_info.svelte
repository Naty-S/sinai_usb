<!--
  @component
  Display the information of the activity according of the kind
 -->
<script lang="ts">
  import type { ActivityKind } from "$lib/types/activities";
  import { format_date } from "$lib/utils/formatting";

  export let activity: ActivityKind;
  export let kind: string;
</script>

{#if activity}

  {#if kind === "articulo_revista"}

    <u>{activity.revista}</u>.
    <span class="uk-text-emphasis">Fecha de publicacion:</span> {format_date(activity.fecha_publicacion)}.
    {activity.indice ? "Indexada en el " + activity.indice + '.' : ''}
    {activity.articulo_invitado ? "Articulo Invitado." : ''}
    <span class="uk-text-emphasis">{activity.estado}.</span>
    <span class="uk-text-emphasis">Vol.</span> {activity.volumen}, pp. {activity.pag_inicial} - {activity.pag_final}.
    <span class="uk-text-emphasis">Paginas:</span> {activity.paginas}
    {activity.con_estudiantes ? "Con estudiantes." : ''}

  {:else if kind === "capitulo_libro"}

    pp. {activity.pag_inicial} - {activity.pag_final}.
    "{activity.titulo_libro}".
    <span class="uk-text-emphasis">Editores:</span> {activity.editores.join(", ")}.
    <u>{activity.editorial}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}.
    <span class="uk-text-emphasis">ISBN:</span> {activity.isbn}.
    {activity.articulo_invitado ? "Articulo Invitado." : ''}
    {activity.aceptado ? "Aceptado para publicación." : ''}

  {:else if kind === "composicion"}

    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}.
    <span class="uk-text-emphasis">Categoria:</span> {activity.categoria}.
    <span class="uk-text-emphasis">Jurado:</span> {activity.jurado}.
    <span class="uk-text-emphasis">Financiado por:</span> {activity.financiado_por}.

  {:else if kind === "evento"}

    <span class="uk-text-emphasis">Modalidad:</span> {activity.modalidad}.
    <u>{activity.nombre}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}.
    {activity.institucion ? "Financiamiento: " + activity.institucion + '.' : ''}
    {activity.internacional ? "Internacional" : "Nacional"}.
    
  {:else if kind === "exposicion"}
    
    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}.
    {activity.categoria ? "Categoria: " + activity.categoria + '.' : ''}
    {activity.organizado_por ? "Organizado por: " + activity.organizado_por + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "grabacion"}
    
    <u>{activity.editorial}</u>.
    {activity.nacional ? "Nacional." : "Internacional."}
    {format_date(activity.fecha)}.
    <span class="uk-text-emphasis">Jurado:</span> {activity.jurado || "Sin Jurado"}.
    <span class="uk-text-emphasis">Categoria:</span> {activity.categoria}.
    {activity.deposito_legal ? "Deposito legal: " + activity.deposito_legal + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "informe_tecnico"}
    
    <span class="uk-text-emphasis">Fecha inicio:</span> {format_date(activity.fecha_inicio)}.
    <span class="uk-text-emphasis">Financiado por:</span> {activity.institucion}.
    <span class="uk-text-emphasis">Evaluadores:</span> {activity.evaluadores.join(", ")}.
    <span class="uk-text-emphasis">Duración:</span> {activity.meses_duracion} meses.
    {activity.confidencial ? "Confidencial." : ''}
    {activity.evaluacion_did ? "Evaluado por el DID." : ''}

  {:else if kind === "libro"}

    <u>{activity.editorial}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}.
    <span class="uk-text-emphasis">ISBN:</span> {activity.isbn}.

  {:else if kind === "memoria"}

    <u>{activity.congreso}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha)}.
    {activity.formato}.
    {activity.medio_publicacion ? activity.medio_publicacion + '.' : ''}
    {activity.formato === "Libro" || activity.formato === "Revista" ? "Vol. " : ''} {activity.volumen}
    pp. {activity.pag_inicial} - {activity.pag_final}.
    <span class="uk-text-emphasis">Paginas:</span> {activity.paginas}.
    {activity.con_estudiantes ? "Con estudiantes." : ''}
    <span class="uk-text-emphasis">ISBN:</span> {activity.isbn}.
    <span class="uk-text-emphasis">Tipo de Congreso:</span> {activity.tipo_congreso}.

  {:else if kind === "partitura"}

    <u>{activity.editorial}</u>.
    {activity.nacional ? "Nacional." : "Internacional."}
    {format_date(activity.fecha)}.
    <span class="uk-text-emphasis">Jurado:</span> {activity.jurado}.
    <span class="uk-text-emphasis">Categoria:</span> {activity.categoria}.
    {activity.deposito_legal ? "Deposito legal: " + activity.deposito_legal + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "patente"}

    {activity.pais}.
    <span class="uk-text-emphasis">Numero:</span> {activity.numero}.
    {format_date(activity.fecha_inicio)} - {format_date(activity.fecha_fin)}.

  {:else if kind === "premio"}

    {format_date(activity.fecha)}.
    <span class="uk-text-emphasis">Institucion que otorga:</span> {activity.institucion}.

  {:else if kind === "premio_bienal"}

    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    <span class="uk-text-emphasis">Titulo del premio:</span> "{activity.titulo_premio}".
    {format_date(activity.fecha)}.
    {activity.ciudad}, {activity.pais}.
    <span class="uk-text-emphasis">Categoria:</span> {activity.categoria}.
    {activity.organizado_por ? "Organizado por: " + activity.organizado_por + '.' : ''}
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {:else if kind === "proyecto_grado"}

    <span class="uk-text-emphasis">Titulo Academico:</span> {activity.titulo_academico}.
    <span class="uk-text-emphasis">Coordinación Academica:</span> {activity.coordinacion_academica}.
    <span class="uk-text-emphasis">Nivel Academico:</span> {activity.nivel_academico}.
    <span class="uk-text-emphasis">Fecha de Defensa:</span> {format_date(activity.fecha_defensa)}.

  {:else if kind === "proyecto_investigacion"}

    <span class="uk-text-emphasis">Fecha inicio:</span> {format_date(activity.fecha_inicio)}.
    <span class="uk-text-emphasis">Financiado por:</span> {activity.institucion}.
    <span class="uk-text-emphasis">Monto:</span> {activity.monto}{activity.moneda}.
    <span class="uk-text-emphasis">Tiempo estimado de duración:</span> {activity.meses_duracion} meses.    

  {:else if kind === "recital"}

    <u>Nombre del Evento: {activity.nombre_evento}</u>.
    {activity.ciudad}, {activity.pais}.
    {format_date(activity.fecha_evento)}.
    <span class="uk-text-emphasis">Jurado:</span> {activity.jurado}.
    {activity.financiado_por ? "Financiado por: " + activity.financiado_por + '.' : ''}

  {/if}

{:else}
  <span class="ui red text"><strong>
    ESTA ACTIVIDAD SE INGRESO DE FORMA INCORRECTA Y SUS DATOS NO SON VALIDOS, LO QUE HACE
    IMPOSIBLE MODIFICARLA.
  </strong></span>
{/if}
