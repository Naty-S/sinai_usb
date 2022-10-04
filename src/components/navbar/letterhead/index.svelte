<!-- https://css-tricks.com/svg-path-syntax-illustrated-guide/ -->
<!-- https://yqnn.github.io/svg-path-editor/ -->
<script lang="ts">
  import Top from "./top.svelte";
  import Bottom from "./bottom.svelte";

  import bkg from "$lib/assets/logos/letterhead_bkg.png";
</script>

<div id="letterhead" class="ui equal width grid container">
  <div id="top" class="row uk-padding-remove-bottom">
    <Top />
  </div>
  <div class="uk-position-absolute uk-margin-large-right uk-margin-top" style="width: 62%; height: 62%; right: 0">
    <img src={bkg} alt="" />
  </div>
  <div id="bottom" class="row uk-padding-remove-top">
    <Bottom />
  </div>
</div>
