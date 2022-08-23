<script lang="ts">
  import type { activity_form_ctx, kinds } from "$types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";
  import { getCountries, getStatesByName } from 'cs-list';

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);
  const countries = getCountries();
  
  $: states = getStatesByName($form.recital.pais);
</script>

<div class="required field">
  <label for="recital.pais">Pais</label>
  <select
    name="recital.pais"
    class="ui fluid selection dropdown"
    bind:value={$form.recital.pais}
    on:change={handleChange}
  >
    {#each countries as country}
      <option value={country.name}>{country.name}</option>
    {/each}
  </select>
</div>

<div class="required field" class:error={$errors.recital.ciudad}>
  <label for="recital.ciudad">Ciudad</label>
  {#if states}
    <select
      name="recital.ciudad"
      class="ui fluid selection dropdown"
      bind:value={$form.recital.ciudad}
      on:change={handleChange}
    >
      {#each states as state}
        <option value={state.name}>{state.name}</option>
      {/each}
    </select>
  {:else}
    <input
      type="text"
      name="recital.ciudad"
      bind:value={$form.recital.ciudad}
      on:change={handleChange}
    >
  {/if}
  {#if $errors.recital.ciudad}
    <div class="ui five wide field mini error message">
      Requerido
    </div>
  {/if}
</div>
