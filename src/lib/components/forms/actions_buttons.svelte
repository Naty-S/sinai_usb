<!-- 
	@component
  Form action buttons
  - Action
    + Create
    + Modify
  - Reset form
  - Go back to previous page
 -->
<script lang="ts">
  import { goto, afterNavigate } from "$app/navigation";

  export let action: string;

  let previousPage: string = "/sinai";
  afterNavigate((navigation) => {
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
    Reset
  </button>
  <button type="button" class="ui button" on:click={() => goto(previousPage)}>
    Regresar
  </button>
</div>
