<script>

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
    <div class="field">
      <label for="">Ciudad</label>
      <!-- TODO: change to dropdown -->
      <input type="text">
    </div>
    <div class="field">
      <label for="">Pais</label>
      <!-- TODO: change to dropdown -->
      <input type="text">
    </div>
    <div class="field">
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
    <label for="">Categoría</label>
    <!-- TODO: change to dropdown -->
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <div class="eight wide field">
      <label for="">Institución Organizadora</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="eight wide field">
      <label for="">Financiado Por</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

</div>
