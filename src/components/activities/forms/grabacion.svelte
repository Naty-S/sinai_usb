<script>
  import { grabacion_categoria_enum } from "@prisma/client";

  import Authors from "./authors.svelte";

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  GRABACIONES SONORAS EVALUADAS POR ÁRBITROS
</h2>

<div class="ui large form">

  <div class="required field">
    <label for="">Título de la Obra</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="required field">
    <label for="">Nombre de la Editorial</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <div class="required field">
      <label for="">Fecha</label>
      <input type="date" name="" id="">
    </div>

    <div class="inline field">
      <label for="">Nacional</label>
      <input class="ui checkbox" type="checkbox">
    </div>
  </div>

  <div class="inline field">
    <label for="">Categoría</label>
    <select name="" id="categoria" class="ui selection dropdown">
      {#each Object.entries(grabacion_categoria_enum) as [_, cat]}
        <option value={cat}>{cat.replaceAll('_', ' ')}</option>
      {/each}
    </select>
  </div>

  <div class="field">
    <label for="">Jurado, Árbitro o Comité Editorial</label>
    <input type="text" bind:value={act_data.titulo}>
  </div>

  <div class="two inline fields">
    <div class="eight wide field">
      <label for="">Depósito Legal</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="eight wide field">
      <label for="">Financiado Por</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <Authors />

</div>
