<script lang="ts">
  import Authors from './authors.svelte';
	import Groups from './groups.svelte';  
  import Observaciones from './observaciones.svelte';

  const act_data =
  { titulo: undefined
  , observaciones: undefined
  , grupo: undefined
  , articulo_invitado: undefined
  , con_estudiantes: undefined
  , estado: undefined
  , fecha_publicacion: undefined
  , indice: undefined
  , pag_final: undefined
  , pag_inicial: undefined
  , paginas: undefined
  , revista: undefined
  , volumen: undefined
  };

  const is_err = false;
</script>

<h2 class="uk-text-center">
  ARTÍCULOS EN REVISTAS
</h2>

<div class="ui large form" class:error="{is_err}">

  <div class="required field" class:error="{is_err}">
    <label for="">Título del Artículo</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>
  <div class="ui four wide field small error message">
    <div class="header">Requerido</div>
    <!-- <p>Introduzca un titulo</p> -->
  </div>

  <div class="two inline fields">
    <label class="required" for="">Nombre de la Revista Arbitrada</label>
    <div class="ten wide field">
      <!-- TODO: #9 -->
      <input type="text">
    </div>
  </div>

  <div class="two inline fields">
    <div class="field">
      <label for="">Índice</label>
      <input type="text">
    </div>
    
    <div class="required field">
      <label for="">Volumen</label>
      <input type="text">
    </div>
  </div>

  <div class="three inline fields">
    <div class="field">
      <label for="">Cantidad de Páginas</label>
      <input type="number" min="1">
    </div>

    <div class="required field">
      <label for="">Página Inicial</label>
      <input type="text">
    </div>

    <div class="required field">
      <label for="">Página Final</label>
      <input type="text">
    </div>
  </div>

  <div class="three inline fields">
    <div class="eight wide required field">
      <label for="">Fecha de Publicación</label>
      <input type="date" name="" id="">
    </div>

    <div class="ten wide field fields">
      <label for="">Estado</label>
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input class="uk-radio" type="radio" name="radio2" checked>
          Aceptado en Vias de Publicacion
        </label>
        <label>
          <input class="uk-radio" type="radio" name="radio2">
          Publicado
        </label>
      </div>
    </div>

    <div class="four wide field">
      <label for="">Artículo Invitado</label>
      <input class="ui checkbox" type="checkbox">
    </div>
  </div>
  
  <Groups grupo = {act_data.grupo} />
  <div class="inline field">
    <label for="">Entre los autores se encuentra algún estudiante de pre o postgrado</label>
    <input class="ui checkbox" type="checkbox">
  </div>
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
