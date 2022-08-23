<script lang="ts">
  import type { activity_form_ctx, kinds } from "$types/forms";
  import type { Group } from "$interfaces/groups";

  import { getContext, onMount } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  let groups: Group[] = [];

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);

  onMount(async () => {
    const res = await fetch(`/api/groups`);
    
    try {      
      if (res.ok) {
        groups = await res.clone().json();
      };
    } catch (error) {      
      throw error;
    };
  });
</script>

{#if $form.actividades_grupos}
  <div class="field">
    <label for="actividades_grupos[0]">
      Esta Actividad fue realizada en el Grupo
    </label>
    <select
      name="actividades_grupos[0]"
      class="ui fluid selection dropdown"
      bind:value={$form.actividades_grupos[0]}
      on:change={handleChange}
    >
      {#each groups as g}
        <option value={g.id}>{g.id} - {g.nombre}</option>
      {/each}
    </select>
    {#if $errors.actividades_grupos}
      <div class="ui mini error message">
        {$errors.actividades_grupos[0]}
      </div>
    {/if}
  </div>
{:else}
  no
{/if}
