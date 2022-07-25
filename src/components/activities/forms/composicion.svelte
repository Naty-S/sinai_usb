<script>
  import { composicion_categoria_enum } from "@prisma/client";

  import Authors from "./authors.svelte";
  import CountryStates from "./country_states.svelte";

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
    <CountryStates />
    
    <div class="required field">
      <label for="">Fecha</label>
      <input type="date" name="" id="">
    </div>
  </div>

  <div class="inline field">
    <label for="categoria">Categoría</label>
    <select name="" id="categoria" class="ui selection dropdown">
      {#each Object.entries(composicion_categoria_enum) as [_, comp]}
        <option value={comp}>{comp}</option>
      {/each}
    </select>
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

  <Authors />

</div>
