<script lang="ts">
  import { session } from "$app/stores";

  import type { User } from "$interfaces/auth";
    
  import ActivitiesModal from "./activities_modal.svelte";
	import MenuDropdown from "./menu.svelte";
  
  const username = function (user: User) {
    
    const professor = user.professor;  

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
    } else if (user.dean) {
      name = `${user.dean}. `;
      rank = "Decano"
    } else {
      name = "Throw Error: No user. Cookie not sent to correct domain";
    };

    return name + rank;
  };

  let show_create = false;
</script>

<nav
  id="sinai_navabar"
  class="uk-navbar uk-navbar-container"
  uk-navbar="mode:click; offset: -10; delay-hide: 200"
  uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"
>
  <div id="nav_container" class="uk-navbar-center">
    <div class="">SINAI - DID</div>
    {#if $session.user}
      <div class="">{username($session.user)}</div>

      <MenuDropdown show_create={() => show_create = true} />
      
    {:else}
      <a id="register" href="/sinai/registro" class="">Registro</a>
    {/if}
  </div>
</nav>

{#if show_create}
  <ActivitiesModal show={show_create} close={() => show_create = false} />
{/if}
