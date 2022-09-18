<script lang="ts">
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  
  const is_err = false;
  let email = '';
  let pass = '';

  const login = async function () {

    const res = await fetch("/api/auth/login/" + email, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, pass })
    });

    if (res.ok) {
      
      $session.user = await res.clone().json();
      
      if ($session.user?.professor) {
        goto(`/sinai/actividades/profesor/${$session.user.email}`);
        
      } else if ($session.user?.dean) {
        goto("/sinai/actividades");
        
      } else {
        console.log("error, no prof or dean")
      };

    } else {
      const { message } = await res.clone().json();
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
