<!-- 
  Shows professors pedding to be validates.

  If Dean, displays all professors.
  If department chief, displays professor for that department.
 -->
<script lang="ts">
  import { onMount } from "svelte";

  import type { profesor } from "@prisma/client";

  import { page, session } from "$app/stores";
  import { goto } from "$app/navigation";

  import * as api from "$lib/api";

  import Modal from "$lib/components/modal.svelte";

  
  let show_validate = false;
  let show_reject = false;
  let actual_prof_email = '';
  let actual_prof_name = '';
  let new_professors: profesor[] = []; // includes Departamento: {nombre: string} from prisma relation
  let action = { info: '', code: '' };

  $: user = $session.user;
  $: validated = $page.url.searchParams.get("validado");

  // Fetch new professors data
  onMount(async () => {
    const res = await api.get("/api/professors");

    if (res.ok) {
      const professors = await res.clone().json();
      new_professors = professors.filter((p: profesor) => !p.activo && (p.id !== 0));

      if (user?.professor) {
        
        new_professors = professors.filter((p: profesor) => !p.activo && (p.id !== 0) &&
          user?.professor?.coord_chief?.departments.includes(p.departamento)
        );
      };
    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  });

  const popup_validate = function (prof_email: string, prof_name: string) {
    show_validate = true;
    actual_prof_email = prof_email;
    actual_prof_name = prof_name;
  };

  const confirm_validate = async function () {
    const res = await api.patch(`/api/professor/${actual_prof_email}`,
      {
        new: { activo: true },
        pathname: $page.url.pathname
      }
    );

    show_validate = false;

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const popup_reject = function (prof_email: string, prof_name: string) {
    show_reject = true;
    actual_prof_email = prof_email;
    actual_prof_name = prof_name;
  };

  const confirm_reject = async function () {
    const res = await api.del(`/api/professor/${actual_prof_email}`);

    show_reject = false;

    if (res.ok) {
      const { action, professor } = await res.json();
      action.code = action;
      action.info = professor;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const send_rejection_mail = function () {

    const msg = `Usted ha sido rechazado para ingresar al sistema del SIANI, por las siguientes
     razones ...

     Por favor vuelva a solicitar su ingreso en el siguiente link:
     https://www.did.usb.ve/sinai/registro
    `;
    const subject = "Rechazo solicitud ingreso al sistema del SINAI";

    window.location.href = "mailto:" + action.code
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(msg);

    location.replace($page.url.pathname);
  };
</script>

<h2>Lista de profesores pendientes por validar</h2>

<div id="new_professors" class="ui fluid styled accordion" uk-accordion="animation: false;">
  {#each new_professors as p}
    <section id="new_professor_{p.id}">
      
      <div class="uk-accordion-title title">
        <div class="ui grid">
          <div class="ten wide column">
            {p.perfil}.
          </div>
          <div class="six wide right aligned column">
            <button
              type="button"
              class="ui primary small button"
              on:click={() => popup_validate(p.correo, p.perfil)}
            >
              Validar
            </button>
            <button
              type="button"
              class="ui negative small button"
              on:click={() => popup_reject(p.correo, p.perfil)}
            >
              Rechazar
            </button>
          </div>
        </div>
      </div>
      
      <div class="uk-accordion-content">
        <div class="content">
          <div class="ui centered grid container">
            <div class="two column row">
              <div class="column">
                <strong>Nombres:</strong> {p.nombre1} {p.nombre2 ? p.nombre2 + ' ' : ''}
              </div>
              <div class="column">
                <strong>Apellidos:</strong> {p.apellido1} {p.apellido2 ? p.apellido2 + ' ' : ''}
              </div>
            </div>
            <div class="two column row">
              <div class="column"><strong>Cédula:</strong> {p.cedula}</div>
              <div class="column"><strong>Correo:</strong> {p.correo}</div>
            </div>
            <div class="three column row">
              <div class="column"><strong>Categoría:</strong> {p.categoria}</div>
              <div class="column"><strong>Condición:</strong> {p.condicion}</div>
              <div class="column"><strong>Dedicación:</strong> {p.dedicacion}</div>
            </div>
            <div class="two column row">
              <div class="column">
                <strong>Último diploma:</strong> {p.diploma_tipo.replaceAll('_', '')}
              </div>
              <div class="column">
                <strong>Universidad donde lo obtuvo:</strong> {p.diploma_universidad}
              </div>
            </div>
            <div class="one column row">
              <div class="column">
                <strong>Departamento:</strong> {p.Departamento.nombre}
              </div>
            </div>
            <div class="one column row">
              <div class="column">
                <strong>Líneas de investigación:</strong>
                {p.lineas_investigacion.join(", ")}
              </div>
            </div>
            <div class="one column row">
              <div class="column"><strong>URL:</strong> {p.url ? p.url : ''}</div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  {/each}
</div>

{#if validated}
  <Modal
    id="validated_{validated}"
    title="Validar Profesor"
    close_text="Ok"
    align="center"
    is_active={Boolean(validated)}
    close={() => location.replace($page.url.pathname)}
  >
  <p>Profesor <span class="ui primary text">"{validated}"</span></p>
  <p>Validado con éxito!!!</p>
  </Modal>
{/if}
{#if action.code === "rejected"}
  <Modal
    id="rejected_{action.info}"
    title="Rechazar Profesor"
    close_text="Ok"
    align="center"
    is_active={action.code === "rejected"}
    close={send_rejection_mail}
  >
  <p>Profesor <span class="ui primary text">"{action.info}"</span>, RECHAZADO!!!</p>
  </Modal>
{/if}
{#if show_validate}
  <Modal
    id="validate_{actual_prof_email}"
    title="Validar Profesor"
    ok_text="Validar"
    align="center"
    is_active={show_validate}
    close={() => show_validate = false}
    confirm={confirm_validate}
  >
    <p>Está seguro(a) que quiere VALIDAR a este Profesor?</p>
    <span class="ui primary text">"{actual_prof_name}"</span>
  </Modal>
{/if}
{#if show_reject}
  <Modal
    id="validate_{actual_prof_email}"
    title="Rechazar Profesor"
    ok_text="Rechazar"
    align="center"
    is_active={show_reject}
    close={() => show_reject = false}
    confirm={confirm_reject}
  >
    <p><span class="ui large red text">
      Ésta acción eliminara de forma permanente al Profesor del sistema!!!
    </span></p>
    <p>Está seguro(a) que quiere RECHAZAR a este Profesor?</p>
    <span class="ui primary text">"{actual_prof_name}"</span>
  </Modal>
{/if}
{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    is_active={action.info !== ''}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la acción por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
