<script>

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  PREMIOS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título del Premio</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline required fields">
    <div class="field">
      <label for="">Fecha</label>
      <div class="ui calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Seleccione fecha" name="date">
        </div>        
      </div>
    </div>

    <div class="twelve wide field">
      <label for="">Institución que Otorga</label>
      <input type="text">
    </div>
  </div>

  <div class="field">
    <label for="">Observaciones</label>
    <textarea rows="4" bind:value={act_data.titulo} />
  </div>

</div>
