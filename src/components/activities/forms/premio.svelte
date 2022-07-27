<script>
  import Authors from "./authors.svelte";
	import Observaciones from './observaciones.svelte';

  const act_data =
  { titulo: undefined
  , observaciones: undefined
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
      <input type="date" name="" id="">
    </div>

    <div class="twelve wide field">
      <label for="">Institución que otorga</label>
      <input type="text">
    </div>
  </div>

  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
