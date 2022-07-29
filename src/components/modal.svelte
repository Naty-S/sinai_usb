<script>
	import { onDestroy } from 'svelte';

	export let title = '';
	export let id = -1;
	export let ok_text = '';
  export let close = () => {};
	export let is_active = false;

	let modal;

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close} />

<div
  id="invalidate_{id}"
  class="ui {is_active? "active" : ''} modal this-modal"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
>
	<div class="center aligned header">{title}</div>
	
	<div class="center aligned content">
		<slot></slot>
	</div>

	<!-- svelte-ignore a11y-autofocus -->
	<div class="center aligned actions">
		<div autofocus class="ui button" on:click={close}>Cancel</div>
		<div class="ui positive button">{ok_text}</div>
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
