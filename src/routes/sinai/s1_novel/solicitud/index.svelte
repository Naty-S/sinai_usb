<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    const user = session.user;
    const professor = user?.professor;

    if (professor) {
      const res = await fetch(`/api/s1_novel/requests/${professor.id}`);
     
      if (res.ok) {
        const requests = await res.json();
          
        return { props: { requests } };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar los datos de las solicitudes S1 Novel.\n ${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Inicie sesión como profesor."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
	import type { S1Request } from "$lib/interfaces/s1_novel";

  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { session, page } from "$app/stores";

	import { base64_to_blob } from "$lib/utils/conversions";
	import { format_date } from "$lib/utils/formatting";

  import * as api from "$lib/api";

  import { init } from "$lib/utils/forms/s1_novel/request/init";
  import { validation } from "$lib/utils/forms/s1_novel/request/validation";
  import { submit } from "$lib/utils/forms/s1_novel/request/submit";

  import Modal from "$lib/components/modals/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import ErrorMsg from "$lib/components/forms/error_msg.svelte";
  import Textarea from "$lib/components/forms/textarea.svelte";
	import Input from "$lib/components/forms/input.svelte";

	import BackupFiles from "$lib/components/forms/s1_novel/backup_files.svelte";

  export let requests: S1Request[];

  const initialValues = init();
  const onSubmit = submit($session.user?.professor?.id, $page.url.pathname);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset, isSubmitting } = createForm(formProps);

  let show_s1_form = false;
  let pop_delete = false;
  let actual_s1_id = -1;
  let action = { info: '', code: '' };

  const popup_delete = function (s1_id: number) {
    pop_delete = true;
    actual_s1_id = s1_id;
  };

  const confirm_delete = async function() {
    const res = await api.del(`/api/s1_novel/request/${actual_s1_id}`, {});

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      pop_delete = false;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  setContext(key, {
    form, errors, handleChange, isSubmitting
  });

  $: requested = Boolean($page.url.searchParams.get("s1_requested"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
</script>

<h2>Solicitar S1 Novel</h2>

<button type="button" class="ui button" on:click={() => show_s1_form = !show_s1_form}>
  {#if show_s1_form}
    Cancelar
  {:else}
    Nueva solicitud
  {/if}
</button>

{#if show_s1_form}
  <form id="s1_novel_request_form" class="ui large form segment"
    on:submit|preventDefault={handleSubmit}
    on:reset={handleReset}
  >

    <Input
      type="date"
      label="Fecha de la Solicitud"
      name="fecha_solicitud"
      bind:value={$form.fecha_solicitud}
      error={$errors.fecha_solicitud}
      class="required field"
    />
    <div class="required field" class:error={$errors.proyecto}>
      <label for="proyecto">Archivo de especificación del Proyecto</label>
      <input
        type="file"
        name="proyecto"
        accept=".pdf"
        bind:value={$form.proyecto}
        on:change={handleChange}
      />
      <ErrorMsg error={$errors.proyecto} />
    </div>
    
    <BackupFiles />

    <Textarea
      label="Obervaciones"
      name="observaciones_profesor"
      bind:value={$form.observaciones_profesor}
      error={$errors.observaciones_profesor}
      class="required field"
    />

    <ActionsButtons action="Solicitar" />
  </form>
{/if}

<h3>Solicitudes Realizadas</h3>

<div id="s1_novel_requests" class="ui fluid styled accordion" uk-accordion="animation: false;">
  {#each requests as s1}
    <section id="s1_novel_request_{s1.id}">
      
      <div class="uk-accordion-title title">
        <div class="ui three column grid">
          <div class="column">
            Evaluador: {`${s1.Evaluador.nombre1}, ${s1.Evaluador.apellido1}`}.
          </div>
          <div class="center aligned column">
            Solicitado el: {format_date(s1.fecha_solicitud, "long-day")}
          </div>
          <div class="right aligned column">
            {s1.estado == "En_Revision" ? "En Revisión" : s1.estado}.

            {#if s1.estado == "En_Revision" && s1.jurado_usb.length == 0 && s1.jurado_externo.length == 0}              
              <button type="button" class="ui negative small button" on:click={() => popup_delete(s1.id)}>
                Eliminar
              </button>
            {/if}
          </div>
        </div>
      </div>
      
      <div class="uk-accordion-content">
        <div class="content">
          <div class="ui list">
            <div class="item">
              <i class="mail icon"/>
              <div class="content">
                Correo: <a href="mailto:{s1.Evaluador.correo}">{s1.Evaluador.correo}</a>
              </div>
            </div>
            <div class="item">
              <i class="comment icon"/>
              <div class="content">
                Comentario: {s1.comentario}
              </div>
            </div>
            <div class="item">
              <i class="file pdf icon"/>
              <div class="content">
                Proyecto:
                <a href={URL.createObjectURL(base64_to_blob(s1.proyecto))} target=”_blank”>
                  Ver/Descargar
                </a>
              </div>
            </div>
            <div class="item">
              <i class="folder open icon"/>
              <div class="content">
                <div class="">Soportes:</div>
                <ol class="ui items">
                  {#each s1.soportes as s}
                    <div class="item"><li><a href={URL.createObjectURL(base64_to_blob(s))} target=”_blank”>
                      Ver/Descargar
                    </a></li></div>
                  {/each}
                </ol>
              </div>
            </div>
            <div class="item">
              <i class="users icon"/>
              <div class="content">
                <div class="">Jurado:</div>
                <ul class="ui items">
                  {#each s1.jurado_usb as ju}
                    <div class="item"><li>
                      {`${ju.Profesor.nombre1}, ${ju.Profesor.apellido1}`}: 
                      <a href={URL.createObjectURL(base64_to_blob(ju.veredicto))} target=”_blank”>
                        Ver/Descargar
                      </a>
                    </li></div>
                  {/each}
                  {#each s1.jurado_externo as je}
                    <div class="item"><li>
                      {je.nombre}: 
                      <a href={URL.createObjectURL(base64_to_blob(je.veredicto))} target=”_blank”>
                        Ver/Descargar
                      </a>
                    </li></div>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  {/each}
</div>

{#if requested}
  <Modal
    id="s1_novel_requested"
    title="S1 Novel"
    close_text="Ok"
    align="center"
    pop_up={requested}
    close={() => location.replace($page.url.pathname)}
  >
    <p>Solicitud exitosa!!!</p>
  </Modal>
{/if}

{#if pop_delete}
  <Modal 
    id="delete_{actual_s1_id}"
    title="Eliminar S1 Novel"
    ok_text="Eliminar"
    align="center"
    pop_up={pop_delete}
    close={() => pop_delete = false}
    confirm={confirm_delete}
  >
    <p>Está seguro(a) que quiere ELIMINAR ésta solicitud?</p>
  </Modal>
{/if}
{#if action.code === "s1_deleted"}
  <Modal
    id="{actual_s1_id}_deleted"
    title="Eliminar S1 Novel"
    align="center"
    pop_up={action.code === "s1_deleted"}
    close_text="Cerrar"
    close={() => { action.code = ''; location.reload(); }}
  >
    <p>Solicitud S1 Novel Eliminada con Éxito !!!</p>
  </Modal>
{/if}

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code ?? "Desconocido"}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={() => location.reload()}
  >
    <p>
      Hubo un problema al intentar realizar la acción, por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info ?? "No se encuentra en la lista de errores conocidos"}</span>
  </Modal>
{/if}

{#if err}
  <Modal
    id="error"
    title="Error. {err_code ?? "Desconocido"}"
    close_text="Ok"
    align="center"
    pop_up={Boolean(err)}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la solicitud del S1 Novel, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {err ?? "No se encuentra en la lista de errores conocidos"}</span>
  </Modal>
{/if}
