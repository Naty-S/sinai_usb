<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  import ErrorMsg from "./error_msg.svelte";

  export let type = "text";
  export let label: string;
  export let name: string;
  export let placeholder = '';
  export let value: any;
  export let error: any = undefined;

  const act = $page.params.activity;
  const kind = act as kinds;
  const ctx = act ? kind : ''; // TODO: 
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<div class:error={error} {...$$props}>
  <label for={name}>{label}</label>
  <input
    {type}
    {name}
    {value}
    {placeholder}
    on:change={handleChange}
    on:blur={handleChange}
    class={type === "checkbox" ? "ui checkbox" : ''}
    checked={value}
  >
  <ErrorMsg {error} />
  <slot></slot>
</div>
