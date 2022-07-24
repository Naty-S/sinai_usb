<script>
  import Authors from "./authors.svelte";
  import Groups from "./groups.svelte";
  import Observaciones from "./observaciones.svelte";

  const act_data =
  { titulo: undefined
  , observaciones: undefined
  , grupo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  CAPÍTULOS DE LIBROS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título del Capítulo</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <div class="required field">
      <label for="">Página Inicial</label>
      <input type="text">
    </div>
    <div class="required field">
      <label for="">Página Final</label>
      <input type="text">
    </div>
  </div>

  <div class="required field">
    <label for="">Título del Libro</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Casa Editorial</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Editores del Libro</label>
    <!-- TODO: change to add one by one -->
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="three inline fields">
    <div class="required field">
      <label for="">Ciudad</label>
      <!-- TODO: change to dropdown -->
      <input type="text">
    </div>
    <div class="required field">
      <label for="">Pais</label>
      <!-- TODO: change to dropdown -->
      <input type="text">
    </div>
    <div class="required field">
      <label for="">Fecha</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>
  </div>

  <div class="three inline fields">
    <div class="required field">
      <label for="">ISBN</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="field">
      <label for="">Aceptado para Publicación</label>
      <input class="ui checkbox" type="checkbox">
    </div>
  
    <div class="inline field">
      <label for="">Artículo Invitado</label>
      <input class="ui checkbox" type="checkbox" placeholder="">
    </div>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
