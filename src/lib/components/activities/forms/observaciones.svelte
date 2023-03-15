<script lang="ts">
  import type { activity_form_ctx, kinds } from "$types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

  import ErrorMsg from "$lib/components/forms/error_msg.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors, handleChange }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<div class="field">
  <label for="actividad.observaciones">Observaciones</label>
  <textarea
    name="actividad.observaciones"
    rows="4"
    bind:value={$form.actividad.observaciones}
    on:change={handleChange}
  />
  <ErrorMsg error={$errors.actividad.observaciones} />
</div>
