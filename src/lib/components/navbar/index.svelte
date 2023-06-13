<!-- 
	@component
  Navbar
 -->
<script lang="ts">
  import { session } from "$app/stores";

  import ActivitiesModal from "./activities_modal.svelte";
  import Letterhead from "./letterhead/index.svelte";
	import MenuDropdown from "./menu.svelte";
  import ModifyBraPeriodModal from "./modify_bra_period_modal.svelte";
  import bkg from "$assets/letterhead_bkg.png";

  let show_create = false;
  let show_modify_bra = false;
  let fixed = '';
  let navbar = "ui grid container uk-navbar-center";

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
      navbar = "ui grid container uk-navbar-center";
    }
  };
</script>

<svelte:window on:scroll={fix_on_top} on:resize={fit_menu} />

<!-- height 15vh
modificar para que todo este centrado entre el top y bottom del letter head
-->
<nav
  id="navabar"
  class="uk-navbar-container uk-position-z-index uk-width-1-1 {fixed}"
  uk-navbar="mode:click;"
  style={fixed ? "top: 0;" : ''}
>
  <div
    id="navbar_background"
    class="ui image uk-background-cover uk-width-1-1"
    data-src={bkg}
    uk-img="width: 100%;"
    style="background-image: url({bkg});"
  >
    <div id="navbar" class="{navbar} uk-inline uk-margin-bottom">
      <Letterhead />
      <ul id="nav" class="uk-navbar-nav uk-position-center-right uk-margin-small-right uk-position-z-index">
        {#if $session.user}
          <li class="ui tertiary vertically fitted segment uk-margin-small-top">
            <MenuDropdown
              show_create={() => show_create = true}
              show_modify_bra_period={() => show_modify_bra = true}
            />
          </li>
        {:else}
          <li class="uk-margin-medium-top">
            <a id="login" href="/sinai/login" class="ui primary tiny button">
              Iniciar sesion
            </a>
          </li>
          <li class="uk-margin-medium-top">
            <a id="register" href="/sinai/registro" class="ui primary tiny button">
              Registro
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

{#if show_create}
  <ActivitiesModal show={show_create} close={() => show_create = false} />
{/if}

{#if show_modify_bra}
  <ModifyBraPeriodModal show={show_modify_bra} close={() => show_modify_bra = false} />
{/if}
