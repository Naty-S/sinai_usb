<script lang="ts">
  import { Country, State }  from 'country-state-city';

  const countries = Country.getAllCountries();
  let select_country = "VE";
</script>

<div class="required field">
  <label for="pais">Pais</label>
  <select id="pais" class="ui fluid selection dropdown" bind:value={select_country}>
    {#each countries as country}
      <option value={country.isoCode}>{country.flag} - {country.name}</option>
    {/each}
  </select>
  </div>

<div class="required field">
  <label for="ciudad">Ciudad</label>
  <select id="ciudad" class="ui fluid selection dropdown">
    <!-- TODO: It can be empty states, ex 'AX', display text input if so -->
    {#each State.getStatesOfCountry(select_country) as state}
      <option value={state.name}>{state.name}</option>
    {/each}
  </select>
</div>
