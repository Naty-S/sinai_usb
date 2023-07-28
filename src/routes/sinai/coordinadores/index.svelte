<!-- 
  Lists & Updates Coordinations chiefs.
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean) {
      const res1 = await fetch("/api/coordinators");
      const res2 = await fetch("/api/professors");

      if (res1.ok && res2.ok) {
        const chiefs = await res1.json();
        const profs: profesor[] = await res2.json();

        const professors = profs.filter(p => p.activo && p.id !== 0).map(p => ({
            email: p.correo
          , profile: p.perfil
        }));

        return {
          props: { chiefs, professors }
        };
      };

      const { message: msg1, code: code1 } = await res1.json();
      const { message: msg2, code: code2 } = await res2.json();
      return {
        error: new Error(`Error al cargar los datos de:\nCoordinadores: ${code1}. ${msg1}\n\
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
	import type { profesor } from "@prisma/client";
  import type { Professor } from "$lib/interfaces/professors";

  import * as api from "$lib/api";

	import Modal from '$lib/components/modals/modal.svelte';

  export let chiefs: Professor[];
  export let professors: { email: string, profile: string }[];

  let chief: string;
  let coord: number;
  let show_modify = false;
  let ok_text = "Modificar";
  let close_text = "Cancelar";
  let action = { info: '', code: '' };

  const toggle_modify = function (modify: boolean, _chief: string, _coord: number) {
    show_modify = modify;
    chief = _chief;
    coord = _coord;
  };

  const modify_coord = async function () {
    const res = await api.patch("/api/coordinators", { chief, coord });

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
  {#each chiefs as c}
    <div class="ui clearing segment">
      <h3 class="ui blue header">
        Coordinación {c.coordination.nombre}
      </h3>

      {c.name} {c.surname}
      
      <button
        type="button"
        class="ui right floated primary small button"
        on:click={() => toggle_modify(true, c.email, c.coordination.id)}
      >
        Modificar
      </button>
    </div>
  {/each}
</div>

{#if show_modify}  
  <Modal
    id="modify_coord"
    title="Modificar Coordinador"
    {ok_text}
    {close_text}
    align="center"
    pop_up={show_modify}
    close={() => { show_modify = false; location.reload(); }}
    confirm={modify_coord}
  >
  {#if action.code === "Coord Chief Modified"}
    Coordinador modificado con éxito!!!
  {:else}
    <div class="ui centered container">
      <select
        id="search-select"
        name="chief"
        class="ui fluid search selection dropdown"
        bind:value={chief}
      >
        {#each professors.map(p => ({ val: p.email, name: p.profile })) as opt}
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
      Hubo un error al intentar cambiar de Coordinador, por favor vuelva a intentar
      o contáctese con algún administrador proporcionando el código de error y detalles.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
