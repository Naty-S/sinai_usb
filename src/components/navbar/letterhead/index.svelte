<!-- https://css-tricks.com/svg-path-syntax-illustrated-guide/ -->
<!-- https://yqnn.github.io/svg-path-editor/ -->
<script lang="ts">
  import Top from "./top.svelte";
  import Bottom from "./bottom.svelte";
</script>

<div id="letterhead" class="ui equal width grid container">
  <div class="row uk-padding-remove-bottom">
    <Top />
  </div>
  <!-- <div
    class="uk-position-top-right middle aligned row uk-padding-remove"
    style="top: 0; right: 0; left: 0; bottom: 0;"
  >
    <slot />
  </div> -->
  <div class="row uk-padding-remove-top">
    <Bottom />
  </div>
</div>
