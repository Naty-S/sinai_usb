<script lang="ts">
  import type { activity_form_ctx, kinds } from "$types/forms";
  import type { Group } from "$interfaces/groups";

  import { getContext, onMount } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  import Select from "$components/forms/select.svelte";

  export let group_i: number = 0;

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);

  let groups: Group[] = [];

  onMount(async () => {
    const res = await fetch("/api/groups");

    try {      
      if (res.ok) {
        groups = await res.clone().json();
      };
    } catch (error) {      
      throw error;
    };
  });
</script>

<Select
  label="Grupo asociado"
  name="actividades_grupos[{group_i}].new"
  bind:value={$form.actividades_grupos[group_i].new}
  error={$errors.actividades_grupos[group_i].new}
  options={groups.map(g => ({ val: g.id.toString(), name: `${g.id} - ${g.nombre}`}))}
  class="field"
/>
