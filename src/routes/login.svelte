<script lang="ts">
  import { goto } from '$app/navigation';
  
	import type { User } from '$interfaces/user';
  import { user } from "$lib/shared/stores/session";

  const is_err = false;
  let email = '';
  let pass = '';

  const login = async function () {

    const res = await fetch("/api/session/" + email);

    if (res.ok) {
      
      const _user: User = await res.clone().json();
      const redirect = res.headers.get("location");
      
      user.login(_user);

      if ( redirect ) { goto( redirect ); }
      else {
        console.log("No location in headers");
      };

    } else {
      const { message } = await res.clone().json();
      console.log(new Error(message));
    };
  };
</script>

<form class="ui large form" class:error="{is_err}">

  <div class="required field" class:error="{is_err}">
    <label for="">Correo</label>
    <input type="email" bind:value={email}>
  </div>

  <div class="required field" class:error="{is_err}">
    <label for="">Contrasena</label>
    <input type="password" bind:value={pass}>
  </div>

  <button type="submit" class="ui blue button" on:click|preventDefault={login}>
    Iniciar Sesion
  </button>
  
</form>
