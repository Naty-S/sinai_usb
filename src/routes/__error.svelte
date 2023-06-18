<!-- 
	Error page
 -->
<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = ({ error, status }) => {
		return {
			props: { error, status }
		};
	};
</script>

<script lang="ts">
	import { dev } from "$app/env";
	import { goto } from "$app/navigation";

	export let error: Error;
	export let status: number = 500;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="error">
	<h1>{status}</h1>

	<p><strong>{error.message}</strong></p>

  <button type="button" class="ui positive button" on:click={() => goto("/")}>
    Volver a la página principal
  </button>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>

<style>
	.error {
		display: grid;
		gap: var(--spacing-32);
		padding: var(--spacing-24) var(--spacing-32);
		place-items: center;
	}
</style>
