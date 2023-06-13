<!-- 
	@component
  Navbar menu
 -->
<script lang="ts">
import { goto } from "$app/navigation";

	import { dev } from "$app/env";
  import { session } from "$app/stores";
  
	import type { submenu_item } from "$lib/types/menu";

  import * as api from "$lib/api";

  import Submenu from './submenu.svelte';

  export let show_create: MouseEventHandler<HTMLAnchorElement>;
  export let show_modify_bra_period: MouseEventHandler<HTMLAnchorElement>;

  const void_link = "javascript:void(0)";

  $: user = $session.user;
  $: professor = user?.professor;  

  $: resume_link = professor ? `profesor/${professor.id}` : `decano/0`;
  $: bra = "/sinai/BRA/profesor";
  $: coord = `/sinai/actividades/coordinacion/${professor?.coord_chief?.id}`;
  $: dep = `/sinai/actividades/departamento/${professor?.department.id}`;
  $: division = `/sinai/actividades/division/${professor?.division_chief?.id}`;

  $: activities = [
    {href: `/sinai/actividades/${resume_link}`, click: () => {}, name: "Revisar Mis Actividades"},
    {href: void_link, click: () => show_create(), name: "Ingresar Nueva Actividad"}
  ];
  let views: submenu_item[] = [];
  let options: submenu_item[] = [];

  $: groups = professor?.groups.historico_grupos.filter(g => !g.fin).map(g => (
    {
      href: `/sinai/actividades/grupo/${g.Grupo.id}`,
      click: () => {},
      name: `GID ${g.Grupo.nombre}`
    }
  )) || [];

  $: if(professor) {
    views.push({ href: bra, click: () => {}, name: "BRA" });

    if (professor.is_dep_chief || professor.is_dep_representative) {
      views.push({ href: dep, click: () => {}, name: "Departamento" });

    } else if (professor.coord_chief) {
      views.push({ href: coord, click: () => {}, name: "Coordinación" });
      
    } else if (professor.division_chief) {
      views.push({ href: division, click: () => {}, name: "División" });
    };
    // <!-- TODO: desired use cases -->
    // {href: void_link, click: () => {}, name: "Personal"},
    // {href: void_link, click: () => {}, name: "Referencias Puras"},
    // {href: void_link, click: () => {}, name: "Certificación PEII"}
  };

  $: if (professor) {
    options = [
      {href: "/sinai/perfil", click: () => {}, name: "Cambiar Perfil"}
    ];
  } else if (user?.dean) {

    activities.push(
      {href: "/sinai/actividades", click: () => {}, name: "Resumen de Actividades"},
    );

    options = [
      // { href: void_link, click: () => {}, name: "Modificar Profesores"},
      {href: void_link, click: () => show_modify_bra_period(), name: "Modificar Periodo BRA"}
    ];
  };

  const logout = async function () {

    await api.post("/api/auth/logout", null);

    $session.user = null;
  
    if (dev) {
      goto("/sinai");
    } else {
      goto("https://secure.dst.usb.ve/logout");
    };
  };  
</script>

<a
  id="menu"
  href={void_link}
  class="uk-navbar-toggle uk-navbar-toggle-animate"
  style="min-height: fit-content;"
  uk-navbar-toggle-icon
>
  <span class="ui primary text uk-text-bold ">
    Menu
  </span>
</a>

<div id="navbar_dropdown" class="uk-navbar-dropdown">
  <ul
    id="navbar_dropdown_content_nav"
    class="uk-navbar-dropdown-nav uk-nav-default uk-nav-divider"
    uk-nav
  >
    <Submenu name="Actividades" items={activities} />
    <Submenu name="Vistas" items={views} />
    <Submenu name="Mis Grupos" items={groups} />
    <Submenu name="Opciones" items={options} />
    <!-- <Submenu name="Ayuda" items={[]} /> -->
    
    <!-- TODO: desired use cases -->
    <!-- <Submenu
      name="Consultas"
      items={[
        {href: void_link, click: () => {}, name: "Públicas"},
        {href: void_link, click: () => {}, name: "Predeterminadas"}
      ]}
    /> -->
    <!-- <Submenu
      name="Constancias"
      items={[
        {href: void_link, click: () => {}, name: "Proyectos"},
        {href: void_link, click: () => {}, name: "Grupos"}
      ]}
    /> -->
    <!-- <Submenu
      name="Evaluaciones"
      items={[
        {href: void_link, click: () => {}, name: "S2 Prueba"},
        {href: void_link, click: () => {}, name: "S2"},
        {href: void_link, click: () => {}, name: "GID"}
      ]}
    /> -->
    <li>
      <button type="button" class="ui red button" on:click={logout}>
        Salir
      </button>
    </li>
  </ul>
</div>
