<script>

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  INFORMES TÉCNICOS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título</label>
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
      <label for="">Institución que financia</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <div class="required field">
    <label for="">Evaluadores</label>
    <!-- TODO: change to add one by one -->
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="three inline fields">
    <div class="required field">
      <label for="">Duración estimada del Proyecto (meses)</label>
      <input type="number" min="1" bind:value={act_data.titulo}>
    </div>
  
    <div class="inline field">
      <label for="">Contrato de Confidencialidad</label>
      <input class="ui checkbox" type="checkbox">
    </div>

    <div class="inline field">
      <label for="">Informe de evaluación en DID</label>
      <input class="ui checkbox" type="checkbox">
    </div>
  </div>

  <!-- TODO: Grupo -->

</div>
