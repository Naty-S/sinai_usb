<script>
  import Authors from "./authors.svelte";
  import CountryStates from "./country_states.svelte";
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

  <div class="two required inline fields">
    <div class="field">
      <label for="">Página Inicial</label>
      <input type="text">
    </div>
    <div class="field">
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

  <div class="three required inline fields">
    <CountryStates />
    
    <div class="field">
      <label for="">Fecha</label>
      <input type="date" name="" id="">
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
  
    <div class="field">
      <label for="">Artículo Invitado</label>
      <input class="ui checkbox" type="checkbox" placeholder="">
    </div>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
