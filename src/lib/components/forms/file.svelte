<!-- 
	@component
  Form inputs

  Props:
  * `label`: string
  * `name`: string
  * `placeholder`: string (optional)
  * `value`: any
  * `error`: any (optional)
  * `class`: string
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

  import { page } from "$app/stores";

  import ErrorMsg from "./error_msg.svelte";

  export let accept = "*/*";
  export let label: string;
  export let name: string;
  export let placeholder = '';
  export let value: any;
  export let error: any = undefined;

  const act = $page.params.activity;
  const kind = act as kinds;
  // const ctx = act ? typeof kind : typeof any;
  const { handleChange }: activity_form_ctx<any> = getContext(key);
</script>

<div class:error={error} {...$$props}>
  <label for={name}>{label}</label>
  <input
    type="file"
    {name}
    {value}
    {placeholder}
    {accept}
  >
  <ErrorMsg {error} />
  <slot></slot>
</div>
