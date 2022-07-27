<script lang="ts">
  const is_err = false;
  let email = '';
  let pass = '';
</script>

<div class="ui large form" class:error="{is_err}">

  <div class="required field" class:error="{is_err}">
    <label for="">Correo</label>
    <input type="email" bind:value={email}>
  </div>

  <div class="required field" class:error="{is_err}">
    <label for="">Contrasena</label>
    <input type="password" bind:value={pass}>
  </div>

  <button type="submit" class="ui blue button">Iniciar Sesion</button>
  
</div>
