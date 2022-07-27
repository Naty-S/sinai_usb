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
  LIBROS PUBLICADOS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Editorial</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="three inline fields">
    <CountryStates />
    
    <div class="required field">
      <label for="">Fecha</label>
      <input type="date" name="" id="">
    </div>
  </div>

  <div class="two inline fields">
    <div class="required field">
      <label for="">ISBN</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="field">
      <label for="">Aceptado para Publicación</label>
      <input class="ui checkbox" type="checkbox">
    </div>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
