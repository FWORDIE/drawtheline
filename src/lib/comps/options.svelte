<script lang="ts">
	import { hideOthers, started } from '$lib/store';

	const on_key_down = (event: KeyboardEvent) => {
		if (event.repeat) return;

		switch (event.key) {
			case 'c':
				window.location.href = 'mailto:fred+theline@mildlyupset.com';
				event.preventDefault();
				break;

			case 'h':
				$hideOthers = !$hideOthers;
				event.preventDefault();
				break;

			case 'w':
				$started = !$started;
				event.preventDefault();
				break;
		}
	};
</script>

<svelte:window on:keydown={on_key_down} />
<div class="optionsMenu">
	<p>Hot Keys:</p>
	<p>{$hideOthers ? 'Show' : 'Hide'} Other's Answers [h]</p>
	<p>{$started ? 'Show' : 'Hide'} Welcome Text [w]</p>
	<p>Contact Fred Wordie [c]</p>
</div>

<style lang="scss">
	.optionsMenu {
		position: fixed;
		bottom: 0;
		left: auto;
		display: flex;
		gap: calc(0.5 * var(--padding));
		font-weight: bold;
		z-index: 9999999999;
		margin: calc(0.5 * var(--padding));
		pointer-events: none;
	}
</style>
