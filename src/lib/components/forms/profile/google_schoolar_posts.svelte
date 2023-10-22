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
    $form.profile.google_schoolar_posts = $form.profile.google_schoolar_posts.concat(['']);
		$errors.profile.google_schoolar_posts = $errors.profile.google_schoolar_posts.concat(['']);
	};

	const remove = function (i: number) {
    $form.profile.google_schoolar_posts = $form.profile.google_schoolar_posts.filter((_, j) => j !== i);
    $errors.profile.google_schoolar_posts = $errors.profile.google_schoolar_posts.filter((_, j) => j !== i);
  };
</script>

<div class="field">
  <label for="">Publicaciones Google Schoolar</label>

  <div class="field">
    {#each $form.profile.google_schoolar_posts as r_line, i}
      <div class="inline fields">
        <Input
          label=""
          name="profile.google_schoolar_posts[{i}]"
          bind:value={$form.profile.google_schoolar_posts[i]}
          class="ten wide field"
        />
          <!-- TODO: error={$errors.profile.google_schoolar_posts[i]} -->
        <button type="button" class="ui red button" on:click|preventDefault={() => remove(i)}>
          Elminar
        </button>
      </div>
    {/each}

    <button type="button" class="ui blue button" on:click|preventDefault={add}>
      Agregar
    </button>
    {#if $form.profile.google_schoolar_posts.length > 0}      
      <button type="button" class="ui red button" on:click={() => $form.profile.google_schoolar_posts = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>
