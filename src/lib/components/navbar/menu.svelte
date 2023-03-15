<script lang="ts">
import { goto } from "$app/navigation";

  import { session } from "$app/stores";
  
	import type { submenu_item } from "$types/menu";

  import * as api from "$lib/api";

  import Submenu from './submenu.svelte';

  export let show_create: MouseEventHandler<HTMLAnchorElement>;
  export let show_modify_bra_period: MouseEventHandler<HTMLAnchorElement>;

  const void_link = "javascript:void(0)";

  let views: submenu_item[] = [];
  let options: submenu_item[] = [];

  $: user = $session.user;
  $: professor = user?.professor;  

  $: resume_link = professor ? `profesor/${user?.email}` : '';
  $: bra = `/sinai/BRA/profesor/${user?.email}`;
  $: coord = `/sinai/actividades/coordinacion/${user?.professor?.coord_chief?.id}`;
  $: dep = `/sinai/actividades/departamento/${user?.professor?.department.id}`;
  $: division = `/sinai/actividades/division/${user?.professor?.division_chief?.id}`;

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
    await api.post("/api/auth/logout", null);

    $session.user = null;

    goto("/sinai/login");
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
    <Submenu name="Vistas" items={views} />
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
    <Submenu name="Mis Grupos" items={groups} />
    <Submenu name="Opciones" items={options} />
    <Submenu name="Ayuda" items={[]} />
    <li>
      <button type="button" class="ui red button" on:click={logout}>
        Salir
      </button>
    </li>
  </ul>
</div>
