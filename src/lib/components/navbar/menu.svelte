<!-- 
	@component
  Navbar menu
 -->
<script lang="ts">
  import type { submenu_item } from "$lib/types/menu";
  
	import { dev } from "$app/env";
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  
  import { void_link, void_click } from "$lib/constants";

  import * as api from "$lib/api";

  import Submenu from './submenu.svelte';

  export let show_create: () => void;
  export let show_modify_bra_period: () => void;
  export let show_create_prepraii: () => void;
  export let show_update_prepraii: () => void;

  const searchs = [
    {href: "/sinai/consultas/actividades", click: void_click, name: "Públicas"},
    // {href: void_link, click: void_click, name: "Predeterminadas"}
  ];
  
  let groups: submenu_item[] = [ {href: void_link, click: void_click, name: "Sin grupos"} ];
  let requests: submenu_item[] = [];
  let options: submenu_item[] = [];
  let views: submenu_item[] = [];

  $: user = $session.user;
  $: professor = user?.professor;  

  $: resume_link = professor ? `profesor/${professor.id}` : `decano/0`;
  $: activities = [
    {href: `/sinai/actividades/${resume_link}`, click: void_click, name: "Revisar Mis Actividades"},
    {href: void_link, click: show_create, name: "Ingresar Nueva Actividad"}
  ];

  $: if (professor) {

    groups = professor.groups.historico_grupos.filter(g => !g.fin).map(g => (
      {
        href: `/sinai/actividades/grupo/${g.Grupo.id}`,
        click: void_click,
        name: `GID ${g.Grupo.nombre}`
      }
    ));

    views.push({ href: "/sinai/BRA/profesor", click: void_click, name: "BRA" });

    requests.push({href: "/sinai/s1_novel/solicitud", click: void_click, name: "Solicitar S1 Novel"});
    requests.push({href: "/sinai/prepraii/solicitud", click: void_click, name: "Solicitar PREPRAII"});

    if (professor.is_dep_chief || professor.is_dep_representative) {
      
      const dep = `/sinai/actividades/departamento/${professor.department.id}`;
      views.push({ href: dep, click: void_click, name: "Departamento" });

    } else if (professor.coord_chief) {
      
      const coord = `/sinai/actividades/coordinacion/${professor.coord_chief.id}`;
      
      views.push({ href: coord, click: void_click, name: "Coordinación" });
      requests.push({href: "/sinai/s1_novel/evaluar", click: void_click, name: "Evaluar S1 Novel"});
      requests.push({href: "/sinai/prepraii/evaluar", click: void_click, name: "Evaluar PREPRAII"});
      requests.push({href: "/sinai/validaciones/nuevos_profesores", click: void_click, name: "Nuevos Registros"});

      if (professor.coord_chief.id === 4) {
        views.push({ href: "/sinai/grupos", click: void_click, name: "Grupos de Investigación" });
        activities.push({ href: "/sinai/grupos/actividades", click: void_click, name: "Grupos" });
      };
      
    } else if (professor.division_chief) {

      const division = `/sinai/actividades/division/${professor.division_chief.id}`;
      views.push({ href: division, click: void_click, name: "División" });
    };

    // <!-- TODO: desired use cases -->
    // {href: void_link, click: void_click, name: "Personal"},
    // {href: void_link, click: void_click, name: "Referencias Puras"},
    // {href: void_link, click: void_click, name: "Certificación PEII"}

    options = [
      {href: "/sinai/perfil", click: void_click, name: "Cambiar Perfil"}
    ];
  } else if (user?.dean) {

    activities.push(
      {href: "/sinai/actividades", click: void_click, name: "Resumen de Actividades"},
    );
    activities.push({ href: "/sinai/grupos/actividades", click: void_click, name: "Grupos" });

    views.push({ href: "/sinai/grupos", click: void_click, name: "Grupos de Investigación" });

    requests.push({href: "/sinai/prepraii", click: void_click, name: "PREPRAII"});
    requests.push({href: "/sinai/prepraii/pagos", click: void_click, name: "Pagos PREPRAII"});
    requests.push({href: "/sinai/validaciones/nuevos_profesores", click: void_click, name: "Nuevos Registros"});

    options = [
      // { href: void_link, click: void_click, name: "Modificar Profesores"},
      {href: "/sinai/mesa_tecnica", click: void_click, name: "Modificar Mesa Técnica"},
      {href: "/sinai/coordinadores", click: void_click, name: "Modificar Coordinadores"},
      {href: void_link, click: show_modify_bra_period, name: "Modificar Período BRA"},
      {href: void_link, click: show_create_prepraii, name: "Crear nueva convocatoria PREPRAII"},
      {href: void_link, click: show_update_prepraii, name: "Actualizar convocatoria PREPRAII actual"}
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
    {#if user?.professor}
      <Submenu name="Mis Grupos" items={groups} />
    {/if}
    <Submenu name="Consultas" items={searchs} />
    <Submenu name="Solicitudes" items={requests} />
    <Submenu name="Opciones" items={options} />
    <!-- <Submenu name="Ayuda" items={[]} /> -->
    
    <!-- TODO: desired use cases -->
    <!-- <Submenu
      name="Constancias"
      items={[
        {href: void_link, click: void_click, name: "Proyectos"},
        {href: void_link, click: void_click, name: "Grupos"}
      ]}
    /> -->
    <!-- <Submenu
      name="Evaluaciones"
      items={[
        {href: void_link, click: void_click, name: "S2 Prueba"},
        {href: void_link, click: void_click, name: "S2"},
        {href: void_link, click: void_click, name: "GID"}
      ]}
    /> -->
    <li>
      <button type="button" class="ui red button" on:click={logout}>
        Salir
      </button>
    </li>
  </ul>
</div>
