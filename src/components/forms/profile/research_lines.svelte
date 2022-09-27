<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

  import { page } from "$app/stores";
    
  import type { activity_form_ctx, kinds } from "$types/forms";

  import Input from "$components/forms/input.svelte";

  const act = $page.params.activity;
  const kind = act as kinds;
  const ctx = act ? kind : '';
  const { form, errors }: activity_form_ctx<any> = getContext(key);

  const add = function () {
    $form.lineas_investigacion = $form.lineas_investigacion.concat(['']);
		$errors.lineas_investigacion = $errors.lineas_investigacion.concat(['']);
	};

	const remove = function (i: number) {
    $form.lineas_investigacion = $form.lineas_investigacion.filter((_, j) => j !== i);
    $errors.lineas_investigacion = $errors.lineas_investigacion.filter((_, j) => j !== i);
  };
</script>

<div class="required field">
  <label for="">Líneas de Investigación</label>

  {#if $form.lineas_investigacion.length === 0 }
    <div class="ui five wide field tiny negative message">
      Ingrese al menos 1 Línea de Investigación
    </div>
  {/if}

  <div class="field">
    {#each $form.lineas_investigacion as r_line, i}
      <div class="inline fields">
        <Input
          label=""
          name="lineas_investigacion[{i}]"
          bind:value={$form.lineas_investigacion[i]}
          class="ten wide field"
        />
          <!-- error={$errors.lineas_investigacion[i]} -->
        <button class="ui red button" on:click={() => remove(i)}>
          Elminar
        </button>
      </div>
    {/each}

    <button class="ui blue button" on:click|preventDefault={add}>
      Agregar
    </button>
    {#if $form.lineas_investigacion.length > 0}      
      <button class="ui red button" on:click={() => $form.lineas_investigacion = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>
