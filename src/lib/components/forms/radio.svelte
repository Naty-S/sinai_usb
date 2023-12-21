<!-- 
	@component
  Form textarea

  Props:
  * `label`: string
  * `name`: string
  * `value1`: string | number
  * `value2`: string | number
  * `text1`: string (optional)
  * `text2`: string (optional)
  * `click1`: any (optional)
  * `click2`: any (optional)
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
  // export let inputs: {name: string, value: string | number, text: string, click: any};
  export let value1: string | number;
  export let value2: string | number;
  export let text1: string = String(value1);
  export let text2: string = String(value2);
  export let click1: any = () => {};
  export let click2: any = () => {};
  export let error: any;

  const act = $page.params.activity;
  const kind = act as kinds;
  // const ctx = act ? typeof kind : typeof any;
  const { handleChange }: activity_form_ctx<any> = getContext(key);
</script>

<div class:error={error} {...$$props}>
  <label for={name}>{label}</label>
  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
    <!-- {#each inputs as input, i}
      <label>
        <input
          type="radio"
          id="{input.name}-{input.value}"
          name={input.name}
          value={input.value}
          class="uk-radio"
          on:change={handleChange}
          on:blur={handleChange}
          on:click={input.click}
          checked={i == 0}
        >
        {input.text}
      </label>      
    {/each} -->

    <label>
      <input
        type="radio"
        id="{name}-{value1}"
        {name}
        value={value1}
        class="uk-radio"
        on:change={handleChange}
        on:blur={handleChange}
        on:click={click1}
        checked
      >
      {text1}
    </label>
    <label>
      <input
        type="radio"
        id="{name}-{value2}"
        {name}
        value={value2}
        class="uk-radio"
        on:change={handleChange}
        on:blur={handleChange}
        on:click={click2}
      >
      {text2}
    </label>

    <slot />
  </div>

  <ErrorMsg {error} />
</div>
