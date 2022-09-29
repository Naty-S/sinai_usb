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
    };

    return {
      status: 302,
      redirect
    }
  }
</script>

<svelte:head>
	<title>SINAI</title>
</svelte:head>
