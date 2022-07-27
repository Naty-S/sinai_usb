<script>
  import { memoria_formato_enum, memoria_tipo_congreso_enum } from "@prisma/client";

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
  MEMORIAS ARBITRADAS DE CONGRESOS
</h2>
<h4 class="uk-text-center">
  (In Extenso)
</h4>

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
    <div class="inline ten wide field">
      <label for="">Nombre del Medio de Publicación</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="inline field">
      <label for="">Formato</label>
      <select id="formato" class="ui selection dropdown">
        {#each Object.entries(memoria_formato_enum) as [_, f]}
          <option value={f}>{f}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="two inline fields">
    <div class="field">
      <label for="">Volumen</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="field">
      <label for="">ISBN</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <div class="three inline fields">
    <div class="field">
      <label for="">Cantidad de Páginas</label>
      <input type="number" min="1">
    </div>

    <div class="field">
      <label for="">Página Inicial</label>
      <input type="text">
    </div>

    <div class="field">
      <label for="">Página Final</label>
      <input type="text">
    </div>
  </div>

  <div class="inline field">
    <label for="">Tipo de Congreso</label>
    <select name="" id="tipo_congreso" class="ui selection dropdown">
      {#each Object.entries(memoria_tipo_congreso_enum) as [_, tipo]}
        <option value={tipo}>{tipo}</option>
      {/each}
    </select>
  </div>
  
  <Groups grupo = {act_data.grupo} />
  <div class="inline field">
    <label for="">Entre los autores se encuentran uno o mas estudiante de pre o postgrado</label>
    <input class="ui checkbox" type="checkbox">
  </div>
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
