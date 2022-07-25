<!-- Apply code to all `routes` files -->
<script>
  import Menu from '$components/menu.svelte';
</script>

<main>
  <Menu />
  <div class="ui container">
    <slot />
  </div>
</main>

