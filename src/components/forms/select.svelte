<script lang="ts">
  import type { activity_form_ctx, kinds } from "$types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  export let label: string;
  export let name: string;
  export let value: any;
  export let options: string[];
  export let error: any = undefined;

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<div class:error={error} {...$$props}>
  <label for={name}>{label}</label>
  <select
    {name}
    class="ui fluid selection dropdown"
    {value}
    on:blur={handleChange}
    on:change={handleChange}
  >
    {#each options as opt}
      <option value={opt}>{opt.replaceAll('_', ' ')}</option>
    {/each}
  </select>
</div>
