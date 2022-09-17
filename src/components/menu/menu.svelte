<script lang="ts">
  import { session } from "$app/stores";
  
	import type { submenu_item } from "$types/menu";

  import ActivitiesModal from './activities_modal.svelte';
  import Submenu from './submenu.svelte';

  $: user = $session.user;
  $: professor = user?.professor;  
  $: groups = professor?.groups.historico_grupos.filter(g => !g.fin).map(g => (
    {
      href: `/sinai/actividades/grupo/${g.Grupo.id}`,
      click: () => {},
      name: `GID ${g.Grupo.nombre}`
    }
  )) || [];

  $: username = function () {
    let name = '';
    let rank = '';

    if (professor) {
      name = `Prof. ${professor.profile}. `;

      if (professor.is_dep_chief) {
        rank = `Jefe del Dpto. de ${professor.department.name}`;
  
      } else if (professor.is_dep_representative) {
        rank = `Representante del Dpto. de ${professor.department.name}`;
        
      } else if (professor.coord_chief) {
        rank = `Coordinador de ${professor.coord_chief.name}`;
        
      } else if (professor.division_chief) {
        rank = `Jefe de Division de ${professor.division_chief.name}`;
        
      } else {
        rank = `Dpto. de ${professor?.department.name}`;
      };
    } else if (user?.dean) {
      name = `${user?.dean}. `;
      rank = "Decano"
    } else {
      name = "Throw Error: No user. Cookie not sent to correct domain";
    };

    return name + rank;
  };

  const void_link = "javascript:void(0)";
  $: resume_link = professor ? `profesor/${user?.email}` : '';
  $: bra = `/sinai/BRA/profesor/${user?.email}`;
  $: coord = `/sinai/actividades/coordinacion/${user?.professor?.coord_chief?.id}`;
  $: dep = `/sinai/actividades/departamento/${user?.professor?.department.id}`;
  $: division = `/sinai/actividades/division/${user?.professor?.division_chief?.id}`;

  $: views = [
    {href: bra, click: () => {}, name: "BRA"},
    professor?.is_dep_chief || professor?.is_dep_representative ? {href: dep, click: () => {}, name: "Departamento"} : null,
    professor?.coord_chief ? {href: coord, click: () => {}, name: "Coordinacion"} : null,
    professor?.division_chief ? {href: division, click: () => {}, name: "Division"} : null,
    // <!-- TODO: desired use cases -->
    {href: void_link, click: () => {}, name: "Personal"},
    {href: void_link, click: () => {}, name: "Referencias Puras"},
    {href: void_link, click: () => {}, name: "Certificación PEII"}
  ].filter(Boolean) as submenu_item[];

  let show_create = false;

  const logout = async function () {
    await fetch("/api/auth/logout");

    $session.user = null;
  };
</script>

<nav id="sinai_navabar" class="uk-navbar uk-margin uk-navbar-container" uk-navbar="mode:click; offset: -10; delay-hide: 200">
  <div id="nav_container" class="uk-navbar-center">
    <div class="">SINAI - DID</div>
    {#if user}
      <div class="">{username()}</div>

      <a id="menu_dropdown" href={void_link} class="uk-navbar-toggle uk-navbar-toggle-animate" uk-navbar-toggle-icon>
        Menu
      </a>
      
      <div id="nav_dropdown" class="uk-navbar-dropdown uk-position-z-index">
        <ul id="nav_dropdown_list" class="uk-nav uk-navbar-dropdown-nav">
          <Submenu
            href={void_link}
            name="Actividades"
            items={[
              {href: `/sinai/actividades/${resume_link}`, click: () => {}, name: "Revisar Mis Actividades"},
              {href: void_link, click: () => show_create = true, name: "Ingresar Nueva Actividad"}
            ]}
          />
          <li class="uk-nav-divider" />
          <Submenu
            href={void_link}
            name="Consultas"
            items={[
              {href: void_link, click: () => {}, name: "Públicas"},
              {href: void_link, click: () => {}, name: "Predeterminadas"}
            ]}
          />
          <li class="uk-nav-divider" />
          <Submenu
            href={void_link}
            name="Vistas"
            items={views}
          />
          <li class="uk-nav-divider" />
          <!-- TODO: desired use cases -->
          <Submenu
            href={void_link}
            name="Constancias"
            items={[
              {href: void_link, click: () => {}, name: "Proyectos"},
              {href: void_link, click: () => {}, name: "Grupos"}
            ]}
          />
          <li class="uk-nav-divider" />
          <!-- TODO: desired use cases -->
          <Submenu
            href={void_link}
            name="Evaluaciones"
            items={[
              {href: void_link, click: () => {}, name: "S2 Prueba"},
              {href: void_link, click: () => {}, name: "S2"},
              {href: void_link, click: () => {}, name: "GID"}
            ]}
          />
          <li class="uk-nav-divider" />
          <Submenu
            href={void_link}
            name="Mis Grupos"
            items={groups}
          />          
          <li class="uk-nav-divider" />
          <Submenu
            href={void_link}
            name="Opciones"
            items={[
              {href: void_link, click: () => {}, name: "Cambiar Contraseña"},
              {href: "/sinai/perfil", click: () => {}, name: "Cambiar Perfil"}
            ]}
          />
          <li class="uk-nav-divider" />
          
          <li><a href={void_link}>Ayuda</a></li>
          
          <li class="uk-nav-divider" />
          
          <li><a href={void_link} on:click={logout}>Salir</a></li>
        </ul>
      </div>
    {:else}
      <a id="register" href="/sinai/registro" class="">Registro</a>
    {/if}
  </div>
</nav>

{#if show_create}
  <ActivitiesModal show={show_create} close={() => show_create = false} />
{/if}
