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
  import { goto, afterNavigate } from "$app/navigation";

  export let action: string;
  export let reset: string = "Limpiar Todo";
  export let button: string = '';
  export let on_click: () => void = () => {};

  let previousPage: string = "/sinai";
  let disable = false;

  afterNavigate(navigation => {
    if (navigation?.from) {
      previousPage = navigation.from.pathname;
    };
  });
</script>

<div id="action_buttons">
  <button type="submit" name="submit_form" class="ui green button">
    {action}
  </button>
  <button type="reset" name="reset_form" class="ui red button">
    {reset}
  </button>
  <!-- <button type="button" class="ui button" on:click={() => goto(previousPage)}>
    Regresar
  </button> -->
  {#if button != ''}    
    <button type="button" class="ui gray button" on:click={on_click}>
      {button}
    </button>
  {/if}
</div>
