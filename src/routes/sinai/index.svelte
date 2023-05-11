<!--
  Show options for login, register or public inquiries
-->
<script lang="ts" context="module">
  import { redirect } from "$lib/utils/session";
  
  export const load = redirect;
</script>
