<!-- 
	@component
  S1 Novel backup files form
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

  //import { page } from "$app/stores";

  import ErrorMsg from "$lib/components/forms/error_msg.svelte";

  // const act = $page.params.activity;
  // const kind = act as kinds;
  // const ctx = act ? kind : '';
  const { form, errors, handleChange }: activity_form_ctx<any> = getContext(key);

  const add = function () {
    $form.soportes = $form.soportes.concat([null]);
		$errors.soportes = $errors.soportes.concat(['']);
	};

	const remove = function (i: number) {
    $form.soportes = $form.soportes.filter((_, j) => j !== i);
    $errors.soportes = $errors.soportes.filter((_, j) => j !== i);
  };
</script>

<div class="required field">
  <label for="">Soportes</label>

  {#if $form.soportes.length === 0 }
    <div class="ui field tiny negative message">
      Ingrese al menos 1 Soporte
    </div>
  {/if}

  <div class="field">
    {#each $form.soportes as r_line, i}
      <div class="two inline fields">
        <div class="ten wide field" class:error={$errors.soportes[i]}>
          <input
            type="file"
            name="soportes[{i}]"
            accept=".pdf"
            bind:value={$form.soportes[i]}
            on:change={handleChange}
          />
          <ErrorMsg error={$errors.soportes[i]} /> <!-- TODO: no lo muestra -->
        </div>

        <div class="three wide field">
          <button type="button" class="ui red button" on:click|preventDefault={() => remove(i)}>
            Elminar
          </button>
        </div>
      </div>
    {/each}

    <button type="button" class="ui blue button" on:click|preventDefault={add}>
      Agregar
    </button>
    {#if $form.soportes.length > 0}      
      <button type="button" class="ui red button" on:click={() => $form.soportes = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>
