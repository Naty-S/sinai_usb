<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    const user = session.user;
    const professor = user?.professor;

    if (professor) {
      const res = await fetch(`/api/s1_novel/requests/${professor.id}`);
     
      if (res.ok) {
        // console.log(res)
        const s1_novel_requests = await res.json();
        // console.log("proyecto 2")
        // console.log(s1_novel_requests[2].proyecto)
        // console.log("proyecto 3")
        // const p = s1_novel_requests[0].proyecto
        // const pdata = p.data
        // const parray8 = new Uint8Array(pdata)
        // console.log(p)
        // console.log(parray8)
        // console.log(parray8.buffer)
        // console.log(new Blob([parray8.buffer], { type: "application/pdf" }))
        // console.log(new File([parray8.buffer], "download"), { type: "application/pdf" }) - File not defined
        // console.log("new blob")
        // const n = new Blob([s1_novel_requests[2].proyecto], { type: "application/pdf" })


        // const binaryString = atob(p);
        // const binaryLen = binaryString.length;
        // const bytes = new Uint8Array(binaryLen);
        // for (var i = 0; i < binaryLen; i++) {
        //   var ascii = binaryString.charCodeAt(i);
        //   bytes[i] = ascii;
        // }


        // // console.log("text")
        // // console.log(await n.text())
        // console.log("arrayBuffer")
        // console.log(await n.arrayBuffer())
        // const f = new FileReader()

  //       const bytes = new Uint8Array(59);

  // for (let i = 0; i < 59; i++) {
  //   bytes[i] = 32 + i;
  // }
        
        // s1_novel_requests[0].proyecto = new Blob([s1_novel_requests[0].proyecto], { type: "application/pdf" })
        // s1_novel_requests[1].proyecto = new Blob([s1_novel_requests[1].proyecto], { type: "application/pdf" })
        // s1_novel_requests[2].proyecto = new Blob([s1_novel_requests[2].proyecto], { type: "application/pdf" })
        // s1_novel_requests[0].proyecto = new Blob([bytes], { type: "application/pdf" })
        // s1_novel_requests[4].proyecto = new Blob([s1_novel_requests[4].proyecto], { type: "image/jpeg" })
  
        return {
          props: { s1_novel_requests }
        };
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
	import type { S1_request } from "$lib/interfaces/s1_novel";

  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { session, page } from "$app/stores";

  import { init } from "$lib/utils/forms/s1_novel/request/init";
  import { validation } from "$lib/utils/forms/s1_novel/request/validation";
  import { submit } from "$lib/utils/forms/s1_novel/request/submit";

  import Modal from "$lib/components/modals/modal.svelte";
  import ActionsButtons from "$lib/components/forms/actions_buttons.svelte";
  import ErrorMsg from "$lib/components/forms/error_msg.svelte";
  
	import BackupFiles from "$lib/components/forms/s1_novel/backup_files.svelte";

  export let s1_novel_requests: S1_request[];

  const initialValues = init();
  const onSubmit = submit($session.user?.professor?.id, $page.url.pathname);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  let show_s1_form = false;

  setContext(key, {
    form, errors, handleChange
  });

  $: requested = Boolean($page.url.searchParams.get("s1_requested"));
  $: err = $page.url.searchParams.get("error");
  $: err_code = $page.url.searchParams.get("code");
</script>

<button type="button" class="ui button" on:click={() => show_s1_form = true}>
  Nueva solicitud
</button>

{#if show_s1_form}
  <form id="s1_novel_request_form" class="ui large form segment" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>

    <div class="required field" class:error={$errors.proyecto}>
      <label for="proyecto">Archivo de especificación del Proyecto</label>
      <input
        type="file"
        name="proyecto"
        accept=".pdf"
        bind:value={$form.proyecto}
        on:change={handleChange}
      />
      <ErrorMsg error={$errors.proyecto} /> <!-- TODO: No lo muestra -->
    </div>
    
    <BackupFiles />

    <div class="required field" class:error={$errors.observaciones_profesor}>
      <label for="observaciones_profesor">Obervaciones:</label>
      <textarea
        name="observaciones_profesor"
        bind:value={$form.observaciones_profesor}
        on:change={handleChange}
        rows="5"
        cols="50"
        aria-label="Textarea"
      />
      <ErrorMsg error={$errors.observaciones_profesor} />
    </div>

    <ActionsButtons action="Solicitar" />
  </form>
{/if}

<h2>Estado de las Solicitudes</h2>

<div id="s1_novel_requests" class="ui fluid styled accordion" uk-accordion="animation: false;">
  {#each s1_novel_requests as s1}
    <section id="s1_novel_reuquest_{s1.id}">
      
      <div class="uk-accordion-title title">
        <div class="ui grid">
          <div class="ten wide column">
            Evaluador: {`${s1.Evaluador.nombre1}, ${s1.Evaluador.apellido1}`}.
          </div>
          <div class="six wide right aligned column">
            {s1.estado == "En_Revision" ? "En Revisión" : s1.estado}.
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
              <i class="file icon"/>
              <div class="content">
                Proyecto:
                <!-- <a href={URL.createObjectURL(s1.proyecto)}
                target=”_blank”
                > -->
                <!-- <a href={`data:application/pdf;base64,${s1.proyecto}`}
                target=”_blank”
                download = "download.pdf"
                > -->
                Ver/Descargar
                <!-- </a> -->
              </div>
            </div>
            <div class="item">
              <i class="users icon"/>
              <div class="content">
                <div class="">Jurado:</div>
                <ul class="ui items">
                  {#each s1.jurado_usb as ju}
                    <div class="item"><li>
                      {`${ju.Profesor.nombre1}, ${ju.Profesor.apellido1}`}: Ver/Descargar
                      <!-- {ju.veredicto} -->
                    </li></div>
                  {/each}
                  {#each s1.jurado_externo as je}
                    <div class="item"><li>
                      {je.nombre}: Ver/Descargar
                      <!-- {je.veredicto} -->
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
      Hubo un problema al intentar realizar la solicitud del S1 Novel, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {err}</span>
  </Modal>
{/if}
