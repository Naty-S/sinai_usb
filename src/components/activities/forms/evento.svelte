<script>
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
  ASISTENCIA A EVENTOS
</h2>

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

  <div class="inline field">
    <label for="">Modalidad</label>
    <!-- TODO: change to dropdown -->
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="field">
    <label for="">Institución que financia o patrocina</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
