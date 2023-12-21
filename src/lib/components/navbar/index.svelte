<!-- 
	@component
  Navbar
 -->
<script lang="ts">
  import { session } from "$app/stores";

  import bkg from "$assets/letterhead_bkg.png";

  import CreateActivities from "$lib/components/modals/create_activities.svelte";
  import ModifyBraPeriod from "$lib/components/modals/modify_bra_period.svelte";
  import CreatePrepraii from "$lib/components/modals/create_prepraii.svelte";
  import UpdatePrepraii from "$lib/components/modals/update_prepraii.svelte";

  import Letterhead from "./letterhead/index.svelte";
	import MenuDropdown from "./menu.svelte";

  let pop_create = false;
  let pop_modify_bra = false;
  let pop_create_prepraii = false;
  let pop_update_prepraii = false;
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
  uk-navbar="mode: click, hover; delay-hide:1; offset: 2;"
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
              show_create={() => pop_create = true}
              show_modify_bra_period={() => pop_modify_bra = true}
              show_create_prepraii={() => pop_create_prepraii = true}
              show_update_prepraii={() => pop_update_prepraii = true}
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

{#if pop_create}
  <CreateActivities pop_up={pop_create} close={() => pop_create = false} />
{/if}

{#if pop_modify_bra}
  <ModifyBraPeriod pop_up={pop_modify_bra} close={() => pop_modify_bra = false} />
{/if}

{#if pop_create_prepraii}
  <CreatePrepraii pop_up={pop_create_prepraii} close={() => pop_create_prepraii = false} />
{/if}

{#if pop_update_prepraii}
  <UpdatePrepraii pop_up={pop_update_prepraii} close={() => pop_update_prepraii = false} />
{/if}
