<!-- 
	@component
	Modal for actions notifications

	Props:
	* `id`: string
	* `title`: string
	* `ok_text`: string (optional)
	* `close_text`: string (optional). Default "Cancelar"
	* `align`: string (optional)
	* `is_active`: boolean;
	* `close`: function (optional). Default: () => {}
	* `confirm`: function (optional). Default: () => {}
 -->
<script lang="ts">
	import { onDestroy } from "svelte";

	export let id: string;
	export let title: string;
	export let ok_text = '';
	export let close_text = "Cancelar";
	export let align = '';
	export let is_active: boolean;
  export let close = () => {};
  export let confirm = () => {};

	let modal: any;

	const handle_keydown = function (e: any) {
		if (e.key === "Escape") {
			close();
			return;
		};

		if (e.key === "Tab") {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable: any[] = Array.from(nodes).filter((n: any) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		};
	};

	const previously_focused = typeof document !== "undefined" && document.documentElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	};
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close} />

<div
  {id}
  class="ui {is_active ? "active" : ''} modal this-modal"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
>
	<div class="center aligned header">{title}</div>
	
	<div class="{align} aligned content">
		<slot></slot>
	</div>

	<!-- svelte-ignore a11y-autofocus -->
	<div class="center aligned actions">
		<button type="button" class="ui button" on:click={close}>
			{close_text}
		</button>
		{#if ok_text !== ''}
			<button type="button" class="ui positive button" on:click={confirm}>
				{ok_text}
			</button>
		{/if}
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
	}

	.this-modal {
		position: fixed;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}
</style>
