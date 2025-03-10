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
  export let reload: boolean = false;

  let previousPage: string = "/sinai";

  afterNavigate(navigation => {
    if (navigation?.from) {
      previousPage = navigation.from.pathname;
    };
  });
</script>

<div>
  <button type="submit" name="submit_form" class="ui green button">
    {action}
  </button>
  <button type="reset" name="reset_form" class="ui red button">
    Limpiar Todo
  </button>
  <!-- <button type="button" class="ui button" on:click={() => goto(previousPage)}>
    Regresar
  </button> -->
  {#if reload}    
    <button type="button" class="ui gray button" on:click={() => location.reload()}>
      Cancelar
    </button>
  {/if}
</div>
