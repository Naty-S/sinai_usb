<script>

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  PROYECTOS DE GRADO DIRIGIDOS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título del Proyecto</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline required fields">
    <div class="eight wide field">
      <label for="">Título Académico al que se optó</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  
    <div class="eight wide field">
      <label for="">Coordinación Académica</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <div class="two inline fields">
    <div class="inline field">
      <label for="">Nivel Académico</label>
      <!-- TODO: change to dropdown -->
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="required field">
      <label for="">Fecha de la Defensa</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>
  </div>

  <!-- TODO: Grupo -->

</div>
