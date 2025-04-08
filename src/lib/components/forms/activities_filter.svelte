<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

	import { kinds } from "$lib/constants";

  import Input from "$lib/components/forms/input.svelte";

  export let date_start: Date;
  export let date_end: Date;

  const { form, errors }: any = getContext(key);
</script>

<div class="ui container center aligned segment">
  <!-- Date filter -->
  <div class="two inline fields">
    <Input
      type="date"
      label="Fecha Inicio"
      name="date_start"
      bind:value={$form.date_start}
      error={$errors.date_start}
      class="required field"
    />
    <Input
      type="date"
      label="Fecha Final"
      name="date_end"
      bind:value={$form.date_end}
      error={$errors.date_end}
      class="required field"
    />
  </div>

  <!-- Activities kind filter -->
  <div class="ui five column grid container">  
    {#each kinds as kind}
      <div class="column">
        <Input
          type="checkbox"
          label={kind.replaceAll('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
          name={kind}
          bind:value={$form[kind]}
          error={$errors[kind]}
          class="field"
        />
      </div>
    {/each}
  </div>
</div>
