<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = ({ error, status }) => {
		return {
			props: { error, status }
		}
	}
</script>

<script lang="ts">
	import { dev } from '$app/env';

	export let error: Error;
	export let status: number;
	</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="error">
	<h1>{status}</h1>

	<p>{error.message}</p>

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
