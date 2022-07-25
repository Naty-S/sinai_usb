<script>
  import { proyecto_grado_nivel_academico_enum } from "@prisma/client";

  import Authors from "./authors.svelte";
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
      <label for="nivel_academico">Nivel Académico</label>
      <select name="" id="nivel_academico" class="ui selection dropdown">
        {#each Object.entries(proyecto_grado_nivel_academico_enum) as [_, cat]}
          <option value={cat}>{cat.replace('_', ' ')}</option>
        {/each}
      </select>
    </div>

    <div class="required field">
      <label for="">Fecha de la Defensa</label>
      <input type="date" name="" id="">
    </div>
  </div>

  <Groups grupo = {act_data.grupo} />
  <Authors />
  <Observaciones observaciones = {act_data.observaciones} />

</div>
