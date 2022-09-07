<script lang="ts">
  import type { activity_form_ctx, kinds } from "$types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  export let type = "text";
  export let label: string;
  export let name: string;
  export let value: any;
  export let error: any = undefined;

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<div class:error={error} {...$$props}>
  <label for={name}>{label}</label>
  <input
    {type}
    {name}
    {value}
    on:change={handleChange}
    on:blur={handleChange}
    class={type === "checkbox" ? "ui checkbox" : ''}
    checked={value}
  >
  {#if error}
    <div class="ui mini error message">
      {error}
    </div>
  {/if}
  <slot></slot>
</div>
