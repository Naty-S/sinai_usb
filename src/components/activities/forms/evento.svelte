<script>
  import { evento_modalidad_enum } from "@prisma/client";

  import Authors from "./authors.svelte";
  import CountryStates from "./country_states.svelte";
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
    <CountryStates />
    
    <div class="required field">
      <label for="">Fecha del Evento</label>
      <input type="date" name="" id="">
    </div>
  </div>

  <div class="two inline fields">
    <div class="six wide field">
      <label for="modalidad">Modalidad</label>
      <select name="" id="modalidad" class="ui selection dropdown">
        {#each Object.entries(evento_modalidad_enum) as [_, mod]}
          <option value={mod}>{mod}</option>
        {/each}
      </select>
    </div>
  
    <div class="ten wide field">
      <label for="">Institución que financia o patrocina</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Observaciones observaciones = {act_data.observaciones} />

  <Authors />

</div>
