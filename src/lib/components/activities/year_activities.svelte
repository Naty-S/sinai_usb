<!-- 
	@component
  Activities by year

  Props:
  * `year_activities`: YearActivities
  * `editable`: boolean (optional)
 -->
<script lang="ts">
  import type { Activity } from "$lib/types/activities";
  import type { YearActivities } from "$lib/interfaces/activities";
  
  import { session } from "$app/stores";
  
  import { format_date } from "$lib/utils/formatting";

  import * as api from "$lib/api";

  import Modal from "$lib/components/modals/modal.svelte";
  import KindInfo from "./kind_info.svelte";
  
  // Props
  export let year_activities: YearActivities;
  export let editable = false;

  const activities = Object.entries(year_activities.kind_activities);

  let pop_validate = false;
  let pop_invalidate = false;
  let pop_delete = false;
  let actual_act_id = -1;
  let actual_act_kind = '';
  let actual_act_title = '';
  let action = { info: '', code: '' };

  $: user = $session.user;
  $: professor = user?.professor;
  $: is_chief = professor?.is_dep_chief || professor?.is_dep_representative ||
                professor?.coord_chief || professor?.division_chief;

  const can_validate = function (act: Activity, kind: string) {
    return (user?.dean || (is_chief && user?.email !== act.creada_por)) && kind !== "ACTIVIDAD INVALIDA";
  };

  const can_modify = function (act: Activity, kind: string) {
    return user?.email === act.creada_por && kind !== "ACTIVIDAD INVALIDA";
  };

  const can_delete = function (act: Activity) {
    return user?.dean || (user?.email === act.creada_por);
  };

  const popup_validate = function (act_id: number, act_kind: string, act_title: string) {
    pop_validate = true;
    actual_act_id = act_id;
    actual_act_kind = act_kind;
    actual_act_title = act_title;
  };

  const confirm_validate = async function () {
    const res = await api.patch(`/api/activities/validate/${actual_act_id}`,
      { validado_por: user?.email, kind: actual_act_kind }
    );

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      pop_validate = false;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const popup_invalidate = function (act_id: number, act_kind: string, act_title: string) {
    pop_invalidate = true
    actual_act_id = act_id;
    actual_act_kind = act_kind;
    actual_act_title = act_title;
  };

  const confirm_invalidate = async function () {
    const res = await api.patch(`/api/activities/invalidate/${actual_act_id}`,
      { invalidado_por: user?.email, kind: actual_act_kind }
    );

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      pop_invalidate = false;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };

  const popup_delete = function (act_id: number, act_kind: string, act_title: string) {
    pop_delete = true;
    actual_act_id = act_id;
    actual_act_kind = act_kind;
    actual_act_title = act_title;
  };

  const confirm_delete = async function () {
    const res = await api.del(`/api/activities/delete/${actual_act_id}`,
      { user: user?.email, kind: actual_act_kind }
    );

    if (res.ok) {
      const { code } = await res.json();
      action.code = code;
      pop_delete = false;

    } else {
      const { message, code } = await res.json();
      action.info = message;
      action.code = code;
    };
  };
</script>

{#if activities.length > 0}
  <div
    id="{year_activities.year}_activities"
    class="uk-margin"
    style="scroll-margin: 225px;"
  >
    <h2 class="ui blue header uk-text-center">
      Actividades Correspondientes al año {year_activities.year}
    </h2>

    {#each activities as [kind, acts]}
    <!-- Display activities kind -->
      <h3 id="{year_activities.year}_{kind}" style="scroll-margin: 225px;">
        {kind}
      </h3>
      
      <ol class="ui items">
        {#each acts as act}
          <div class="item">
            <li>
              <div class="content">
                <strong class="authors">
                  {#if act.autores_usb.length > 0}
                    {#each act.autores_usb as a}
                      {#if user}
                        <a href="/sinai/actividades/profesor/{a.profesor_id}">
                          {a.nombre}
                        </a>
                      {:else}
                        {a.nombre}
                      {/if}
                    {/each}.
                  {/if}
                  {act.autores_externos.length > 0 ? act.autores_externos.map(a => a.nombre).join("; ") + '.' : ''}
                </strong>

                "{act.titulo}".

                <KindInfo activity={act.kind_data} kind={act.kind_name} />

                {#if act.groups.length > 0}
                  <span class="uk-text-emphasis">Realizada en el(los) Grupo(s)</span>:
                  {act.groups.map(g => g.nombre).join(", ")}.
                {/if}

                <i><span class="ui blue text">
                  {act.observaciones ? "Observaciones: " + act.observaciones + '.' : ''}
                </span></i>
        
                {#if user?.dean || is_chief}
                  <span class="ui red text">
                    (Creada por {act.creada_por} el {format_date(act.fecha_creacion, "long-day")}).
                    {#if act.validado_por && act.fecha_validacion}
                      (Validada por {act.validado_por} el {format_date(act.fecha_validacion, "long-day")}).
                    {/if}
                    {#if act.logs.length > 0}
                      (Modificado recientemente por
                        {act.logs[0].Usuario.profesor?.perfil || act.logs[0].Usuario.administrador?.nombre}
                        el {format_date(act.logs[0].fecha, "long-day")}
                        a las {format_date(act.logs[0].hora, "time")}
                      ).
                    {/if}
                  </span>
                {/if}
              </div>
              {#if editable}
                <div class="uk-margin-small">
                  {#if can_modify(act, kind)}
                    <a
                      href="/sinai/actividades/modificar/{act.kind_name}/{act.id}" 
                      class="ui green small button"
                    >
                      Modificar
                    </a>
                  {/if}
                  {#if can_validate(act, kind)}
                    {#if !act.validado_por && !act.fecha_validacion}
                      <button
                        type="button"
                        class="ui blue small button"
                        on:click={() => popup_validate(act.id, act.kind_name, act.titulo)}
                      >
                        Validar
                      </button>
                    {:else}
                      <button
                        type="button"
                        class="ui yellow small button"
                        on:click={() => popup_invalidate(act.id, act.kind_name, act.titulo)}
                      >
                        Desvalidar
                      </button>
                    {/if}
                  {/if}
                  {#if can_delete(act)}
                    <button
                      type="button"
                      class="ui red small button"
                      on:click={() => popup_delete(act.id, act.kind_name, act.titulo)}
                    >
                      Eliminar
                    </button>
                  {/if}
                </div>
              {/if}
            </li>
          </div>
        {/each}
      </ol>
    {/each}
  </div>
{/if}

<style>
.authors a:not(:last-of-type)::after {
  content: "; ";
}
</style>

{#if pop_validate}
  <Modal
    id="validate_{actual_act_id}"
    title="Validar Actividad"
    ok_text="Validar"
    align="center"
    pop_up={pop_validate}
    close={() => pop_validate = false}
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
    pop_up={action.code === "validated"}
    close_text="Cerrar"
    close={() => { action.code = ''; location.reload(); }}
  >
    <p>Actividad Validada con Éxito !!!</p>
  </Modal>
{/if}

{#if pop_invalidate}
  <Modal 
    id="invalidate_{actual_act_id}"
    title="Desvalidar Actividad"
    ok_text="Desvalidar"
    align="center"
    pop_up={pop_invalidate}
    close={() => pop_invalidate = false}
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
    pop_up={action.code === "invalidated"}
    close_text="Cerrar"
    close={() => { action.code = ''; location.reload(); }}
  >
    <p>Actividad Desvalidada con Éxito !!!</p>
  </Modal>
{/if}

{#if pop_delete}
  <Modal 
    id="delete_{actual_act_id}"
    title="Eliminar Actividad"
    ok_text="Eliminar"
    align="center"
    pop_up={pop_delete}
    close={() => pop_delete = false}
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
    pop_up={action.code === "deleted"}
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
    pop_up={action.info !== ''}
    close={() => location.reload()}
  >
    <p>
      Hubo un problema al intentar realizar la acción, por favor vuelva a intentar
      o contáctese con algún administrador.
    </p>
    <span class="ui red text">Detalles: {action.info}</span>
  </Modal>
{/if}
