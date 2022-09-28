<script lang="ts">
  import { session } from "$app/stores";
  
	import type { submenu_item } from "$types/menu";

  import Submenu from './submenu.svelte';

  export let show_create: MouseEventHandler<HTMLAnchorElement>;

  $: user = $session.user;
  $: professor = user?.professor;  
  $: groups = professor?.groups.historico_grupos.filter(g => !g.fin).map(g => (
    {
      href: `/sinai/actividades/grupo/${g.Grupo.id}`,
      click: () => {},
      name: `GID ${g.Grupo.nombre}`
    }
  )) || [];

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

  $: options = professor ? [
      {href: void_link, click: () => {}, name: "Cambiar Contraseña"},
      {href: `/sinai/perfil/${user?.email}`, click: () => {}, name: "Cambiar Perfil"}
    ] : [{ href: void_link, click: () => {}, name: "Modificar Profesores"}];

  const logout = async function () {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    $session.user = null;
  };
</script>

<a
  id="menu_dropdown"
  href={void_link}
  class="uk-navbar-toggle uk-navbar-toggle-animate"
  uk-navbar-toggle-icon
>
  Menu
</a>

<div id="nav_dropdown" class="uk-navbar-dropdown">
  <ul id="nav_dropdown_list" class="uk-nav uk-navbar-dropdown-nav">
    <Submenu
      href={void_link}
      name="Actividades"
      items={[
        {href: `/sinai/actividades/${resume_link}`, click: () => {}, name: "Revisar Mis Actividades"},
        {href: void_link, click: () => show_create(), name: "Ingresar Nueva Actividad"}
      ]}
    />
    <li class="uk-nav-divider" />
    <!-- TODO: desired use cases -->
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
      items={options}
    />
    <li class="uk-nav-divider" />
    
    <li><a href={void_link}>Ayuda</a></li>
    
    <li class="uk-nav-divider" />
    
    <li><a href={void_link} on:click={logout}>Salir</a></li>
  </ul>
</div>
