<script lang="ts">
	import type { StickerType } from '$lib/types';

	import { Spring } from 'svelte/motion';
	import Sticker from './sticker.svelte';
	import { delay, genUniqueId, pickRandom, randomInteger, randomNumber } from '$lib/funcs';
	import { current, custom, devMode, lastPromptID, prompts, stickerArray } from '$lib/store';

	let placing = $state(true);

	let customText = $state('');

	const createSticker = () => {
		const sticker: StickerType = {
			id: $prompts[$current].id,
			x: 0,
			y: 0,
			text: $prompts[$current].prompt,
			rotate: randomNumber(-5, 5),
			keyId: genUniqueId(),
			placed: true,
			custom: false
		};

		return sticker;
	};

	let viewport = $state({ w: 0, h: 0 });

	let coords = new Spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	let thisSticker: StickerType = $state(createSticker());

	$effect(() => {
		thisSticker.x = -coords.current.x + 50;
		thisSticker.y = -coords.current.y + 50;
		if ($custom) {
			if (!thisSticker.custom) {
				console.log('Making new Custom');
				thisSticker.id = genUniqueId();
				thisSticker.custom = true;
			}
			textBox.focus();
			thisSticker.text = customText ? customText : 'Type and Then Place';
		} else {
			if (thisSticker.custom) {
				thisSticker = createSticker();
			}
		}
	});

	const placeSticker = async () => {
		if ($custom && !customText) {
			return;
		}

		$stickerArray = [...$stickerArray, thisSticker];
		if (!$devMode) {
			const response = await fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ thisSticker }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		customText = '';

		if (!$custom) {
			$current++;
		}

		$lastPromptID = thisSticker.id;

		// console.log(thisSticker);
		if ($current > $prompts.length - 1) {
			alert('Out of Prompts, email me with more? (fred@mildlyupset.com)');
			return;
		}
		placing = false;
		thisSticker = createSticker();

		await delay(1000);
		placing = true;
	};

	let textBox: HTMLInputElement;
</script>

<input bind:value={customText} bind:this={textBox} maxlength="68" />
<svelte:window
	bind:innerWidth={viewport.w}
	bind:innerHeight={viewport.h}
	on:mousemove={(e) => {
		coords.set({ x: (e.clientX / viewport.w) * 100, y: (e.clientY / viewport.h) * 100 });
	}}
/>
{#if placing}
	<button onclick={placeSticker}>
		<Sticker {...thisSticker} z={99999} scale={1.6} placing={true} colour="lightblue"></Sticker>
	</button>
{/if}

<style lang="scss">
	input {
		height: 0px;
		border: none;
		opacity: 0;
		@media (max-width: 600px) {
			display: none;
		}
	}
	button {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		z-index: 99999;
		top: 0;
		@media (max-width: 600px) {
			display: none;
		}
	}
</style>
