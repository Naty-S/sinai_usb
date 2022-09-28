<script lang="ts">
  import { session } from "$app/stores";
  
  import type { Activity } from "$types/activities";
  import type { YearActivities } from "$interfaces/activities";
  
  import { format_date } from "$utils/formatting";
  import Modal from "$components/modal.svelte";
  import KindInfo from "./kind_info.svelte";
  
  // Props
  export let activities: YearActivities;
  export let editable = false;

  $: user = $session.user;
  $: professor = user?.professor;
  $: is_chief = professor?.coord_chief || professor?.is_dep_representative || professor?.is_dep_chief;

  const can_validate = function (act: Activity) {
    return (user?.dean || (is_chief && user?.email !== act.creada_por));
  };

  const can_modify = function (act: Activity) {
    return user?.dean || !is_chief;
  };

  const can_delete = function (act: Activity) {
    return user?.dean || !is_chief;
  };

  let show_validate = false;
  let show_invalidate = false;
  let show_delete = false;
  let actual_act_id = -1;
  let actual_act_title = '';
  let success = { action: '' };

  const popup_validate = function (act_id: number, act_title: string) {
    show_validate = true;
    actual_act_id = act_id;
    actual_act_title = act_title;
  };

  const confirm_validate = async function () {
    try {      
      const res = await fetch(`/api/activities/validate/${actual_act_id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ validado_por: user?.email })
      });
  
      if (res.ok) {
        success = await res.clone().json();
        show_validate = false;
      };
    } catch (error) {      
      throw error;
    };
  };

  const popup_invalidate = function (act_id: number, act_title: string) {
    show_invalidate = true
    actual_act_id = act_id;
    actual_act_title = act_title;
  };

  const confirm_invalidate = async function () {
    try {      
      const res = await fetch(`/api/activities/invalidate/${actual_act_id}`, {
        method: "PATCH",
        credentials: "include"
      });
  
      if (res.ok) {
        success = await res.clone().json();
        show_invalidate = false;
      };
    } catch (error) {      
      throw error;
    };
  };

  const popup_delete = function (act_id: number, act_title: string) {
    show_delete = true;
    actual_act_id = act_id;
    actual_act_title = act_title;
  };

  const confirm_delete = async function () {
    try {      
      const res = await fetch(`/api/activities/delete/${actual_act_id}`, {
        method: "DELETE",
        credentials: "include"
      });
  
      if (res.ok) {
        success = await res.clone().json();
        show_delete = false;
      };
    } catch (error) {
      throw error;
    };
  };
</script>

<div id="{activities.year}_activities" class="uk-margin">
  <h2 class="ui blue header uk-text-center">
    Actividades Correspondientes al año {activities.year}
  </h2>
  
  {#each Object.entries(activities.kind_activities) as [kind, acts]}
  <!-- Display activities kind -->
    {#each acts as act}
      <h3>{kind}</h3>
  
      <ol class="ui items">
        <div class="item">
          <li>
            <div class="content">
              <strong>
                {act.autores_externos.length > 0 ? act.autores_externos.map(a => a.nombre).join("; ") + ';' : ''}
                {act.autores_usb.length > 0 ? act.autores_usb.map(a => a.nombre).join("; ") + '.' : ''}
              </strong>

              "{act.titulo}".

              <KindInfo activity={act.kind_info} kind={act.kind_name} />

              <span class="uk-text-emphasis">Realizada en el(los) Grupo(s)</span>:
              {act.groups.map(g => g.nombre).join(", ")}.

              <i><span class="ui blue text">
                {act.observaciones ? "Observaciones: " + act.observaciones + '.' : ''}
              </span></i>
      
              {#if user?.dean || is_chief}
                <span class="ui red text">
                  (Creada por {act.creada_por} el {format_date(act.fecha_creacion, "long-day")}).
                  {#if act.actions_log[0]}
                    (Modificado recientemente por {act.actions_log[0].professor}
                    el {format_date(act.actions_log[0].date, "long-day")}
                    a las {act.actions_log[0].time}).
                  {/if}
                  {#if act.validado_por && act.fecha_validacion}
                    (Validada por {act.validado_por} el {format_date(act.fecha_validacion, "long-day")}).
                  {/if}
                </span>
              {/if}
            </div>
            {#if editable}
              <div class="uk-margin-small">
                {#if can_modify(act)}
                  <a
                    href="/sinai/actividades/modificar/{act.kind_name}/{act.id}" 
                    class="ui green small button"
                  >
                    Modificar
                  </a>
                {/if}
                {#if can_validate(act)}
                  {#if !act.validado_por && !act.fecha_validacion}
                    <button
                      type="button"
                      class="ui blue small button"
                      on:click={() => popup_validate(act.id, act.titulo)}
                    >
                      Validar
                    </button>
                  {:else}
                    <button
                      type="button"
                      class="ui yellow small button"
                      on:click={() => popup_invalidate(act.id, act.titulo)}
                    >
                      Desvalidar
                    </button>
                  {/if}
                {/if}
                {#if can_delete(act)}
                  <button
                    type="button"
                    class="ui red small button"
                    on:click={() => popup_delete(act.id, act.titulo)}
                  >
                    Eliminar
                  </button>
                {/if}
              </div>
            {/if}
          </li>
        </div>
      </ol>
    {/each}
  {/each}
</div>

{#if show_validate}
  <Modal
    id="validate_{actual_act_id}"
    title="Validar Actividad"
    ok_text="Validar"
    align="center"
    is_active={show_validate}
    close={() => show_validate = false}
    confirm={confirm_validate}
  >
    <p>Esta seguro(a) que quiere VALIDAR esta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if}
{#if success.action === "Validated"}
  <Modal
    id="{actual_act_id}_validated"
    title="Validar Actividad"
    align="center"
    is_active={success.action === "Validated"}
    close_text="Cerrar"
    close={() => { success.action = ''; location.reload(); }}
  >
    <p>Actividad Validada con Exito !!!</p>
  </Modal>
{/if}

{#if show_invalidate}
  <Modal 
    id="invalidate_{actual_act_id}"
    title="Desvalidar Actividad"
    ok_text="Desvalidar"
    align="center"
    is_active={show_invalidate}
    close={() => show_invalidate = false}
    confirm={confirm_invalidate}
  >
    <p>Esta seguro(a) que quiere DESVALIDAR esta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if}
{#if success.action === "Invalidated"}
  <Modal
    id="{actual_act_id}_validated"
    title="Desvalidar Actividad"
    align="center"
    is_active={success.action === "Invalidated"}
    close_text="Cerrar"
    close={() => { success.action = ''; location.reload(); }}
  >
    <p>Actividad Desvalidada con Exito !!!</p>
  </Modal>
{/if}

{#if show_delete}
  <Modal 
    id="delete_{actual_act_id}"
    title="Eliminar Actividad"
    ok_text="Eliminar"
    align="center"
    is_active={show_delete}
    close={() => show_delete = false}
    confirm={confirm_delete}
  >
    <p>Esta seguro(a) que quiere ELIMINAR esta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if}
{#if success.action === "Deleted"}
  <Modal
    id="{actual_act_id}_deleted"
    title="Eliminar Actividad"
    align="center"
    is_active={success.action === "Deleted"}
    close_text="Cerrar"
    close={() => { success.action = ''; location.reload(); }}
  >
    <p>Actividad Eliminada con Exito !!!</p>
  </Modal>
{/if}
