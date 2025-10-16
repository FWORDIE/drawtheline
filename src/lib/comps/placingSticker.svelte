<script lang="ts">
	import type { StickerType } from '$lib/types';

	import { Spring } from 'svelte/motion';
	import Sticker from './sticker.svelte';
	import { delay, genUniqueId, pickRandom, randomInteger, randomNumber } from '$lib/funcs';
	import { current, prompts, stickerArray } from '$lib/store';

	let placing = $state(true);

	const createSticker = () => {
		const sticker: StickerType = {
			id: $prompts[$current].id,
			x: 50,
			y: 50,
			text: $prompts[$current].prompt,
			visable: true,
			rotate: randomNumber(-5, 5),
			keyId: genUniqueId()
		};
		$current++;

		return sticker;
	};

	let viewport = $state({ w: 0, h: 0 });

	let coords = new Spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	let thisSticker: StickerType = $state(createSticker());

	$effect(() => {
		thisSticker.x = -coords.current.x + 50;
		thisSticker.y = -coords.current.y + 50;
	});

	const placeSticker = async () => {
		// console.log(thisSticker.text);
		$stickerArray = [...$stickerArray, thisSticker];
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ thisSticker }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
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
</script>

<svelte:window
	bind:innerWidth={viewport.w}
	bind:innerHeight={viewport.h}
	on:mousemove={(e) => {
		coords.set({ x: (e.clientX / viewport.w) * 100, y: (e.clientY / viewport.h) * 100 });
	}}
/>
{#if placing}
	<button onclick={placeSticker}>
		<Sticker {...thisSticker} z={99999} scale={1.6} placing={true}></Sticker>
	</button>
{/if}

<style lang="scss">
	button {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: none;
		z-index: 99999;
	}
</style>
