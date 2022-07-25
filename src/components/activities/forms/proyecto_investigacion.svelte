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
      <input type="date" name="" id="">
    </div>
  
    <div class="twelve wide field">
      <label for="">Institución que financia o patrocina</label>
      <!-- TODO: #12 -->
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input class="uk-radio" type="radio" name="radio2" checked>
          Fonacit
        </label>
        <label>
          <input class="uk-radio" type="radio" name="radio2">
          Otro
        </label>
      </div>
    </div>
  </div>

  <div class="two required inline fields">
    <div class="field">
      <label for="">Duración estimada (meses)</label>
      <input type="number" min="1" bind:value={act_data.titulo}>
    </div>
  
    <div class="three inline field fields">
      <label for="" class="required">Monto Financiado</label>
      <div class="six wide field">
        <input type="number">
      </div>
      <div class="four wide field">
        <!-- TODO: #13 -->
        <select name="" id="">
          <option>Bs.</option>
        </select>
      </div>
    </div>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
