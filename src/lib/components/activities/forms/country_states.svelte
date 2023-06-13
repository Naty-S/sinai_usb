<!-- 
	@component
  Countries and states dropdown selection
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";
  import { getCountries, getStatesByName } from 'cs-list';

  import Select from "$lib/components/forms/select.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);
  const countries = getCountries();
  
  $: states = getStatesByName($form[kind].pais);
</script>

<Select
  label="Pais"
  name="{kind}.pais"
  bind:value={$form[kind].pais}
  options={countries.map(c => ({ val: c.name, name: c.name }))}
  class="field"
/>

<div class="field" class:error={$errors[kind].ciudad}>
  <label for="{kind}.ciudad">Ciudad</label>
  {#if states}
    <select
      name="{kind}.ciudad"
      class="ui fluid selection dropdown"
      bind:value={$form[kind].ciudad}
      on:change={handleChange}
    >
      {#each states as state}
        <option value={state.name}>{state.name}</option>
      {/each}
    </select>
  {:else}
    <input
      type="text"
      name="{kind}.ciudad"
      bind:value={$form[kind].ciudad}
      on:change={handleChange}
    >
  {/if}
  {#if $errors[kind].ciudad}
    <div class="ui five wide field mini error message">
      Requerido
    </div>
  {/if}
</div>
