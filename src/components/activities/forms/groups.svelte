<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { key } from "svelte-forms-lib";

  import { page } from "$app/stores";
  
  import type { activity_form_ctx, kinds } from "$types/forms";
  import type { Group } from "$interfaces/groups";

  import * as api from "$lib/api";

  import Modal from "$components/modal.svelte";
  import Select from "$components/forms/select.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);

  let groups: Group[] = [];
  let action = { info: '', code: '' };

  onMount(async () => {
    const res = await api.get("/api/groups");

    if (res.ok) {
      groups = await res.clone().json();
      
    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  });

  const add_group = function () {
    $form.actividades_grupos = $form.actividades_grupos.concat([{ old: '?', new: '1'}]);
    $errors.actividades_grupos = $errors.actividades_grupos.concat([{ old: '', new: ''}]);
  };

  const remove_group = function (i: number) {
    $form.actividades_grupos.splice(i, 1);
    $errors.actividades_grupos.splice(i, 1);
  };
</script>

<div class="required field">
  <label for="">Grupos asociados</label>

  {#if $form.actividades_grupos.length === 0 }
    <div class="ui five wide field tiny negative message">
      Ingrese al menos 1 Grupo
    </div>
  {/if}

  <div class="field">
    {#each $form.actividades_grupos as group, i}
      <div class="inline fields">
        <Select
          label="Grupo {i + 1}"
          name="actividades_grupos[{i}].new"
          bind:value={$form.actividades_grupos[i].new}
          error={$errors.actividades_grupos[i]?.new}
          options={groups.map(g => ({ val: g.id.toString(), name: `${g.id} - ${g.nombre}`}))}
          class="field"
        />
        <button type="button" class="ui red button" on:click={() => remove_group(i)}>
          Elminar
        </button>
      </div>
    {/each}

    <button type="button" class="ui blue button" on:click|preventDefault={add_group}>
      Agregar
    </button>
    {#if $form.actividades_grupos.length > 0}      
      <button type="button" class="ui red button" on:click={() => $form.actividades_grupos = []}>
        Limpiar
      </button>
    {/if}
  </div>
</div>

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    is_active={action.info !== ''}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al cargar los datos de la página, recargue 
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
