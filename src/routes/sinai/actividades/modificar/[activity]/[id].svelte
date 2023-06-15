<!-- 
	Modify activity form page
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, session }) => {

    if (session.user) {

      const res = await fetch(`/api/activities/modify/${params.activity}/${params.id}`);
     
      if (res.ok) {
        const activity_data = await res.json();
  
        return {
          props: { activity_data }
        };
      };
  
      const { message } = await res.json();
      return {
        error: new Error("Error al cargar los datos de la actividad a modificar.\n" + message),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Por favor inicie sesión"),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { page, session } from "$app/stores";

  import type { kinds } from "$lib/types/forms";
  import type { Activity } from "$lib/types/activities";

  import { init } from "$lib/utils/forms/activities/init";
  import { validation } from "$lib/utils/forms/activities/validation";
  import { submit } from "$lib/utils/forms/activities/submit";

  import ActivityForm from "$lib/components/forms/activity.svelte";

  export let activity_data: Activity;

  const activity = $page.params.activity;
  const kind = activity as kinds;
  const initialValues = init(kind, $session.user, activity_data);
  const onSubmit = submit(kind, true, $page.params.id);
  const validationSchema = validation(kind)
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });
</script>

<ActivityForm {handleSubmit} {handleReset} {activity} action="Modificar"/>
