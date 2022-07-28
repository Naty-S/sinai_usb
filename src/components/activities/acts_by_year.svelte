<script lang="ts">
  import type { YearActivities } from "$types/db/actividades";
  
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
    ]
</script>

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
            <a href="/api/actividades/[id]/validar">[Validar]</a>
            <a href="/api/actividades/[id]/validar">[Desvalidar]</a>
            <a href="/api/actividades/[id]/eliminar">[Eliminar]</a>
          </div>
        </li>
      </div>
    </ol>
  {/each}
{/each}
