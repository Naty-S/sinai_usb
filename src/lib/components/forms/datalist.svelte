<!-- 
	@component
  Form datalist

  Props:
  * `label`: string
  * `name`: string
  * `value`: any
  * `options`: { val: string, name: string }[]
  * `customHandleChange`: (e: any) => void
  * `error`: any (optional)
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
  export let options: { val: string | number, name: string }[];
  export let customHandleChange: (e: any) => void;
  export let error: any = undefined;

  const param = $page.params.activity;
  const kind = param as kinds;
  const { handleChange }: activity_form_ctx<any> = getContext(key);
</script>

<div class:error={error} {...$$props}>
  <label for={name}>{label}</label>
  <input
    list="datalist-{name}"
    {name}
    {value}
    on:change={(e) => {
      customHandleChange(e);
      handleChange(e);
    }}
  >
  <datalist
    id="datalist-{name}"
    class="ui fluid selection"
  >
    {#each options as opt}
      <option value={opt.val}>{opt.name.replaceAll('_', ' ')}</option>
    {/each}
  </datalist>
  <ErrorMsg {error} />
</div>
