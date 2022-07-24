<script>

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  COMPOSICIONES SOLICITADAS POR ORQUESTAS SINFÓNICAS O AGRUPACIONES RECONOCIDAS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título de la Obra</label>
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
      <label for="">Fecha</label>
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
    <div class="required ten wide field">
      <label for="">Jurado, Árbitro o Comité Editorial</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="eight wide field">
      <label for="">Financiado Por</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

</div>
