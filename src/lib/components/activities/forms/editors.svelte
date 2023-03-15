<script lang="ts">
  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
    
  import type { activity_form_ctx } from "$lib/types/forms";

  import Input from "$lib/components/forms/input.svelte";

  const { form, errors }: activity_form_ctx<"capitulo_libro"> = getContext(key);

  const add_editor = function () {
    $form.capitulo_libro.editores = $form.capitulo_libro.editores.concat(['']);
		$errors.capitulo_libro.editores = $errors.capitulo_libro.editores.concat(['']);
	};  

	const remove_editor = function (i: number) {
    $form.capitulo_libro.editores.splice(i, 1);
    $errors.capitulo_libro.editores.splice(i, 1);
  };

</script>

<div class="required field">
  <label for="">Editores del Libro</label>

  {#if $form.capitulo_libro.editores.length === 0 }
    <div class="ui five wide field tiny negative message">
      Ingrese al menos 1 editor
    </div>
  {/if}

  <div class="field">
    {#each $form.capitulo_libro.editores as editor, i}
      <div class="inline fields">
        <Input
          label="Nombre"
          name="capitulo_libro.editores[{i}]"
          bind:value={$form.capitulo_libro.editores[i]}
          error={$errors.capitulo_libro.editores[i]}
          class="ten wide required field"
        />
        <button type="button" class="ui red button" on:click={() => remove_editor(i)}>
          Elminar
        </button>
      </div>
    {/each}

    <button type="button" class="ui blue button" on:click|preventDefault={add_editor}>
      Agregar
    </button>
    {#if $form.capitulo_libro.editores.length > 0}      
      <button type="button" class="ui red button" on:click={() => $form.capitulo_libro.editores = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>
