<!-- 
	@component
  Form action buttons
  - Action
    + Create
    + Modify
    + Register
    + Search
  - Reset form
  - Go back to previous page

  Props:
  * `action`: string
 -->
<script lang="ts">
  import type { activity_form_ctx } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { goto, afterNavigate } from "$app/navigation";

  export let action: string;
  export let reset: string = "Limpiar Todo";
  export let button: string = '';
  export let on_click: () => void = () => {};
  export let on_reset: (() => void) | undefined = undefined;

  const { isSubmitting }: activity_form_ctx<any> = getContext(key);

  let previousPage: string = "/sinai";

  afterNavigate(navigation => {
    if (navigation?.from) {
      previousPage = navigation.from.pathname;
    };
  });
</script>

<div id="action_buttons">
  <button type="submit" name="submit_form" class="ui green button" disabled={$isSubmitting}>
    {action}
  </button>
  {#if on_reset}
    <button type="button" name="reset_form" class="ui red button" on:click={on_reset}>
      {reset}
    </button>
  {:else}
    <button type="reset" name="reset_form" class="ui red button">
      {reset}
    </button>
  {/if}
  <!-- <button type="button" class="ui button" on:click={() => goto(previousPage)}>
    Regresar
  </button> -->
  {#if button != ''}    
    <button type="button" class="ui gray button" on:click={on_click}>
      {button}
    </button>
  {/if}
</div>
