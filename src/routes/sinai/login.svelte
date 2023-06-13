<script lang="ts" context="module">
  import { redirect } from "$lib/utils/session";
  
  export const load = redirect;

</script>
<script lang="ts">
  import { onMount } from "svelte";

	import { goto } from "$app/navigation";
  import { session, page } from "$app/stores";

  import * as api from "$lib/api";

  
  $: if ($page.url.searchParams.has("validated")) { onMount( () => {
    
      const jwt = $page.url.searchParams.get("validated");
      const user = jwt ? JSON.parse(jwt) : null;

      $session.user = user;
    })
  };

  // const is_err = false;
  // let email = '';

  // const login_dev = async function () {

  //   const res = await api.post("/api/auth/login_dev/" + email, { email });

  //   if (res.ok) {
  //     $session.user = await res.clone().json();
      
  //     if ($session.user?.professor) {
  //       goto(`/sinai/actividades/profesor/${$session.user.email}`);
      
  //     } else { // Dean
  //       goto("/sinai/actividades");
  //     };
  //   } else {
  //     const { message } = await res.clone().json();
  //     console.log(message)
  //   };
  // };
</script>

<!-- <form class="ui large form" class:error="{is_err}">

  <div class="required field" class:error="{is_err}">
    <label for="">Correo</label>
    <input type="email" bind:value={email}>
  </div>

  <button type="submit" class="ui blue button" on:click|preventDefault={login_dev}>
    Iniciar Sesion
  </button>
</form> -->
