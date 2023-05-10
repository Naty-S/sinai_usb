<script lang="ts" context="module">
  import { redirect } from "$lib/shared/session";
  
  export const load = redirect;

</script>
<script lang="ts">
  import { onMount } from "svelte";

  import { session, page } from "$app/stores";

  
  $: if ($page.url.searchParams.has("validated")) { onMount(async () => {
    
      const jwt = $page.url.searchParams.get("validated");
      const user = jwt ? JSON.parse(jwt) : null;

      $session.user = user;
    })
  };
</script>
