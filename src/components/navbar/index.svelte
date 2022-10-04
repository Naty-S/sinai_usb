<script lang="ts">
  import { session } from "$app/stores";

  import ActivitiesModal from "./activities_modal.svelte";
  import Letterhead from "./letterhead/index.svelte";
	import MenuDropdown from "./menu.svelte";
  import ModifyBraPeriodModal from "./modify_bra_period_modal.svelte";
  
  let show_create = false;
  let show_modify_bra = false;
  let fixed = '';
  let navbar = "uk-navbar-right";

  const fix_on_top = function () {
    const container = document.documentElement || document.body;
    
    if (!container) {
      return;
    };

    if (container.scrollTop > 0) {
      fixed = "uk-position-fixed";
    } else {
      fixed = '';
    };
  };

  const fit_menu = function () {
    const container = document.documentElement || document.body;
    
    if (!container) {
      return;
    };

    if (window.screen.width < 426) {
      navbar = "uk-width-1-1";
    } else {
      navbar = "uk-navbar-right";
    }
  };
</script>

<svelte:window on:scroll={fix_on_top} on:resize={fit_menu} />

<nav
  id="navabar_container"
  class="uk-navbar-container uk-width-1-1 uk-position-z-index {fixed}"
  uk-navbar="mode:click; offset: -10;"
  style={fixed ? "top: 0;" : ''}
>
  <div id="navbar" class={navbar}>
    <Letterhead/>
    <ul id="nav" class="uk-navbar-nav">
      {#if $session.user}
        <li>
          <!-- <div class="right floated two wide computer mobile column uk-padding-remove"> -->
            <MenuDropdown
              show_create={() => show_create = true}
              show_modify_bra_period={() => show_modify_bra = true}
            />
          <!-- </div> -->
        </li>
      {:else}
        <li>
          <a id="login" href="/sinai/login" class="ui primary button">
            Iniciar sesion
          </a>
        </li>
        <li>
          <a id="register" href="/sinai/registro" class="ui primary button">
            Registro
          </a>
        </li>
      {/if}
    </ul>
    <!-- </Letterhead> -->
  </div>
</nav>

{#if show_create}
  <ActivitiesModal show={show_create} close={() => show_create = false} />
{/if}

{#if show_modify_bra}
  <ModifyBraPeriodModal show={show_modify_bra} close={() => show_modify_bra = false} />
{/if}
