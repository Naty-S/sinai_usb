<!-- https://css-tricks.com/svg-path-syntax-illustrated-guide/ -->
<!-- https://yqnn.github.io/svg-path-editor/ -->
<script lang="ts">
  import Top from "./top.svelte";
  import Bottom from "./bottom.svelte";
</script>

<div id="letterhead" class="ui equal width grid container">
  <div id="top" class="row uk-padding-remove-bottom uk-position-z-index">
    <Top />
  </div>
  <div id="bottom" class="row uk-padding-remove uk-position-z-index">
    <Bottom />
  </div>
</div>
