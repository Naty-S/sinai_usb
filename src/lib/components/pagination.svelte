<!-- 
  @component
 -->
<script lang="ts">
  export let size: number;
  export let page_size: number;
  export let start: number;
  export let end: number;
  export let show_prev: () => void;
  export let show_page: (page: number) => void;
  export let show_next: () => void;

  const to_top = function() {
    
    document.body.scrollIntoView();
    
    const top = document.getElementById("activities")?.getBoundingClientRect().top ?? 0;
    const pagination_h = document.getElementById("pagination")?.getBoundingClientRect().height ?? 225;
    const scroll = top - pagination_h - 225;

    document.body.scrollTo(0, scroll); // For Safari
    document.documentElement.scrollTo(0, scroll); // For Chrome, Firefox, IE and Opera
  }

  const to_bottom = function() {

    document.body.scrollIntoView();

    const scroll = document.documentElement.scrollHeight + 300;

    document.body.scrollTop = scroll; // For Safari
    document.documentElement.scrollTop = scroll; // For Chrome, Firefox, IE and Opera
  }
</script>

<div id="pagination" class="ui stackable buttons">
  <button class="ui blue icon button {start > 1 ? '' : "disabled"}" on:click={() => {show_prev(); to_bottom()}}>
    <i class="left chevron icon" />
    Atrás
  </button>
  <div class="ui horizontal list">
    {#each [... Array(Math.ceil(size / page_size)).keys()] as idx}
      <div class="item"><strong>
        <button class="ui button {start === idx * page_size ? "green" : ''}" on:click={()=>show_page(idx + 1)}>
          {idx + 1}
        </button>
      </strong></div>
    {/each}
    </div>
  <button class="ui blue icon button {end < size ? '' : "disabled"}" on:click={() => {show_next(); to_top()}}>
    Siguiente
    <i class="right chevron icon" />
  </button>
</div>
