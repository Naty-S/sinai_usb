<script lang="ts">
  import { session } from "$app/stores";
  
  import type { Activity } from "$lib/types/activities";
  import type { YearActivities } from "$lib/interfaces/activities";
  
  import { format_date } from "$utils/formatting";
  
  import * as api from "$lib/api";

  import Modal from "$lib/components/modal.svelte";
  import KindInfo from "./kind_info.svelte";
  
  // Props
  export let year_activities: YearActivities;
  export let editable = false;

  const activities = Object.entries(year_activities.kind_activities);

  let show_validate = false;
  let show_invalidate = false;
  let show_delete = false;
  let actual_act_id = -1;
  let actual_act_title = '';
  let action = { info: '', code: '' };

  $: user = $session.user;
  $: professor = user?.professor;
  $: is_chief = professor?.coord_chief || professor?.is_dep_representative || professor?.is_dep_chief;

  const can_validate = function (act: Activity) {
    return (user?.dean || (is_chief && user?.email !== act.creada_por));
  };

  const can_modify = function () {
    return user?.dean || !is_chief;
  };

  const can_delete = function () {
    return user?.dean || !is_chief;
  };

  const popup_validate = function (act_id: number, act_title: string) {
    show_validate = true;
    actual_act_id = act_id;
    actual_act_title = act_title;
  };

  const confirm_validate = async function () {
    const res = await api.patch(`/api/activities/validate/${actual_act_id}`,
      { validado_por: user?.email }
    );

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      show_validate = false;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const popup_invalidate = function (act_id: number, act_title: string) {
    show_invalidate = true
    actual_act_id = act_id;
    actual_act_title = act_title;
  };

  const confirm_invalidate = async function () {
    const res = await api.patch(`/api/activities/invalidate/${actual_act_id}`, null);

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      show_invalidate = false;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const popup_delete = function (act_id: number, act_title: string) {
    show_delete = true;
    actual_act_id = act_id;
    actual_act_title = act_title;
  };

  const confirm_delete = async function () {
    const res = await api.del(`/api/activities/delete/${actual_act_id}`);

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      show_delete = false;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };
</script>

{#if activities.length > 0}
  <div id="{year_activities.year}_activities" class="uk-margin">
    <h2 class="ui blue header uk-text-center">
      Actividades Correspondientes al año {year_activities.year}
    </h2>
    
    {#each activities as [kind, acts]}
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
                  {#if can_modify()}
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
                  {#if can_delete()}
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
{/if}

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
    <p>Está seguro(a) que quiere VALIDAR ésta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if}
{#if action.code === "validated"}
  <Modal
    id="{actual_act_id}_validated"
    title="Validar Actividad"
    align="center"
    is_active={action.code === "validated"}
    close_text="Cerrar"
    close={() => { action.code = ''; location.reload(); }}
  >
    <p>Actividad Validada con Éxito !!!</p>
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
{#if action.code === "invalidated"}
  <Modal
    id="{actual_act_id}_invalidated"
    title="Desvalidar Actividad"
    align="center"
    is_active={action.code === "invalidated"}
    close_text="Cerrar"
    close={() => { action.code = ''; location.reload(); }}
  >
    <p>Actividad Desvalidada con Éxito !!!</p>
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
    <p>Está seguro(a) que quiere ELIMINAR ésta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if}
{#if action.code === "deleted"}
  <Modal
    id="{actual_act_id}_deleted"
    title="Eliminar Actividad"
    align="center"
    is_active={action.code === "deleted"}
    close_text="Cerrar"
    close={() => { action.code = ''; location.reload(); }}
  >
    <p>Actividad Eliminada con Éxito !!!</p>
  </Modal>
{/if}

{#if action.info !== ''}
  <Modal
    id="error"
    title="Error. {action.code}"
    close_text="Ok"
    align="center"
    is_active={action.info !== ''}
    close={() => location.reload()}
  >
    <p>
      Hubo un problema al intentar realizar la acción por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
