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
  MEMORIAS ARBITRADAS DE CONGRESOS
</h2>
<h4 class="uk-text-center">
  (In Extenso)
</h4>

<div class="ui large form">

  <div class="required field">
    <label for="">Título del Trabajo</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Nombre del Evento</label>
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
      <label for="">Fecha del Evento</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>
  </div>

  <div class="two inline fields">    
    <div class="inline ten wide field">
      <label for="">Nombre del Medio de Publicación</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="inline field">
      <label for="">Formato</label>
      <!-- TODO: change to dropdown -->
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <div class="two inline fields">
    <div class="four wide field">
      <label for="">Volumen</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="field">
      <label for="">ISBN</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <div class="three inline fields">
    <div class="field">
      <label for="">Cantidad de Páginas</label>
      <input type="number" min="1">
    </div>

    <div class="field">
      <label for="">Página Inicial</label>
      <input type="text">
    </div>

    <div class="field">
      <label for="">Página Final</label>
      <input type="text">
    </div>
  </div>

  <div class="two inline fields">
    <div class="inline field">
      <label for="">Tipo de Congreso</label>
      <!-- TODO: change to dropdown -->
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="inline field">
      <label for="">Entre los autores se encuentra algún estudiante de pre o postgrado</label>
      <input class="ui checkbox" type="checkbox">
    </div>
  </div>
  
  <Groups grupo = {act_data.grupo} />
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
