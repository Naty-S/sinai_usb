<!-- 
	@component
  Form textarea

  Props:
  * `label`: string
  * `name`: string
  * `value`: any
  * `error`: any
  * `class`: string
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

  import { page } from "$app/stores";

  import ErrorMsg from "./error_msg.svelte";

  export let label: string;
  export let name: string;
  export let value: any;
  export let error: any;

  const act = $page.params.activity;
  const kind = act as kinds;
  // const ctx = act ? typeof kind : typeof any;
  const { handleChange }: activity_form_ctx<any> = getContext(key);
</script>

<div class:error={error} {...$$props}>
  <label for={name}>{label}</label>
  <textarea
    {name}
    {value}
    on:change={handleChange}
    on:blur={handleChange}
    rows="5"
    cols="50"
    aria-label="Textarea"
  />
  <ErrorMsg {error} />
</div>
