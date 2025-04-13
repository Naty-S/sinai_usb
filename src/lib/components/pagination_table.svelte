<!-- 
  @component
 -->
<script lang="ts">
  export let size: number;
  export let start: number;
  export let end: number;
  export let show_prev: () => void;
  export let show_next: () => void;

</script>

<div id="pagination" class="ui stackable buttons">
  <button class="ui blue icon button {start > 1900 ? '' : "disabled"}" on:click={() => {show_prev()}}>
    <i class="left chevron icon" />
    Atrás
  </button>
  <div class="ui button">
    {start} - {end}
  </div>
  <button class="ui blue icon button {end < size ? '' : "disabled"}" on:click={() => {show_next()}}>
    Siguiente
    <i class="right chevron icon" />
  </button>
</div>
