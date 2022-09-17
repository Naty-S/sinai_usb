<script lang="ts">
	import type { submenu_item } from "$types/menu";

  export let href: string;
  export let name: string;
  export let items: submenu_item[];
</script>

<li name="{name}_submenu">
  <a href={href}>
    {name} <span uk-navbar-parent-icon></span>
  </a>
  <div id="{name}_submenu_dropdown" class="uk-navbar-dropdown">
    <ul id="{name}_submenu_dropdown_list" class="uk-nav uk-navbar-dropdown-nav">
      {#each items as item}
        <li><a href="{item.href}" on:click={item.click}>{item.name}</a></li>
      {/each}
    </ul>
  </div>
</li>
