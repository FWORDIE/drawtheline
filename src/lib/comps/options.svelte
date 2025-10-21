<script lang="ts">
	import { about, custom, lastPromptID, started, viewOptions } from '$lib/store';

	const on_key_down = (event: KeyboardEvent) => {
		console.log('typing');
		if (event.repeat) return;

		switch (event.key) {
			case '1':
				if ($viewOptions == 'latest') {
					$viewOptions = 'all';
					viewTypeText = `Hide Other's Answers`;
				} else if ($viewOptions == 'all') {
					$viewOptions = 'none';
					viewTypeText = `Show Last Answer`;
				} else {
					$viewOptions = 'latest';
					viewTypeText = `Show All Answers`;
				}
				event.preventDefault();
				break;
			case '2':
				if (!$started || $about) {
					break;
				}
				$custom = !$custom;
				event.preventDefault();
				break;
			case '3':
				console.log($about);
				if ($about) {
					$about = false;
				}
				$started = !$started;
				event.preventDefault();
				break;
			case '4':
				if (!$started) {
					$started = true;
				}
				$about = !$about;
				event.preventDefault();
				break;
			case '5':
				window.location.href = 'mailto:fred+theline@mildlyupset.com';
				event.preventDefault();
				break;
		}
	};

	$effect(() => {
		if ($viewOptions == 'all') {
			viewTypeText = `Hide Other's Answers`;
		} else if ($viewOptions == 'none') {
			viewTypeText = `Show Last Answer`;
		} else if ($viewOptions == 'latest') {
			viewTypeText = `Show All Answers`;
		}
	});

	let viewTypeText = $state(`Hide Other's Answers`);
</script>

<svelte:window on:keydown={on_key_down} />
<div class="optionsMenu">
	<p>Hot Keys:</p>
	<p>{viewTypeText} [1]</p>
	<p>{!$custom ? 'Write Your Own' : 'Place Defaults'} [2]</p>
	<p>{$started ? 'Show' : 'Hide'} Help [3]</p>
	<p>{$about ? 'Hide' : 'Show'} About [4]</p>
	<p>Contact Fred Wordie [5]</p>
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
		padding: calc(0.5 * var(--padding));
		pointer-events: none;
		background-color: var(--white);
		opacity: 0.7;
		p {
			color: blue;
		}
		@media (max-width: 600px) {
			display: none;
		}
	}
</style>
