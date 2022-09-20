<!-- 
  @component
  Main page ***www.sinai.did.usb.ve***
  you can use markdown!!
 -->
<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

  export const load: Load = async function ({ session }) {

    let redirect = "/sinai/login";

    if (session.user?.professor) {
      redirect = `/sinai/actividades/profesor/${session.user.email}`;
    } else if (session.user?.dean) {
      redirect = "/sinai/actividades";
    } else {
      console.log("ERROR?")
    };

    return {
      status: 302,
      redirect
    }
  }
</script>
<script lang="ts">
</script>

<svelte:head>
	<title>SINAI</title>
</svelte:head>
