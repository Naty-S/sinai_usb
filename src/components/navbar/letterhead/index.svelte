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
  <div class="row uk-padding-remove-top">
    <Bottom />
  </div>
</div>
