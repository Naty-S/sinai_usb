<!-- Apply code to all `routes` files -->
<script>
  import Menu from '$components/menu/index.svelte';
</script>

<main>
  <Menu />
  <div class="ui container">
    <slot />
  </div>
  <div class="ui divider" />
</main>

