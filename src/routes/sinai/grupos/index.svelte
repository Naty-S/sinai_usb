<!-- 
  List all research groups.
 -->
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, session }) => {

    if (session.user?.dean || session.user?.professor?.coord_chief?.id === 4) {
      const res = await fetch("/api/groups");
    
      if (res.ok) {
        const groups = await res.json();

        return {
          props: { groups }
        };
      };

      const { message, code } = await res.json();
      return {
        error: new Error(`Error al cargar los grupos.\n${code}. ${message}`),
        status: 500
      };
    } else {
      return {
        error: new Error("Acceso denegado. Uso exclusivo de la Coordinación de Integración e Información."),
        status: 401
      };
    };
  };
</script>
<script lang="ts">
  import type { GroupE } from "$lib/interfaces/groups";
  
  export let groups: GroupE[];
</script>

<h2>Lista de Grupos de Investigación</h2>

<div id="groups" class="ui fluid styled accordion" uk-accordion="animation: false;">
  {#each groups as g}
    <section id="group_{g.id}">
      
      <div class="uk-accordion-title title">
        <div class="ui grid">
          <div class="ten wide column">
            {g.nombre}.
          </div>
          <div class="six wide right aligned column">
            <button
              type="button"
              class="ui primary small button disabled"
            >
              Modificar
            </button>
          </div>
        </div>
      </div>
      
      <div class="uk-accordion-content">
        <div class="content">
          <div class="ui list">
            <div class="item">
              <i class="id badge icon"/>
              <div class="content">
                Jefe:
                <a href="/sinai/actividades/profesor/{g.chief.id}">
                  {g.chief.name1} {g.chief.surname1}
                </a>
              </div>
            </div>
            <div class="item">
              <i class="list alternate icon"/>
              <div class="content">
                Integrantes ({g.members.length}):
                <ol class="ui items">
                  {#each g.members as member}
                    <div class="item"><li>
                      <a href="/sinai/actividades/profesor/{member.id}">
                        {member.name1} {member.surname1}
                      </a>
                    </li></div>
                  {/each}
                </ol>
              </div>
            </div>
            <div class="item">
              <i class="clipboard icon"/>
              <div class="content">
                Nro. actividades: {g.n_activities}.
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  {/each}
</div>
