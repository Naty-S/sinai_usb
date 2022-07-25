<script>
  import Authors from "./authors.svelte";
  import CountryStates from "./country_states.svelte";

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  TRABAJOS RECONOCIDOS O PREMIADOS EN BIENALES, SALONES, CONCURSOS O EXPOSICIONES
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título de la Obra</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Título del Premio</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Nombre del Evento</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="three inline required fields">
    <CountryStates />
    
    <div class="field">
      <label for="">Fecha del Evento</label>
      <input type="date" name="" id="">
    </div>
  </div>

  <div class="inline field">
    <label for="">Categoría</label>
    <!-- TODO: change to dropdown -->
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <div class="eight wide field">
      <label for="">Institución organizadora</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="eight wide field">
      <label for="">Financiado Por</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <Authors />

</div>
