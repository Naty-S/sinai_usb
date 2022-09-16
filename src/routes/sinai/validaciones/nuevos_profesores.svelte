<script lang="ts">
  import { onMount } from "svelte";

  import type { profesor } from "@prisma/client";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import Modal from "$components/modal.svelte";

  let show_validate = false;
  let show_reject = false;
  let actual_prof_id = -1;
  let actual_prof_name = '';
  let new_professors: profesor[] = [];

  onMount(async () => {
    const res = await fetch("/api/professors");

    try {      
      if (res.ok) {
        const res_json = await res.clone().json();
        new_professors = res_json.filter((p: profesor) => !p.activo);
      };
    } catch (error) {      
      throw error;
    };
  });

  $: validated = Boolean($page.url.searchParams.get("validado"));
  $: rejected = Boolean($page.url.searchParams.get("rechazado"));

  const popup_validate = function (prof_id: number, prof_name: string) {
    show_validate = true;
    actual_prof_id = prof_id;
    actual_prof_name = prof_name;
  };

  const confirm_validate = async function () {
    const res = await fetch(`/api/professor/${actual_prof_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new: {
          activo: true,
        },
        url: $page.url
      })
    });

    try {      
      if (res.ok) {
        show_validate = false;
        goto(res.url);
      };
    } catch (error) {      
      throw error;
    };
  };

  const popup_reject = function (prof_id: number, prof_name: string) {
    show_reject = true;
    actual_prof_id = prof_id;
    actual_prof_name = prof_name;
  };

  const confirm_reject = async function () {
    const res = await fetch(`/api/professor/${actual_prof_id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: $page.url
      })
    });

    try {      
      if (res.ok) {
        show_reject = false;
        goto(res.url);
      };
    } catch (error) {      
      throw error;
    };
  };

  const send_rejection_mail = function () {

    const msg = `Usted ha sido rechazado para ingresar al sistema del SIANI, por las siguientes
     razones ...

     Por favor vuelva a solicitar su ingreso en el siguiente link:
     https://www.did.usb.ve/sinai/registro
    `;
    const subject = "Rechazo solicitud ingreso al sistema del SINAI";

    window.location.href = "mailto:12-11250@usb.ve"
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(msg);

    location.replace($page.url.pathname);
  };
</script>

<h2>Lista de profesores pendientes por validar</h2>

if Dean => todos
else if coordinador => los de su dpto
else => no puede entrar aqui

<div id="new_professors" class="ui fluid styled accordion" uk-accordion="multiple: false">
  {#each new_professors as p}
    <div id="new_professor_{p.id}">
      <div class="uk-accordion-title title">
        <div class="ui grid">
          <div class="ten wide column">
            {p.perfil}. ({p.activo ? "Activo" : "No Activo"} - {p.confirmado ? "Confirmado" : "No Confirmado"})
          </div>
          <div class="six wide right aligned column">
            <button class="ui blue small button" on:click={() => popup_validate(p.id, p.perfil)}>
              Validar
            </button>
            <button class="ui red small button" on:click={() => popup_reject(p.id, p.perfil)}>
              Rechazar
            </button>
          </div>
        </div>
      </div>
      <div class="uk-accordion-content">
        <div class="content">
          Nombres: {p.nombre1}{p.nombre2 ? p.nombre2 + ' ' : ''}.
          Apellidos: {p.apellido1}{p.apellido2 ? p.apellido2 + ' ' : ''}.
          Cedula: {p.cedula}. Correo: {p.correo}.
          Categoria: {p.categoria}.
          Condicion: {p.condicion}.
          Dedicacion: {p.dedicacion}.
          Ultimo diploma: {p.diploma_tipo.replaceAll('_', '')}.
          Universidad donde lo obtuvo: {p.diploma_universidad}.
          Departamento: {p.departamento}.
          Lineas de investigacion: {p.lineas_investigacion}.
          URL: {p.url ? p.url : ''}.
        </div>
      </div>      
    </div>
  {/each}
</div>

{#if validated}
  <Modal
    id="validated_{actual_prof_id}"
    title="Validar Profesor"
    close_text="Ok"
    align="center"
    is_active={validated}
    close={() => location.replace($page.url.pathname)}
  >
  <p>Profesor "{actual_prof_name}"</p>
  <p>Validado con exito!!!</p>
  </Modal>
{/if}
{#if rejected}
  <Modal
    id="rejected_{actual_prof_id}"
    title="Rechazar Profesor"
    close_text="Ok"
    align="center"
    is_active={rejected}
    close={send_rejection_mail}
  >
  <p>Profesor "{actual_prof_name}", RECHAZADO!!!</p>
  </Modal>
{/if}
{#if show_validate}
  <Modal
    id="validate_{actual_prof_id}"
    title="Validar Profesor"
    ok_text="Validar"
    align="center"
    is_active={show_validate}
    close={() => show_validate = false}
    confirm={confirm_validate}
  >
    <p>Esta seguro(a) que quiere VALIDAR a este Profesor?</p>
    <p>"{actual_prof_name}"</p>
  </Modal>
{/if}
{#if show_reject}
  <Modal
    id="validate_{actual_prof_id}"
    title="Rechazar Profesor"
    ok_text="Rechazar"
    align="center"
    is_active={show_reject}
    close={() => show_reject = false}
    confirm={confirm_reject}
  >
    <p><span class="ui large red text">
      Esta accion eliminara de forma permanente al Profesor del sistema!!!
    </span></p>
    <p>Esta seguro(a) que quiere RECHAZAR a este Profesor?</p>
    <p>"{actual_prof_name}"</p>
  </Modal>
{/if}
