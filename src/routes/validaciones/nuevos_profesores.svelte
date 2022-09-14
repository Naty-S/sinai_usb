<script lang="ts">
  import { onMount } from "svelte";

  import type { profesor } from "@prisma/client";

  import Modal from "$components/modal.svelte";

  let show_validate = false;
  let show_reject = false;
  let actual_prof_id = -1;
  let actual_prof_name = '';
  let success = { action: '' };
  let new_professors: profesor[] = [];

  onMount(async () => {
    const res = await fetch("/api/professors");

    try {      
      if (res.ok) {
        const res_json = await res.clone().json();
        new_professors = res_json.filter((p: profesor) => !p.confirmado || !p.activo);
      };
    } catch (error) {      
      throw error;
    };
  });

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
        activo: true,
        confirmado: true
      })
    });

    try {      
      if (res.ok) {
        success = await res.clone().json();
        show_validate = false;
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
      credentials: "include"
    });

    try {      
      if (res.ok) {
        success = await res.clone().json();
        show_reject = false;
      };
    } catch (error) {      
      throw error;
    };
  };
</script>

Lista con los profesores sin validar

if Dean => todos
else if coordinador => los de su dpto
else => no puede entrar aqui

Acciones
- Validar
- Eliminar/Rechazado

<div id="new_professors" class="ui fluid styled accordion" uk-accordion="multiple: true">
  {#each new_professors as p}
    <div id="new_professor_{p.id}">
      <div class="uk-accordion-title title">
        <div class="ui grid">
          <div class="ten wide column">
            {p.perfil}. C.I: {p.cedula}
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
          Confirmado: {p.confirmado}. Activo: {p.activo}
        </div>
      </div>      
    </div>
  {/each}
</div>

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
