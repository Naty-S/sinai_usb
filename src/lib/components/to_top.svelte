<!-- 
	@component
  To top button. Goes to the top of the page
 -->
<script lang="ts">
  export let show_on_px = 150;
  
  let hidden = true;

  function goTop() {
    document.body.scrollIntoView();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  function show() {
    const scroll_container = document.documentElement || document.body;
    
    if (!scroll_container) {
      return;
    };

    if (scroll_container.scrollTop > show_on_px) {
      hidden = false;
    } else {
      hidden = true;
    };
  };
</script>

<svelte:window on:scroll={show} />

<div class="back-to-top" class:hidden on:click={goTop}>
  <i class="large circular inverted primary angle double up icon"></i>
</div>

<style>
  .back-to-top {
    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s;
    position: fixed;
    z-index: 99;
    right: 10px;
    user-select: none;
    bottom: 20px;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
