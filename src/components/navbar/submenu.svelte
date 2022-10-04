<script lang="ts">
	import type { submenu_item } from "$types/menu";

  export let name: string;
  export let items: submenu_item[];

  const void_link = "javascript:void(0)";
</script>

<li id="{name}_submenu" class="uk-parent">
  <a href={void_link}>
    <span class="ui primary text">
      {name}
    </span>
    <span uk-nav-parent-icon />
  </a>
  <ul id="{name}_submenu_content" class="uk-nav-sub">
    {#each items as item}
      <div class="ui fitted divider" />
      <li>
        <a href={item.href} on:click={item.click}>
          {item.name}
        </a>
      </li>
    {/each}
  </ul>
</li>
