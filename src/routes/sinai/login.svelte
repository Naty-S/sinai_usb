<script lang="ts" context="module">
  import { redirect } from "$lib/shared/session";
  
  export const load = redirect;

  
</script>
<script lang="ts">
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  import * as api from "$lib/api";

  const is_err = false;
  let email = '';
  let pass = '';

  const login = async function () {

    const res = await api.post("/api/auth/login/" + email, { email, pass });

    if (res.ok) {
      $session.user = await res.clone().json();
      
      if ($session.user?.professor) {
        goto(`/sinai/actividades/profesor/${$session.user.email}`);
        
      } else { // Dean
        goto("/sinai/actividades");
      };
    } else {
      const { message } = await res.clone().json();
      console.log(message)
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
