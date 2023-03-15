<script lang="ts">
  export let header_msg: string;
</script>

<div class="ui center aligned floating icon mini orange message">
  <!-- <a class="uk-alert-close" uk-close></a> -->
  <i class="exclamation icon"></i>
  <div class="content">
    <div class="header">
      {header_msg}
    </div>
    <slot />
  </div>
</div>
