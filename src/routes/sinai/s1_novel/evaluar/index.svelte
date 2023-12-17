<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    const user = session.user;
    const professor = user?.professor;

    if (professor?.coord_chief) {
      const res = await fetch(`/api/s1_novel/evals/${professor.id}`);
     
      if (res.ok) {
        const requests = await res.json();
  
        return {
          props: { requests }
        };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar los datos de las solicitudes.\n ${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como Coordinador."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
	import type { S1_eval } from "$lib/interfaces/s1_novel";
  
  import { createForm } from "svelte-forms-lib";

  import { page } from "$app/stores";

  import * as api from "$lib/api";

  import { init } from "$lib/utils/forms/s1_novel/decision/init";
  import { validation } from "$lib/utils/forms/s1_novel/decision/validation";
  import { submit } from "$lib/utils/forms/s1_novel/decision/submit";

  import Modal from "$lib/components/modals/modal.svelte";

	import Decision from "$lib/components/forms/s1_novel/decision.svelte";
	import Jury from "$lib/components/forms/s1_novel/jury.svelte";

  export let requests: S1_eval[];

  let s1_novel = 0;
  let jury = false;
  let decision = false;
  let jury_usb = [];
  let jury_out = [];
  let action = { info: '', code: '' };
  let form;

  const d = async function(id: number) {
    const res = await api.get(`/api/s1_novel/jury/${id}`);

    if (res.ok) { 
      
      const jury = await res.clone().json();
      jury_usb = jury.jurado_usb;
      jury_out = jury.jurado_externo;

      const initialValues = init(jury_usb, jury_out);
      const onSubmit = submit(id, $page.url.pathname);
      const validationSchema = validation();
      const formProps = { initialValues, onSubmit, validationSchema };
      form = createForm(formProps);

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };

    decision = true;
    jury = false;
  };

  $: jury_assingned = Boolean($page.url.searchParams.get("jury_assingned"));
  $: decision_made = Boolean($page.url.searchParams.get("decision_made"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
</script>

<h2>Solicitudes</h2>

<div class="ui middle aligned divided list">
  {#each requests as r}    
    <div class="item">
      <div class="right floated content">
        {#if r.estado == "En_Revision"}
          {#if r.jurado_usb.length > 0 || r.jurado_externo.length > 0}
            <button type="button" class="ui button" on:click={() => d(r.id)}>
              Tomar Decisión
            </button>
          {:else}
            <button type="button" class="ui button" on:click={() => {s1_novel = r.id; jury = true; decision = false}}>
              Asignar Jurado
            </button>
          {/if}
        {:else}
          {r.estado}
        {/if}
      </div>
      <div class="content">
        Profesor solicitante: {`${r.Profesor.nombre1}, ${r.Profesor.apellido1}`}.
        <!-- Proyecto: ver/descargar {r.proyecto} -->

        {#if r.jurado_usb.length > 0 || r.jurado_externo.length > 0}
          <div class="medium header">USB:</div>
          <div class="ui horizontal list">
            {#each r.jurado_usb as j_usb}
              <div class="item">
                <i class="user tie icon"/>
                <div class="content">
                  <div class="header">{`${j_usb.Profesor.nombre1}, ${j_usb.Profesor.apellido1}`}</div>
                  <div class="description">{j_usb.Profesor.correo}</div>
                </div>
              </div>
            {/each}
          </div>
          <div class="medium header">Externos:</div>
          <div class="ui horizontal list">
            {#each r.jurado_externo as j_e}
              <div class="item">
                <i class="user tie icon"/>
                <div class="content">
                  <div class="header">{j_e.nombre}</div>
                  <div>{j_e.universidad || ''}</div>
                  <div>{j_e.correo || ''}</div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/each}

  {#if jury}
    <Jury {s1_novel} />
  {/if}
  {#if decision}
    <Decision {action} {jury_usb} {jury_out} f={form} />
  {/if}
</div>

{#if jury_assingned}
  <Modal
    id="s1_novel_jury_assingned"
    title="S1 Novel"
    close_text="Ok"
    align="center"
    pop_up={jury_assingned}
    close={() => location.replace($page.url.pathname)}
  >
    <p>Jurado asignado con éxito!!!</p>
  </Modal>
{/if}

{#if decision_made}
  <Modal
    id="s1_novel_decision_made"
    title="S1 Novel"
    close_text="Ok"
    align="center"
    pop_up={decision_made}
    close={() => location.replace($page.url.pathname)}
  >
    <p>Evaluación realizada con éxito!!!</p>
  </Modal>
{/if}

{#if err}
  <Modal
    id="error"
    title="Error. {err_code}"
    close_text="Ok"
    align="center"
    pop_up={Boolean(err)}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la acción, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {err}</span>
  </Modal>
{/if}
