<!--
  Redirects according if the user its logged in or not from `www.sinai.did.usb.ve`
-->
<script lang="ts" context="module">
  import { redirect } from "$lib/utils/session";
  
  export const load = redirect;
</script>
