<script>
  import Authors from "./authors.svelte";

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  PARTITURAS, VIDEOS O CDs PUBLICADOS EN EDITORIALES RECONOCIDAS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título de la Obra</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Nombre de la Editorial</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <div class="required field">
      <label for="">Fecha del Evento</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>

    <div class="inline field">
      <label for="">Nacional</label>
      <input class="ui checkbox" type="checkbox">
    </div>
  </div>

  <div class="inline field">
    <label for="">Categoría</label>
    <!-- TODO: change to dropdown -->
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="field">
    <label for="">Jurado, Árbitro o Comité Editorial</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <div class="eight wide field">
      <label for="">Depósito Legal</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="eight wide field">
      <label for="">Financiado Por</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <Authors />

</div>
