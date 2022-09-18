<script lang="ts">
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { page, session } from "$app/stores";

  import type { kinds } from "$types/forms";

  import { init } from "$lib/shared/forms/activities/init";
  import { validation } from "$lib/shared/forms/activities/validation";
  import { submit } from "$lib/shared/forms/activities/submit";

  import ActivityForm from "$components/forms/activity.svelte";

  const activity = $page.params.activity;
  const kind = activity as kinds;
  const initialValues = init(kind, $session.user);
  const onSubmit = submit(kind);
  const validationSchema = validation(kind);
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });
</script>

<ActivityForm {handleSubmit} {handleReset} {activity} action="Crear"/>
