<script>
  import { getCountries }  from 'cs-list';

  import Authors from "./authors.svelte";
  import Observaciones from "./observaciones.svelte";

  const countries = getCountries();
  const act_data =
  { titulo: undefined
  , observaciones: undefined
  , 
  };

</script>

<h2 class="uk-text-center">
  PATENTES
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <label class="required two wide field" for="">Vigencia</label>
    
    <div class="field">
      <label for="">Fecha de Inicio</label>
      <input type="date" name="" id="">
    </div>

    <div class="field">
      <label for="">Fecha Finalizacion</label>
      <input type="date" name="" id="">
    </div>
  </div>

  <div class="two required inline fields">
    <div class="seven wide field">
      <label for="">Número</label>
      <input type="text">
    </div>
    
    <div class="ten wide field">
      <label for="">País que otorga</label>
      <select name="" id="pais" class="ui selection dropdown">
        {#each countries as country}
          <option value={country.code}>{country.name}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
