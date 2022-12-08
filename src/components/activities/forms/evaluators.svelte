<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

  import { page } from "$app/stores";
  
  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$components/forms/input.svelte";

  const param = $page.params.activity;
  const kind = "informe_tecnico" /* param */ as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);

  const add_evaluator = function () {
    $form.informe_tecnico.evaluadores = $form.informe_tecnico.evaluadores.concat(['']);
		$errors.informe_tecnico.evaluadores = $errors.informe_tecnico.evaluadores.concat(['']);
	};  

	const remove_evaluator = function (i: number) {
    $form.informe_tecnico.evaluadores.splice(i, 1);
    $errors.informe_tecnico.evaluadores.splice(i, 1);
  };

</script>

<div class="required field">
  <label for="">Evaluadores</label>

  {#if $form.informe_tecnico.evaluadores.length === 0 }
    <div class="ui five wide field tiny negative message">
      Ingrese al menos 1 evaluador
    </div>
  {/if}

  <div class="field">
    {#each $form.informe_tecnico.evaluadores as evaluator, i}
      <div class="inline fields">
        <Input
          label="Nombre"
          name="informe_tecnico.evaluadores[{i}]"
          bind:value={$form.informe_tecnico.evaluadores[i]}
          error={$errors.informe_tecnico.evaluadores[i]}
          class="ten wide required field"
        />
        <button type="button" class="ui red button" on:click={() => remove_evaluator(i)}>
          Elminar
        </button>
      </div>
    {/each}

    <button type="button" class="ui blue button" on:click|preventDefault={add_evaluator}>
      Agregar
    </button>
    {#if $form.informe_tecnico.evaluadores.length > 0}      
      <button type="button" class="ui red button" on:click={() => $form.informe_tecnico.evaluadores = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>
