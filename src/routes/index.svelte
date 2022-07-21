<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {    
    const res = await fetch("/api/actividades/eduardo@usb.ve");
   
    if (res.ok) {
      const actividades = await res.json();

      return {
        props: {actividades}
      }
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
};
</script>

<script lang="ts">
  import type { Actividades } from "src/types/actividades";
	// import type { Actividades } from '$root/types/actividades';

  export let actividades: Actividades[];
</script>


<div class="uk-container uk-container-center">
  <h3>Actividades</h3>
  <ul uk-tab data-uk-tab="connect: #acts">
    {#each actividades as act}
      <li><a href="/">{act.year}</a></li>
    {/each}
  </ul>
  <ul id="acts" class="uk-switcher">
    {#each actividades as act}
      <li>
        <ul uk-tab data-uk-tab="connect: #act_kind">
          {#each Object.entries(act.acts) as [kind, _acts]}
            <li><a href="/">{kind} <span class="uk-badge">{_acts.length}</span></a></li>
          {/each}
        </ul>
        <ul id="act_kind" class="uk-switcher">
          {#each Object.entries(act.acts) as [_, k_acts]}
            <li>
              {#each k_acts as a}
                <ul uk-accordion uk->
                  <li>
                    <a href="/" class="uk-accordion-title" data-uk-tab="conect: #act_{a.id}">
                      {a.titulo}
                    </a>
                    <div id="act_{a.id}" class="uk-accordion-content">
                      {#each Object.entries(a) as [key, value]}
                        {#if key !== "kind_name" && key !== "kind_info"}
                          {#if key !== "titulo" && key !== "id"}
                            <p>{key.replaceAll('_', ' ')} : {value ? value : ''}</p>
                          {/if}
                        {:else if key !== "kind_name"}
                          {#each Object.entries(value) as [info_key, info_value]}
                            {#if info_key !== "actividad"}
                              <p>
                                {info_key.replaceAll('_', ' ')} :
                                {info_value ? info_value : ''}
                              </p>
                            {/if}
                          {/each}
                        {/if}
                      {/each}
                      <!-- {#each Object.entries(a) as [key, value]}
                        {#if key !== "kind_name" && key !== "kind_info"}
                          {#if key !== "titulo" && key !== "id"}
                            <p>{key.replaceAll('_', ' ')} : {value ? value : ''}</p>
                          {/if}
                        {:else if key !== "kind_name"}
                          {#each Object.entries(value.info) as [kind_key, info_value]}
                            {#if kind_key !== "actividad"}
                              <p>
                                {kind_key.replaceAll('_', ' ')} :
                                {kind_value ? kind_value : ''}
                              </p>
                            {/if}
                          {/each}
                        {/if}
                      {/each} -->
                    </div>
                  </li>
                </ul>
              {/each}
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</div>
