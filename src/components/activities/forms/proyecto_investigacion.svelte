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
  PROYECTOS DE INVESTIGACIÓN Y DESARROLLO
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título del Trabajo</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline required fields">
    <div class="field">
      <label for="">Fecha de Inicio</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>
  
    <div class="twelve wide field">
      <label for="">Institución que financia o patrocina</label>
      <!-- TODO: dropdown Fonacit, Otro, si es otro show text input -->
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <div class="two inline fields">
    <div class="required field">
      <label for="">Duración estimada (meses)</label>
      <input type="number" min="1" bind:value={act_data.titulo}>
    </div>
  
    <div class="inline field">
      <label for="">Monto Financiado</label>
      <input type="number">
      <!-- TODO: add currency dropdown -->
    </div>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
