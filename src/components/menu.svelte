<script>
  import Modal from "$components/modal.svelte";

  const void_link = "javascript:void(0)";
  const entity = "profesor/eduardo@usb.ve";
  const bra = "/BRA/profesor/eduardo@usb.ve";
  const coord = "/actividades/coordinacion/2";
  const dep = "/actividades/departamento/2";
  const division = "/actividades/division/1";

  const groups = [1, 2];
  const dep_chief_rep = true;

  let show_create = false;
</script>

<nav class="uk-navbar uk-margin uk-navbar-container" uk-navbar="mode: click">
  <div class="uk-navbar-center">
    <div class="">SINAI - DID</div>
    <!-- TODO: #19 -->
    <div class="">nombre prof (dpto name)</div>

    <a href={void_link} class="uk-navbar-toggle uk-navbar-toggle-animate" uk-navbar-toggle-icon>
      Menu
    </a>
    
    <div class="uk-navbar-dropdown uk-position-z-index">
      <ul class="uk-nav uk-navbar-dropdown-nav">

        <li name="activities">
          <a href={void_link} class="uk-active">
            Actividades <span uk-navbar-parent-icon></span>
          </a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="/actividades/{entity}">Resumen</a></li>
              <li><a href={void_link} on:click={() => show_create = true}>Ingresar</a></li>
            </ul>
          </div>
        </li>

        <li class="uk-nav-divider" />

        <li name="consultations">
          <a href={void_link}>
            Consultas <span uk-navbar-parent-icon></span>
          </a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href={void_link}>Públicas</a></li>
              <li><a href={void_link}>Predeterminadas</a></li>
            </ul>
          </div>
        </li>

        <li class="uk-nav-divider" />

        <li name="views">
          <a href={void_link}>
            Vistas <span uk-navbar-parent-icon></span>
          </a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href={bra}>BRA</a></li>
              {#if dep_chief_rep}
                <li><a href={dep}>Departamento</a></li>
              {/if}
              <li><a href={coord}>Coordinacion</a></li>
              <li><a href={division}>Division</a></li>
              
              <!-- TODO: desired use cases -->
              <li><a href={void_link}>Personal</a></li>
              <li><a href={void_link}>Referencias Puras</a></li>
              <li><a href={void_link}>Certificación PEII</a></li>
              
              <li class="uk-nav-divider" />
              
              <li>
                <!-- TODO: desired use cases -->
                <a href={void_link}>
                  Constancias <span uk-navbar-parent-icon></span>
                </a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li><a href={void_link}>Proyectos</a></li>
                    <li><a href={void_link}>Grupos</a></li>
                  </ul>
                </div>
              </li>

              <li class="uk-nav-divider" />
              
              <li>
                <!-- TODO: desired use cases -->
                <a href={void_link}>
                  Evaluaciones <span uk-navbar-parent-icon></span>
                </a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li><a href={void_link}>S2 Prueba</a></li>
                    <li><a href={void_link}>S2</a></li>
                    <li><a href={void_link}>GID</a></li>
                  </ul>
                </div>
              </li>
              
              <li class="uk-nav-divider" />
              
              <li>
                <a href={void_link}>
                  Mis Grupos <span uk-navbar-parent-icon></span>
                </a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    {#each groups as g}
                      <li><a href="/actividades/grupo/{g}">GID {g}</a></li>
                    {/each}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        
        <li class="uk-nav-divider" />

        <li name="options">
          <a href={void_link}>
            Opciones <span uk-navbar-parent-icon></span>
          </a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href={void_link}>Cambiar Contraseña</a></li>
              <li><a href={void_link}>Cambiar Perfil</a></li>
            </ul>
          </div>
        </li>
        
        <li class="uk-nav-divider" />
        
        <li><a href={void_link}>Ayuda</a></li>
        
        <li class="uk-nav-divider" />
        
        <li><a href={void_link}>Salir</a></li>
      </ul>
    </div>
  </div>
</nav>

{#if show_create}
  <Modal
    title="Ingresar nueva actividad"
    id={0}
    close={() => show_create = false}
    is_active={show_create}
  >
    <li><a href="/actividades/crear/">Artículos en Revistas</a></li>
    <li><a href="/actividades/crear/">Asistencia a Eventos</a></li>
    <li><a href="/actividades/crear/">Memorias de Congresos</a></li>
    <li><a href="/actividades/crear/">Proyectos de Investigación y Desarrollo</a></li>
    <li><a href="/actividades/crear/">Recitales o Conciertos Arbitrados</a></li>
    <li><a href="/actividades/crear/">Composiciones solicitadas por Orquestas Sinfónicas o Agrupaciones Reconocidas</a></li>
    <li><a href="/actividades/crear/">Grabaciones Sonoras Evaluadas por Arbitros</a></li>
    <li><a href="/actividades/crear/">Partituras, Videos o CDs publicados en editoriales reconocidas</a></li>
    <li><a href="/actividades/crear/">Selección en Exposiciones, Bienales, Salones o Concursos Arbitrados</a></li>
    <li><a href="/actividades/crear/">Trabajos Reconocidos o Premiados en Bienales, Salones, Concursos o Exposiciones</a></li>
    <li><a href="/actividades/crear/">Libros Publicados</a></li>
    <li><a href="/actividades/crear/">Capítulos de Libros</a></li>
    <li><a href="/actividades/crear/">Informes Técnicos</a></li>
    <li><a href="/actividades/crear/">Premios</a></li>
    <li><a href="/actividades/crear/">Patentes</a></li>
    <li><a href="/actividades/crear/">Proyectos de Grado Dirigidos</a></li>
  </Modal>
{/if}
