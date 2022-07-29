<script lang="ts">
  import type { YearActivities } from "$types/db/actividades";
  
  import Modal from "$components/modal.svelte";
  import { format_date, match_kind_to_title } from "$utils/index";
  import KindInfo from "./kind_info.svelte";
  
  // Props
  export let activities: YearActivities;

  const groups_acts =
    [ "articulos_revistas"
    , "capitulos_libros"
    , "eventos"
    , "informes_tecnicos"
    , "libros"
    , "memorias"
    , "proyectos_grado"
    , "proyectos_investigacion"
    ];

  let show_validate = false;
  // let show_invalidate = false;
  let show_delete = false;
  let actual_act_id = -1;
  let actual_act_title = '';

  const _validate = (act_id: number, act_title: string) => {
    show_validate = true;
    actual_act_id = act_id;
    actual_act_title = act_title;
    // validate in db
  };

  /* const _invalidate = (act_id: number, act_title: string) => {
    show_invalidate = true
    actual_act_id = act_id;
    actual_act_title = act_title;
    // invalidate in db
  }; */

  const _delete = (act_id: number, act_title: string) => {
    show_delete = true;
    actual_act_id = act_id;
    actual_act_title = act_title;
    // delete in db
  };

</script>

<div id="{activities.year}_activities">
  <h2 class="uk-text-center">
    Actividades Correspondientes al año {activities.year}
  </h2>
  
  {#each Object.entries(activities.acts) as [kind, acts]}
  <!-- Display activities kind -->
    {#each acts as act}
      <h3>{match_kind_to_title(kind, act.kind_info)}</h3>
  
      <ol class="ui items">
        <div class="item">
          <li>
            <div class="content">
              <strong>autor1; autor2</strong>.
              "{act.titulo}".
              <KindInfo activity={act.kind_info} kind={act.kind_name} />
              {#if groups_acts.includes(kind)}
                <span class="uk-text-emphasis">Realizada en el Grupo</span>: act.group.name.
              {/if}
              <i>{act.observaciones ? "Observaciones: " + act.observaciones : ''}</i>
      
              <!-- TODO: #16 ... -->
              <span class="uk-text-emphasis">Creada por</span>: {act.creada_por} el {format_date(act.fecha_creacion)}
              <span class="uk-text-emphasis">Ultima modificacion</span>: act.modificacion
              {act.validado_por ? "Validada por: " + act.validado_por : ''}
      
              <!-- TODO: #16 ... -->
              <a href="/api/actividades/[id]/modificar">[Modificar]</a>
              <button
                class="ui blue small button"
                on:click="{() => _validate(act.id, act.titulo)}"
              >
                Validar
              </button>
              <!-- Shown in kms
              <button
                class="ui yellow small button"
                on:click="{() => _invalidate(act.id, act.titulo)}">
                  Desvalidar
              </button> -->
              <button
                class="ui red small button"
                on:click="{() => _delete(act.id, act.titulo)}"
              >
                Eliminar
              </button>
            </div>
          </li>
        </div>
      </ol>
    {/each}
  {/each}
</div>

{#if show_validate}
  <Modal
    title="Validar Actividad"
    id={actual_act_id}
    ok_text="Validar"
    close="{() => show_validate = false}"
    is_active={show_validate}
  >
    <p>Esta seguro(a) que quiere VALIDAR esta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if}

<!-- {#if show_invalidate}
  <Modal 
    title="Desvalidar Actividad"
    id={actual_act_id}
    ok_text="Desvalidar"
    close="{() => show_invalidate = false}"
    is_active={show_invalidate}
  >
    <p>Esta seguro(a) que quiere DESVALIDAR esta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if} -->

{#if show_delete}
  <Modal 
    title="Eliminar Actividad"
    id={actual_act_id}
    ok_text="Eliminar"
    close="{() => show_delete = false}"
    is_active={show_delete}
  >
    <p>Esta seguro(a) que quiere ELIMINAR esta actividad?</p>
    <p>"{actual_act_title}"</p>
  </Modal>
{/if}
