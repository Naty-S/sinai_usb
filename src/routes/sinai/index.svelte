<!--
  Redirects according if the user its logged in or not from `www.sinai.did.usb.ve/sinai`
-->
<script lang="ts" context="module">
  import { redirect } from "$lib/shared/session";
  
  export const load = redirect;
</script>
