<script>
  import Authors from "./authors.svelte";
  import CountryStates from "./country_states.svelte";

  const act_data =
  { titulo: undefined
  , 
  }
</script>

<h2 class="uk-text-center">
  RECITALES O CONCIERTOS ARBITRADOS
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
      <label for="">Fecha del Evento</label>
      <input type="date" name="" id="">
    </div>
  </div>

  <div class="two inline fields">
    <div class="eight wide required field">
      <label for="">Jurado o Árbitro</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>

    <div class="eight wide field">
      <label for="">Financiado Por</label>
      <input type="text" bind:value={act_data.titulo}>
    </div>
  </div>

  <Authors />

</div>
