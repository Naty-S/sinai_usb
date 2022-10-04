<script lang="ts">
  import { session } from "$app/stores";
  
	import type { submenu_item } from "$types/menu";

  import Submenu from './submenu.svelte';

  export let show_create: MouseEventHandler<HTMLAnchorElement>;
  export let show_modify_bra_period: MouseEventHandler<HTMLAnchorElement>;

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
    professor && {href: bra, click: () => {}, name: "BRA"},
    (professor?.is_dep_chief || professor?.is_dep_representative) && {href: dep, click: () => {}, name: "Departamento"},
    professor?.coord_chief && {href: coord, click: () => {}, name: "Coordinacion"},
    professor?.division_chief && {href: division, click: () => {}, name: "Division"},
    // <!-- TODO: desired use cases -->
    // {href: void_link, click: () => {}, name: "Personal"},
    // {href: void_link, click: () => {}, name: "Referencias Puras"},
    // {href: void_link, click: () => {}, name: "Certificación PEII"}
  ].filter(Boolean) as submenu_item[];

  let options: submenu_item[];
  $: if (professor) {
      options = [
        {href: void_link, click: () => {}, name: "Cambiar Contraseña"},
        {href: `/sinai/perfil/${user?.email}`, click: () => {}, name: "Cambiar Perfil"}
      ];
    } else if (user?.dean) {
      options = [
        { href: void_link, click: () => {}, name: "Modificar Profesores"},
        {href: void_link, click: () => show_modify_bra_period(), name: "Modificar Periodo BRA"}
      ];
    };

  const logout = async function () {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    $session.user = null;
  };
</script>

<a
  id="menu"
  href={void_link}
  class="uk-navbar-toggle uk-navbar-toggle-animate"
  uk-navbar-toggle-icon
>
  Menu
</a>

<div id="nav_dropdown" class="uk-navbar-dropdown">
  <ul id="nav_dropdown_content" class="uk-navbar-dropdown-nav uk-nav-default uk-nav-divider" uk-nav>
    <Submenu
      name="Actividades"
      items={[
        {href: `/sinai/actividades/${resume_link}`, click: () => {}, name: "Revisar Mis Actividades"},
        {href: void_link, click: () => show_create(), name: "Ingresar Nueva Actividad"}
      ]}
    />
    <!-- TODO: desired use cases -->
    <!-- <Submenu
      name="Consultas"
      items={[
        {href: void_link, click: () => {}, name: "Públicas"},
        {href: void_link, click: () => {}, name: "Predeterminadas"}
      ]}
    /> -->
    <Submenu
      name="Vistas"
      items={views}
    />
    <!-- TODO: desired use cases -->
    <!-- <Submenu
      name="Constancias"
      items={[
        {href: void_link, click: () => {}, name: "Proyectos"},
        {href: void_link, click: () => {}, name: "Grupos"}
      ]}
    /> -->
    <!-- TODO: desired use cases -->
    <!-- <Submenu
      name="Evaluaciones"
      items={[
        {href: void_link, click: () => {}, name: "S2 Prueba"},
        {href: void_link, click: () => {}, name: "S2"},
        {href: void_link, click: () => {}, name: "GID"}
      ]}
    /> -->
    <Submenu
      name="Mis Grupos"
      items={groups}
    />
    <Submenu
      name="Opciones"
      items={options}
    />
    <Submenu
      name="Ayuda"
      items={[]}
    />
    <li><button type="button" class="ui red button" on:click={logout}>
      Salir
    </button></li>
  </ul>
</div>
