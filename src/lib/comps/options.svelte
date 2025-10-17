<script lang="ts">
	import { custom, hideOthers, started } from '$lib/store';

	const on_key_down = (event: KeyboardEvent) => {
		console.log('typing');
		if (event.repeat) return;

		switch (event.key) {
			case '1':
				$started = !$started;
				event.preventDefault();
				break;
			case '2':
				$hideOthers = !$hideOthers;
				event.preventDefault();
				break;
			case '3':
				$custom = !$custom;
				event.preventDefault();
				break;
			case '4':
				window.location.href = 'mailto:fred+theline@mildlyupset.com';
				event.preventDefault();
				break;
		}
	};
</script>

<svelte:window on:keydown={on_key_down} />
<div class="optionsMenu">
	<p>Hot Keys:</p>
	<p>{$started ? 'Show' : 'Hide'} Welcome Text [1]</p>
	<p>{$hideOthers ? 'Show' : 'Hide'} Other's Answers [2]</p>
	<p>{!$custom ? 'Write Your Own' : 'Place Defaults'} [3]</p>
	<p>Contact Fred Wordie [4]</p>
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
		@media (max-width: 600px) {
			display: none;
		}
	}
</style>
