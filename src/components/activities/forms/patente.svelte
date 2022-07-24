<script>
  import Authors from "./authors.svelte";
  import Observaciones from "./observaciones.svelte";

  const act_data =
  { titulo: undefined
  , observaciones: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  PATENTES
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <label class="required two wide field" for="">Vigencia</label>
    
    <div class="field">
      <label for="">Fecha de Inicio</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>

    <div class="field">
      <label for="">Fecha Finalizacion</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>
  </div>

  <div class="two required inline fields">
    <div class="field">
      <label for="">Número</label>
      <input type="text">
    </div>
    
    <div class="field">
      <label for="">País que otorga</label>
      <!-- TODO: change to dropdown -->
      <input type="text">
    </div>
  </div>
  
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
