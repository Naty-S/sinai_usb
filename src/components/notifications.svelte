<script lang="ts">
  import { session } from "$app/stores";

  $: user = $session.user;
</script>

{#if user?.pending_professors && (user?.dean || user?.professor?.coord_chief)}
  <div class="ui center aligned floating icon mini orange message">
    <!-- <a class="uk-alert-close" uk-close></a> -->
    <i class="exclamation icon"></i>
    <div class="content">
      <div class="header">
        Ha profesores pendientes por validar
      </div>
      <a href="/sinai/validaciones/nuevos_profesores">
        Ver Profesores
      </a>
    </div>
  </div>
{/if}
