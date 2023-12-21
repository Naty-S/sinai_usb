<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    const user = session.user;
    const professor = user?.professor;

    if (professor) {
      const res = await fetch(`/api/prepraii/requests/${professor.id}`);
     
      if (res.ok) {
        const prepraii_requests = await res.json();
  
        return { props: { prepraii_requests } };
      };
  
      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar los datos de las solicitudes PREPRAII.\n ${code}. ${message}`),
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
	import type { prepraii_convocatoria } from "@prisma/client";
	import type { Activities } from "$lib/interfaces/activities";
	import type { PrepraiiRequest } from "$lib/interfaces/prepraii";
  import type { Activity } from "$lib/types/activities"

  import { onMount, setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { session, page } from "$app/stores";

  import * as api from "$lib/api";

  import { init } from "$lib/utils/forms/prepraii/request/init";
  import { validation } from "$lib/utils/forms/prepraii/request/validation";
  import { submit } from "$lib/utils/forms/prepraii/request/submit";

  import Notifications from "$lib/components/notifications.svelte";
  import Modal from "$lib/components/modals/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import ErrorMsg from "$lib/components/forms/error_msg.svelte";
  import Select from "$lib/components/forms/select.svelte";
	import Textarea from "$lib/components/forms/textarea.svelte";

  import KindInfo from "$lib/components/activities/kind_info.svelte";

  export let prepraii_requests: PrepraiiRequest[];

  const indexes = ["SCI Expanded", "AHCI", "SSCI", "SCOPUS", "SciELO", "Latindex catálogo 2.0"];
  const initialValues = init();
  const onSubmit = submit($session.user?.professor?.id, $page.url.pathname);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  let show_prepraii_form = false;
  let show_authors = false;
  let prepraii_confirm = false;
  let actual = false;
  let articles: Activity[] = [];
  let action = { info: '', code: '' };

  // const _handleSubmit = async function(e: any) {

  //   pop up confirm -> wait -> submit
  //   const s = await handleSubmit(e);

  // }

  onMount(async () => {
    const acts = await api.get(`/api/activities/professor/${$session.user?.professor?.id}`);
    const prep = await api.get("/api/prepraii/actual");

    if (acts.ok && prep.ok) {

      const activities: Activities = await acts.clone().json();
      const prepraii: prepraii_convocatoria = await prep.clone().json();

      if (prepraii) {

        actual = true;
        articles = activities.activities.filter(a => 
  
          (a.kind_name == "articulo_revista") &&
          ((new Date(prepraii.inicio)).getTime() <= (new Date(a.kind_data?.fecha_publicacion)).getTime() &&
           (new Date(a.kind_data?.fecha_publicacion)).getTime() <= (new Date(prepraii.fin)).getTime())
        );
      };
    } else {
      const { message, code } = await acts.json();
      const { message: msg2, code: code2 } = await prep.json();

      action.info = `${message}, ${msg2}`;
      action.code = `${code}, ${code2}`;
    };
  });

  setContext(key, { form, errors, handleChange });

  $: article = articles.find(a => a.id == $form.prepraii_solicitud.actividad);
  $: requested = Boolean($page.url.searchParams.get("prepraii_requested"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
  $: console.log($form.prepraii_profesores)
</script>

{#if actual}
  <button type="button" class="ui button" on:click={() => show_prepraii_form = !show_prepraii_form}>
    Nueva solicitud
  </button>
{:else}
  <Notifications header_msg="No hay una convocatoria activa actualmente" />
{/if}

{#if show_prepraii_form}
  <form id="prepraii_request_form" class="ui large form segment" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>

    <Select
      label="Actividad"
      name="prepraii_solicitud.actividad"
      bind:value={$form.prepraii_solicitud.actividad}
      options={articles.map(a => ({ val: a.id, name: a.titulo }))}
      class="field"
    />

    {#key $form.prepraii_solicitud.actividad}
      {#if article}
        <KindInfo activity={article.kind_data} kind="articulo_revista" />
        <a
          href="/sinai/actividades/modificar/articulo_revista/{article.id}" 
          class="ui green small button"
        >
          Modificar
        </a>
      {/if}
    {/key}

    <Select
      label="Índice"
      name="prepraii_solicitud.indice"
      bind:value={$form.prepraii_solicitud.indice}
      options={indexes.map(i => ({ val: i, name: i }))}
      class="field"
    />

    <div class="required field" class:error={$errors.prepraii_solicitud?.articulo}>
      <label for="prepraii_solicitud.articulo">Artículo</label>
      <input
        type="file"
        name="prepraii_solicitud.articulo"
        accept=".pdf"
        bind:value={$form.prepraii_solicitud.articulo}
        on:change={handleChange}
      />
      <ErrorMsg error={$errors.prepraii_solicitud?.articulo} />
    </div>

    {#key $form.prepraii_solicitud.actividad}
      {#if article}
        <h3 class="required field">Contratos y Constancias de los profesores</h3>

        <button type="button" class="ui button" on:click={() => {
          $form.prepraii_profesores = Array.from({ length: article.autores_usb.length }, _ => ({profesor: 0, contrato_constancia: []}));
          show_authors = true;
        }}>
          Agregar
        </button>

        {#if show_authors}
          {#each article.autores_usb as a, i}
            {#if a.profesor_id !== null}        
              <div class="required field" class:error={$errors.prepraii_profesores[i]?.contrato_constancia}>
                <label for="prepraii_profesores[{i}].contrato_constancia">
                  {a.nombre}
                </label>
                <input
                  type="file"
                  name="prepraii_profesores[{i}].contrato_constancia"
                  accept=".pdf"
                  bind:value={$form.prepraii_profesores[i].contrato_constancia}
                  on:change={(e) => {
                    
                    $form.prepraii_profesores[i].profesor = a.profesor_id;
                    // $form.prepraii_profesores.push({profesor: 0, contrato_constancia: []});

                    // // check, didnt work
                    // if(article.autores_usb.length - 1 == i &&
                    //   article.autores_usb.length < $form.prepraii_profesores.length
                    // ) {
                    //   $form.prepraii_profesores = $form.prepraii_profesores.filter(p => p.profesor != 0);
                    // };
                    
                    handleChange(e);
                  }}
                />
                <ErrorMsg error={$errors.prepraii_profesores[i]?.contrato_constancia} />
              </div>
            {/if}
          {/each}
        {/if}
      {/if}
    {/key}

    <Textarea
      label="Obervaciones"
      name="prepraii_solicitud.observaciones_profesor"
      bind:value={$form.prepraii_solicitud.observaciones_profesor}
      error={$errors.prepraii_solicitud?.observaciones_profesor}
      class="required field"
    />

    <ActionsButtons action="Solicitar" />
  </form>
{/if}

<h2>Estado de las Solicitudes</h2>

<div id="prepraii_requests" class="ui fluid styled accordion" uk-accordion="animation: false;">
  {#each prepraii_requests as pre}
    <section id="prepraii_request_{pre.id}">

      <div class="uk-accordion-title title">
        <div class="ui grid">
          <div class="ten wide column">
            {pre.Actividad.titulo}
          </div>
          <div class="six wide right aligned column">
            {pre.tipo ? "Tipo" + pre.tipo + '.' : ''}
            {pre.estado == "En_Revision" ? "En Revisión" : pre.estado}.
            {pre.pagada ? "Pagada." : ''}
          </div>
        </div>
      </div>

      <div class="uk-accordion-content">
        <div class="content">
          <div class="ui list">
            <div class="item">
              <i class="user tie icon"/>
              <div class="content">
                Evaluador: {`${pre.Evaluador.nombre1}, ${pre.Evaluador.apellido1}`}.
              </div>
            </div>
            <div class="item">
              <i class="mail icon"/>
              <div class="content">
                Correo: <a href="mailto:{pre.Evaluador.correo}">{pre.Evaluador.correo}</a>
              </div>
            </div>
            <div class="item">
              <i class="money bill wave icon"/>
              <div class="content">
                Monto: {pre.monto ? pre.monto + " Bs." : "Sin pagar"}
              </div>
            </div>
            <div class="item">
              <i class="comment icon"/>
              <div class="content">
                Comentario: {pre.comentario}
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  {/each}
</div>

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={location.reload}
  >
    <p>
      Hubo un problema al cargar los artículos, por favor recargue la página
      o contáctese con algún administrador proporcionando el código del error.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}

<!-- Pop up para confirmar que los datos son correctos (agregar a s1 novel tambien)
{#if prepraii_confirm}
  <Modal
    id="prepraii_coonfirm"
    title="PREPRAII"
    close_text="Ok"
    align="center"
    pop_up={prepraii_confirm}
    close={}
  >
    <p>¿Está seguro que los datos son correctos?</p>
  </Modal>
{/if} -->

{#if requested}
  <Modal
    id="prepraii_requested"
    title="PREPRAII"
    close_text="Ok"
    align="center"
    pop_up={requested}
    close={() => location.replace($page.url.pathname)}
  >
    <p>Solicitud exitosa!!!</p>
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
      Hubo un problema al intentar realizar la solicitud PREPRAII, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {err}</span>
  </Modal>
{/if}
