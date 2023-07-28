<!-- 
  @component
 -->
<script lang="ts">
  export let size: number;
  export let page_size: number;
  export let start: number;
  export let end: number;
  export let show_prev: () => void;
  // export let show_page: (page: number) => void;
  export let show_next: () => void;
</script>

<div id="pagination" class="ui stackable buttons">
  <button class="ui blue icon button {start > 0 ? '' : "disabled"}" on:click={show_prev}>
    <i class="left chevron icon" />
    Atrás
  </button>
  <div class="ui horizontal list">
    {#each [... Array(Math.ceil(size / page_size)).keys()] as idx}
      <div class="item"><strong>
        <!-- <button class="ui button {start === idx * page_size ? "green" : ''}" on:click={()=>show_page(idx)}> -->
        <span class="ui text {start === idx * page_size ? "green" : 'grey'}">
          {idx}
        </span>
        <!-- </button> -->
      </strong></div>
    {/each}
    </div>
  <button class="ui blue icon button {end < size ? "" : "disabled"}" on:click={show_next}>
    Siguiente
    <i class="right chevron icon" />
  </button>
</div>
