<script>
  import Modal from "$components/modal.svelte";

  let show_create = false;
</script>

<nav class="uk-navbar uk-margin uk-navbar-container" uk-navbar="mode: click">
  <div class="uk-navbar-center">
    <div class="">SINAI - DID</div>
    <!-- TODO: #19 -->
    <div class="">nombre prof (dpto name)</div>
    <!-- TODO: #18 -->
    <a class="uk-navbar-toggle uk-navbar-toggle-animate" uk-navbar-toggle-icon href="#">Menu</a>
    <div class="uk-navbar-dropdown uk-position-z-index">
      <ul class="uk-nav uk-navbar-dropdown-nav">
        <li name="activities">
          <a href="#" class="uk-active">Actividades <span uk-navbar-parent-icon></span></a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="#">Resumen</a></li>
              <li><a on:click="{() => show_create = true}">Ingresar</a></li>
            </ul>
          </div>
        </li>
        <li class="uk-nav-divider" />
        <li name="consultations">
          <a href="#">Consultas <span uk-navbar-parent-icon></span></a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="#">Públicas</a></li>
              <li><a href="#">Predeterminadas</a></li>
            </ul>
          </div>
        </li>
        <li class="uk-nav-divider" />
        <li name="views">
          <a href="#">Vistas <span uk-navbar-parent-icon></span></a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="/BRA">BRA</a></li>
              <li><a href="#">Personal</a></li>
              <li><a href="#">Coordinacion</a></li>
              <li><a href="#">Departamento</a></li>
              <li><a href="#">Referencias Puras</a></li>
              <li><a href="#">Certificación PEII</a></li>
              <li class="uk-nav-divider" />
              <li>
                <a href="#">Constancias <span uk-navbar-parent-icon></span></a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li><a href="#">Proyectos</a></li>
                    <li><a href="#">Grupos</a></li>
                  </ul>
                </div>
              </li>
              <li class="uk-nav-divider" />
              <li>
                <a href="#">Evaluaciones <span uk-navbar-parent-icon></span></a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li><a href="#">S2 Prueba</a></li>
                    <li><a href="#">S2</a></li>
                    <li><a href="#">GID</a></li>
                  </ul>
                </div>
              </li>
              <li class="uk-nav-divider" />
              <li>
                <a href="#">Mis Grupos <span uk-navbar-parent-icon></span></a>
                <div class="uk-navbar-dropdown">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li><a href="#">GID 1</a></li>
                    <li><a href="#">GID 2</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="uk-nav-divider" />
        <li name="options">
          <a href="#">Opciones <span uk-navbar-parent-icon></span></a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li><a href="#">Cambiar Contraseña</a></li>
              <li><a href="#">Cambiar Perfil</a></li>
            </ul>
          </div>
        </li>
        <li class="uk-nav-divider" />
        <li><a href="#">Ayuda</a></li>
        <li class="uk-nav-divider" />
        <li><a href="#">Salir</a></li>
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
    <li><a href="#">Artículos en Revistas</a></li>
    <li><a href="#">Asistencia a Eventos</a></li>
    <li><a href="#">Memorias de Congresos</a></li>
    <li><a href="#">Proyectos de Investigación y Desarrollo</a></li>
    <li><a href="#">Recitales o Conciertos Arbitrados</a></li>
    <li><a href="#">Composiciones solicitadas por Orquestas Sinfónicas o Agrupaciones Reconocidas</a></li>
    <li><a href="#">Grabaciones Sonoras Evaluadas por Arbitros</a></li>
    <li><a href="#">Partituras, Videos o CDs publicados en editoriales reconocidas</a></li>
    <li><a href="#">Selección en Exposiciones, Bienales, Salones o Concursos Arbitrados</a></li>
    <li><a href="#">Trabajos Reconocidos o Premiados en Bienales, Salones, Concursos o Exposiciones</a></li>
    <li><a href="#">Libros Publicados</a></li>
    <li><a href="#">Capítulos de Libros</a></li>
    <li><a href="#">Informes Técnicos</a></li>
    <li><a href="#">Premios</a></li>
    <li><a href="#">Patentes</a></li>
    <li><a href="#">Proyectos de Grado Dirigidos</a></li>
  </Modal>
{/if}
