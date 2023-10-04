<!-- 
  Lists & Updates Deparments chiefs and representatives.
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean) {
      const res1 = await fetch("/api/departments_chiefs");
      const res2 = await fetch("/api/professors");

      if (res1.ok && res2.ok) {

        const deps_chiefs = await res1.json();
        const profesors: Profesor[] = await res2.json();
        const professors = profesors.filter(p => p.activo);;

        return {
          props: { deps_chiefs, professors }
        };
      };

      const { message: msg1, code: code1 } = await res1.json();
      const { message: msg2, code: code2 } = await res2.json();
      return {
        error: new Error(`Error al cargar los datos de:\Jefes y Representantes: ${code1}. ${msg1}\n\
          Profesores: ${code2}. ${msg2}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Uso exclusivo del Decano."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
	import type { Profesor } from "$lib/interfaces/professors";
  import type { DepartmentE } from "$lib/interfaces/departments";

  import * as api from "$lib/api";

	import Modal from '$lib/components/modals/modal.svelte';

  export let deps_chiefs: DepartmentE[];
  export let professors: Profesor[];

  let chief: string;
  let rep: string;
  let dep: number;
  let pop_modify_chief = false;
  let pop_modify_rep = false;
  let ok_text = "Modificar";
  let close_text = "Cancelar";
  let action = { info: '', code: '' };

  const toggle_modify_chief = function (modify: boolean, _chief: string, _dep: number) {
    pop_modify_chief = modify;
    chief = _chief;
    dep = _dep;
  };

  const toggle_modify_rep = function (modify: boolean, _rep: string, _dep: number) {
    pop_modify_rep = modify;
    rep = _rep;
    dep = _dep;
  };

  const modify_chief = async function () {
    const res = await api.patch("/api/departments_chiefs", { chief, dep });

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      ok_text='';
      close_text="Ok";

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const modify_rep = async function () {
    const res = await api.patch("/api/departments_chiefs", { rep, dep });

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      ok_text='';
      close_text="Ok";

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };
</script>

<h2>Lista de Coordinadores</h2>

<div class="ui divider" />

<div class="ui segments">
  {#each deps_chiefs as d}
    <div class="ui segment">
      <h3 class="ui blue header">
        Departamento {d.nombre}
      </h3>
      <div class="ui clearing segment">
        <strong>Jefe:</strong> {d.chief.name1} {d.chief.surname1}
        <button
          type="button"
          class="ui right floated primary small button"
          on:click={() => toggle_modify_chief(true, d.chief.email, d.id)}
        >
          Modificar
        </button>
      </div>
      <div class="ui clearing segment">
        <strong>Representante:</strong> {d.rep.name1} {d.rep.surname1}
        <button
          type="button"
          class="ui right floated primary small button"
          on:click={() => toggle_modify_rep(true, d.rep.email, d.id)}
        >
          Modificar
        </button>
      </div>
    </div>
  {/each}
</div>

{#if pop_modify_chief}  
  <Modal
    id="modify_chief"
    title="Modificar Jefe"
    {ok_text}
    {close_text}
    align="center"
    pop_up={pop_modify_chief}
    close={() => { pop_modify_chief = false; location.reload(); }}
    confirm={modify_chief}
  >
  {#if action.code === "Dep Chief Modified"}
    Jefe modificado con éxito!!!
  {:else}
    <div class="ui centered container">
      <select
        id="search-select"
        name="chief"
        class="ui fluid search selection dropdown"
        bind:value={chief}
      >
        {#each professors.map(p => ({ val: p.correo, name: p.perfil })) as opt}
          <option value={opt.val}>{opt.name}</option>
        {/each}
      </select>
    </div>
  {/if}
  </Modal>
{/if}

{#if pop_modify_rep}  
  <Modal
    id="modify_rep"
    title="Modificar Representante"
    {ok_text}
    {close_text}
    align="center"
    pop_up={pop_modify_rep}
    close={() => { pop_modify_rep = false; location.reload(); }}
    confirm={modify_rep}
  >
  {#if action.code === "Dep Rep Modified"}
    Representante modificado con éxito!!!
  {:else}
    <div class="ui centered container">
      <select
        id="search-select"
        name="rep"
        class="ui fluid search selection dropdown"
        bind:value={rep}
      >
        {#each professors.map(p => ({ val: p.correo, name: p.perfil })) as opt}
          <option value={opt.val}>{opt.name}</option>
        {/each}
      </select>
    </div>
  {/if}
  </Modal>
{/if}

{#if action.info !== ''}  
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    pop_up={action.info !== ''}
    close={() => { action.info = ''; location.reload(); }}
  >
    <p>
      Hubo un error al intentar cambiar la mesa técnica, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
