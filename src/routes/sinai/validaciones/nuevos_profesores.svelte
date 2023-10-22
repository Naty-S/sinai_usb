<!-- 
  Shows professors pedding to be validates.

  If Dean, displays all professors.
  If department chief, displays professor for that department.
 -->
<script lang="ts">
	import type { Department } from "$lib/interfaces/departments";
	import type { Profesor } from "$lib/interfaces/professors";

  import { onMount } from "svelte";
  
  import { goto } from "$app/navigation";
  import { page, session } from "$app/stores";

  import * as api from "$lib/api";

  import Modal from "$lib/components/modals/modal.svelte";

  let show_validate = false;
  let show_reject = false;
  let actual_prof_email = '';
  let actual_prof_name = '';
  let new_professors: Profesor[] = [];
  let action = { info: '', code: '' };
  let departments: Department[];

  $: user = $session.user;
  $: professor = user?.professor;
  $: validated = $page.url.searchParams.get("validado");

  // Fetch new professors data
  onMount(async () => {

    if (user?.dean || professor?.coord_chief) {

      const res = await api.get("/api/professors");
      const res2 = await api.get("/api/departments");

      if (res.ok && res2.ok) {
        
        const professors: Profesor[] = await res.clone().json();
        departments = await res2.clone().json();
        new_professors = professors.filter(p => !p.activo);

        if (professor?.coord_chief) {
          new_professors = professors.filter(p =>
            !p.activo && professor?.coord_chief?.departamentos.map(d => d.id).includes(p.departamento)
          );
        };
      } else {
        const { message, code } = await res.json();
        action.info = message;
        action.code = code;
      };
    } else {
      goto("/sinai");
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
        new: { profile: { activo: true } },
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
    const res = await api.del(`/api/professor/${actual_prof_email}`, {user: user?.email});

    show_reject = false;

    if (res.ok) {
      const { code, professor } = await res.json();
      action.code = code;
      action.info = professor;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const send_rejection_mail = function () {

    const msg = `Usted ha sido rechazado para ingresar al sistema del SINAI, por las siguientes
     razones ...

     Por favor vuelva a solicitar su ingreso en el siguiente link:
     https://www.sinai.did.usb.ve/sinai/registro
    `;
    const subject = "Rechazo solicitud ingreso al sistema del SINAI";

    window.location.href = "mailto:" + action.info
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(msg);

    location.reload();
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
          <div class="ui list">
            <div class="item">
              <i class="id badge icon"/>
              <div class="content">
                Nombres: {p.nombre1} {p.nombre2 ? p.nombre2 + ' ' : ''}
              </div>
            </div>
            <div class="item">
              <i class="id badge icon"/>
              <div class="content">
                Apellidos: {p.apellido1} {p.apellido2 ? p.apellido2 : ''}
              </div>
            </div>
            <div class="item">
              <i class="id card icon"/>
              <div class="content">
                Cédula: {p.cedula}.
              </div>
            </div>
            <div class="item">
              <i class="envelope icon"/>
              <div class="content">
                Correo: {p.correo}.
              </div>
            </div>
            <div class="item">
              <i class="id card icon"/>
              <div class="content">
                Departamento: {departments.find(d => d.id == p.departamento)?.nombre}.
              </div>
            </div>
            <div class="item">
              <i class="tag icon"/>
              <div class="content">
                Categoría: {p.categoria}.
              </div>
            </div>
            <div class="item">
              <i class="tag icon"/>
              <div class="content">
                Condición: {p.condicion}.
              </div>
            </div>
            <div class="item">
              <i class="tag icon"/>
              <div class="content">
                Dedicación: {p.dedicacion}.
              </div>
            </div>
            <div class="item">
              <i class="graduation cap icon"/>
              <div class="content">
                Último diploma: {p.diploma_tipo.replaceAll('_', '')}.
              </div>
            </div>
            <div class="item">
              <i class="university icon"/>
              <div class="content">
                Universidad donde lo obtuvo: {p.diploma_universidad}.
              </div>
            </div>
            <div class="item">
              <i class="searchengin icon"/>
              <div class="content">
                Líneas de investigación: {p.lineas_investigacion?.join(", ")}
              </div>
            </div>
            <div class="item">
              <i class="linkify icon"/>
              <div class="content">
                Página personal: {p.url || ''}
              </div>
            </div>
            <div class="item">
              <i class="orcid icon"/>
              <div class="list content">
                <div class="header">Perfil Orcid</div>
                <div class="item">
                  <i class="id badge icon"/>
                  id: {p.orcid_id || ''}
                </div>
                <div class="item">
                  <i class="user circle icon"/>
                  Link del perfil: {p.orcid_profile || ''}
                </div>
                <div class="item">
                  <i class="pen alternate icon"/>
                  Publicaciones: {p.orcid_posts?.join(", ") || ''}
                </div>
              </div>
            </div>
            <div class="item">
              <i class="google icon"/>
              <div class="list content">
                <div class="header">Perfil Google Schoolar</div>
                <div class="item">
                  <i class="id badge icon"/>
                  id: {p.google_schoolar_id || ''}
                </div>
                <div class="item">
                  <i class="user circle icon"/>
                  Link del perfil: {p.google_schoolar_profile || ''}
                </div>
                <div class="item">
                  <i class="pen alternate icon"/>
                  Publicaciones: {p.google_schoolar_posts?.join(", ") || ''}
                </div>
              </div>
            </div>
            <div class="item">
              <i class="researchgate icon"/>
              <div class="list content">
                <div class="header">Perfil Research Gate</div>
                <div class="item">
                  <i class="id badge icon"/>
                  id: {p.research_gate_id || ''}
                </div>
                <div class="item">
                  <i class="user circle icon"/>
                  Link del perfil: {p.research_gate_profile || ''}
                </div>
                <div class="item">
                  <i class="pen alternate icon"/>
                  Publicaciones: {p.research_gate_posts?.join(", ") || ''}
                </div>
              </div>
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
    pop_up={Boolean(validated)}
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
    pop_up={action.code === "rejected"}
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
    pop_up={show_validate}
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
    pop_up={show_reject}
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
{#if action.info !== '' && action.code !== "rejected"}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== '' && action.code !== "rejected"}
    close={() => location.replace($page.url.pathname)}
  >
    <p>
      Hubo un problema al intentar realizar la acción por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
