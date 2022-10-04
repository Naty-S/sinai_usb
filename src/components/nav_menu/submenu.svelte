<script lang="ts">
	import type { submenu_item } from "$types/menu";

  export let name: string;
  export let items: submenu_item[];
</script>

<li name="{name}_submenu" class="uk-parent">
  <a href="#">
    <span class="ui primary text">
      {name}
    </span>
    <span uk-nav-parent-icon />
  </a>
  <ul id="{name}_submenu_content" class="uk-nav-sub">
    {#each items as item}
      <li class="">
        <a href={item.href} on:click={item.click} class="">
          {item.name}
        </a>
      </li>
      <!-- <div class="ui fitted divider" /> -->
    {/each}
  </ul>
  <!-- <div class="ui fitted divider" /> -->
</li>
