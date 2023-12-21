<!-- 
	@component
  Observations activity section form
 -->
<script lang="ts">
  import type { activity_form_ctx, kinds } from "$lib/types/forms";

  import { getContext } from "svelte";
  import { key } from "svelte-forms-lib";
  import { page } from "$app/stores";

	import Textarea from "$lib/components/forms/textarea.svelte";

  const param = $page.params.activity;
  const kind = param as kinds;
  const { form, errors }: activity_form_ctx<typeof kind> = getContext(key);
</script>

<Textarea
  label="Observaciones"
  name="actividad.observaciones"
  bind:value={$form.actividad.observaciones}
  error={$errors.actividad.observaciones}
  class="field"
/>
