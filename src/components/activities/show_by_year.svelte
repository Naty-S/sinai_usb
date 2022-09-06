<script lang="ts">
  import { goto, invalidate } from "$app/navigation";
  import { page } from "$app/stores";
  
  import type { YearActivities } from "$interfaces/activities";
  
  import { format_date } from "$utils/formatting";
  import Modal from "$components/modal.svelte";
  import KindInfo from "./kind_info.svelte";
  
  // Props
  export let activities: YearActivities;
  export let editable = false;

  let show_validate = false;
  // let show_invalidate = false;
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
    const res = await fetch(`/api/activities/validate/${actual_act_id}`, {
      method: "POST",
      credentials: 'include'
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

  /* const popup_invalidate = function (act_id: number, act_title: string) {
    show_invalidate = true
    actual_act_id = act_id;
    actual_act_title = act_title;
  }; */

  const popup_delete = function (act_id: number, act_title: string) {
    show_delete = true;
    actual_act_id = act_id;
    actual_act_title = act_title;
  };

  const confirm_delete = async function () {
    const res = await fetch(`/api/activities/delete/${actual_act_id}`, {
      method: "DELETE",
      credentials: 'include'
    });

    try {      
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
              {#each act.autores_externos as author}
                <strong>{author.nombre}</strong>,
              {/each}
              {#each act.autores_usb as author}
                <strong>{author.nombre}</strong>,
              {/each}
              .
              "{act.titulo}".

              <KindInfo activity={act.kind_info} kind={act.kind_name} />

              <span class="uk-text-emphasis">Realizada en el Grupo</span>: act.group.name.

              <i><span class="ui blue text">
                {act.observaciones ? "Observaciones: " + act.observaciones : ''}
              </span></i>
      
              <!-- TODO: #16 ... -->
              <span class="uk-text-emphasis">Creada por</span>: {act.creada_por} el 
                {format_date(act.fecha_creacion, true)}.

              <span class="uk-text-emphasis">Ultima modificacion</span>:
                {format_date(act.fecha_ultima_modificacion, true)}.

              {#if act.validado_por && act.fecha_validacion}
                <span class="uk-text-emphasis">Validada por</span>: {act.validado_por}.
                <span class="uk-text-emphasis">Fecha validacion</span>: {format_date(act.fecha_validacion, true)}.
              {/if}

            </div>
            {#if editable}
              <div class="uk-margin-small">
                <!-- TODO: #16 ... -->
                <a href="/api/activities/update_[id]">[Modificar]</a>
                <!-- if act.creada_por !== current_user && !act.fecha_validacion &&
                  !act.validado_por => can validate -->
                {#if !act.validado_por && !act.fecha_validacion}
                  <button
                    class="ui blue small button"
                    on:click={() => popup_validate(act.id, act.titulo)}
                  >
                    Validar
                  </button>
                {/if}
                <!-- Shown in kms, act.validado_por && act.fecha_validacion
                <button
                  class="ui yellow small button"
                  on:click={() => popup_invalidate(act.id, act.titulo)}>
                    Desvalidar
                </button> -->
                <button
                  class="ui red small button"
                  on:click={() => popup_delete(act.id, act.titulo)}
                >
                  Eliminar
                </button>
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

<!-- {#if show_invalidate}
  <Modal 
    id="invalidate_{actual_act_id}"
    title="Desvalidar Actividad"
    ok_text="Desvalidar"
    align="center"
    is_active={show_invalidate}
    close={() => show_invalidate = false}
    confirm={() => {  }}
  >
    <p>Esta seguro(a) que quiere DESVALIDAR esta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if} -->

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
