<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  // https://kit.svelte.dev/docs/loading
  export const load: Load = async ({ fetch, params }) => {

    const res = await fetch(`/api/activities/modify/${params.activity}/${params.id}`);
   
    if (res.ok) {
      const activity_data = await res.json();

      return {
        props: {activity_data}
      };
    };

    const { message } = await res.json();
    return {
      error: new Error(message)
    };
  };
</script>
<script lang="ts">
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import type { kinds } from "$types/forms";
  import type { Activity } from "$types/activities";

  import { init } from "$lib/shared/forms/activities/init";
  import { validation } from "$lib/shared/forms/activities/validation";
  import { submit } from "$lib/shared/forms/activities/submit";

	import Modal from '$components/modal.svelte';

  import ArticuloRevista from "$components/activities/forms/articulo_revista.svelte";
	import CapituloLibro from "$components/activities/forms/capitulo_libro.svelte";
	import Composicion from "$components/activities/forms/composicion.svelte";
  import Evento from "$components/activities/forms/evento.svelte";
  import Exposicion from "$components/activities/forms/exposicion.svelte";
  import Grabacion from "$components/activities/forms/grabacion.svelte";
  import InformeTecnico from "$components/activities/forms/informe_tecnico.svelte";
  import Libro from "$components/activities/forms/libro.svelte";
  import Memoria from "$components/activities/forms/memoria.svelte";
  import Partitura from "$components/activities/forms/partitura.svelte";
  import Patente from "$components/activities/forms/patente.svelte";
  import Premio from "$components/activities/forms/premio.svelte";
  import PremioBienal from "$components/activities/forms/premio_bienal.svelte";
  import ProyectoGrado from "$components/activities/forms/proyecto_grado.svelte";
  import ProyectoInvestigacion from "$components/activities/forms/proyecto_investigacion.svelte";
  import Recital from "$components/activities/forms/recital.svelte";
  
  import ActionsButtons from "$components/forms/actions_buttons.svelte";
  import Authors from "$components/activities/forms/authors.svelte";
  import Groups from "$components/activities/forms/groups.svelte";
  import Observaciones from "$components/forms/observaciones.svelte";

  export let activity_data: Activity;

  const activity = $page.params.activity;
  const kind = activity as kinds;
  const initialValues = init(kind, activity_data);
  const onSubmit = submit(kind, true, $page.params.id);
  const validationSchema = validation(kind)
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });
</script>


<form class="ui large form" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>

  {#if activity === "articulo_revista"}
    <ArticuloRevista />
  {:else if activity === "capitulo_libro"}
    <CapituloLibro />
  {:else if activity === "composicion"}
    <Composicion />
  {:else if activity === "evento"}
    <Evento />
  {:else if activity === "exposicion"}
    <Exposicion />
  {:else if activity === "grabacion"}
    <Grabacion />
  {:else if activity === "informe_tecnico"}
    <InformeTecnico />
  {:else if activity === "libro"}
    <Libro />
  {:else if activity === "memoria"}
    <Memoria />
  {:else if activity === "partitura"}
    <Partitura />
  {:else if activity === "patente"}
    <Patente />
  {:else if activity === "premio"}
    <Premio />
  {:else if activity === "premio_bienal"}
    <PremioBienal />
  {:else if activity === "proyecto_grado"}
    <ProyectoGrado />
  {:else if activity === "proyecto_investigacion"}
    <ProyectoInvestigacion />
  {:else if activity === "recital"}
    <Recital />
  {:else}
    ERROR, actividad invalida
  {/if}

  <Groups /> <!-- no esta en: patentes ni premios -->
  <Authors />
  <Observaciones />
  <ActionsButtons action="Modificar" />
</form>

<!-- TODO: -->
<!-- {#if $form.creation_success}
  <Modal
    id="creation_success"
    title="Actividad creada con exito"
    ok_text="Ingresar"
    close_text="Ir a resumen"
    align="center"
    is_active={$form.creation_success}
    close={() => { $form.creation_success = false; goto(`/actividades/profesor/${professor}`)}}
  >
    <p>Desea ingresar otra actividad?</p>
  </Modal>
{/if} -->
