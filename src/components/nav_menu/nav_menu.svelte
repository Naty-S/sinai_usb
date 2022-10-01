<script lang="ts">
  import { session } from "$app/stores";

  import type { User } from "$interfaces/auth";
    
  import ActivitiesModal from "./activities_modal.svelte";
	import MenuDropdown from "./menu.svelte";
  import ModifyBraPeriodModal from "./modify_bra_period_modal.svelte";
  
  const username = function (user: User) {
    
    const professor = user.professor;  

    let name = '';
    let rank = '';

    if (professor) {
      name = `Prof. ${professor.surname1}, ${professor.name1}. `;

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
  let show_modify_bra = false;
  let fixed = false;

  const fix_on_top = function() {
    const scroll_container = document.documentElement || document.body;
    
    if (!scroll_container) {
      return;
    };

    if (scroll_container.scrollTop > 0) {
      fixed = true;
    } else {
      fixed = false;
    };
  };
</script>

<svelte:window on:scroll={fix_on_top} />

<!-- <div class="uk-width-1-1 uk-position-fixed uk-position-z-index" > -->
  <nav
    id="sinai_navabar"
    class="uk-navbar uk-navbar-container uk-width-1-1 {fixed && "uk-position-fixed"} uk-position-z-index"
    uk-navbar="mode:click; offset: -10;"
    style="top: 0"
  >
    <div id="nav_container" class="uk-navbar-center">
      <div class="">SINAI - DID</div>
      {#if $session.user}
        <div class="">{username($session.user)}</div>
  
        <MenuDropdown
          show_create={() => show_create = true}
          show_modify_bra_period={() => show_modify_bra = true}
        />
        
      {:else}
        <a id="register" href="/sinai/registro" class="">Registro</a>
      {/if}
    </div>
  </nav>
<!-- </div> -->

{#if show_create}
  <ActivitiesModal show={show_create} close={() => show_create = false} />
{/if}

{#if show_modify_bra}
  <ModifyBraPeriodModal show={show_modify_bra} close={() => show_modify_bra = false} />
{/if}
