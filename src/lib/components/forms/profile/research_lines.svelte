<!-- 
	@component
  Professor research lines section form
 -->
<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";

  import { page } from "$app/stores";
    
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";

  const act = $page.params.activity;
  const kind = act as kinds;
  const ctx = act ? kind : '';
  const { form, errors }: activity_form_ctx<any> = getContext(key);

  const add = function () {
    $form.profile.lineas_investigacion = $form.profile.lineas_investigacion.concat(['']);
		$errors.profile.lineas_investigacion = $errors.profile.lineas_investigacion.concat(['']);
	};

	const remove = function (i: number) {
    $form.profile.lineas_investigacion = $form.profile.lineas_investigacion.filter((_, j) => j !== i);
    $errors.profile.lineas_investigacion = $errors.profile.lineas_investigacion.filter((_, j) => j !== i);
  };
</script>

<div class="required field">
  <label for="">Líneas de Investigación</label>

  {#if $form.profile.lineas_investigacion.length === 0 }
    <div class="ui five wide field tiny negative message">
      Ingrese al menos 1 Línea de Investigación
    </div>
  {/if}

  <div class="field">
    {#each $form.profile.lineas_investigacion as r_line, i}
      <div class="inline fields">
        <Input
          label=""
          name="profile.lineas_investigacion[{i}]"
          bind:value={$form.profile.lineas_investigacion[i]}
          class="ten wide field"
        />
          <!-- TODO: error={$errors.profile.lineas_investigacion[i]} -->
        <button type="button" class="ui red button" on:click|preventDefault={() => remove(i)}>
          Elminar
        </button>
      </div>
    {/each}

    <button type="button" class="ui blue button" on:click|preventDefault={add}>
      Agregar
    </button>
    {#if $form.profile.lineas_investigacion.length > 0}      
      <button type="button" class="ui red button" on:click={() => $form.profile.lineas_investigacion = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>
