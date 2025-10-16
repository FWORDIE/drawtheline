<script lang="ts">
	import sticker from '$lib/comps/sticker.svelte';
	import StickerArea from '$lib/comps/stickerArea.svelte';
	import type { DataType, PromptType, StickerType } from '$lib/types';

	let { data }: DataType = $props();
	import { prompts, stickerArray } from '$lib/store';
	import { genUniqueId, randomNumber } from '$lib/funcs';
	import { Spring } from 'svelte/motion';
	import Sticker from '$lib/comps/sticker.svelte';

	$prompts = data.prompts
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value) as PromptType[];

	$stickerArray = data.stickers.map((PBSticker) => {
		let prompt = $prompts.filter((prompt) => {
			return prompt.id == PBSticker.prompt;
		})[0];

		return {
			id: prompt.id,
			x: PBSticker.x,
			y: PBSticker.y,
			text: prompt.prompt,
			visable: true,
			rotate: randomNumber(-5, 5),
			keyId: genUniqueId()
		};
	});

	const createSticker = () => {
		const sticker: StickerType = {
			id: genUniqueId(),
			x: 50,
			y: 50,
			text: 'Click to Start',
			visable: true,
			rotate: randomNumber(-3, 3),
			keyId: genUniqueId()
		};

		return sticker;
	};

	let started = $state(false);

	let viewport = $state({ w: 0, h: 0 });
	let thisSticker: StickerType = $state(createSticker());

	let coords = new Spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	$effect(() => {
		thisSticker.x = -coords.current.x + 50;
		thisSticker.y = -coords.current.y + 50;
	});
</script>

<StickerArea {started}></StickerArea>
<svelte:window
	bind:innerWidth={viewport.w}
	bind:innerHeight={viewport.h}
	on:mousemove={(e) => {
		coords.set({ x: (e.clientX / viewport.w) * 100, y: (e.clientY / viewport.h) * 100 });
	}}
/>

{#if !started}
	<button onclick={() => (started = true)}>
		<Sticker {...thisSticker} z={999999} scale={1.6} placing={true} colour={true}></Sticker>
	</button>

	<div class="welcome">
		<p>
			In his 1976 seminal book, Computer Power and Human Reason, Joseph Weizenbaum postulates that
			the relevant issues around computing 'are neither technological nor even mathematical; they
			are ethical.' He goes on to say, 'They cannot be settled by asking questions beginning with
			"can." The limits of the applicability of computers are ultimately statable only in terms of
			oughts.'
		</p>
		<p>
			In 2025 where we are told by Silicon Valley, Journalists and Politicians that AI can, and
			will, do everything, it is more relevant than ever to head Weizenbaum's advice. As much as we
			are able, we should choose where to limit AI's integration into our lives. This website asks
			you to draw this line yourself by proposing a series of statements that you must choose if Ai
			should or shouldn't be responsible for doing.
		</p>
	</div>{/if}

<style lang="scss">
	button {
		z-index: 9999999;
	}
	.welcome {
		width: calc(50dvw);
		max-width: 800px;
		height: calc(auto);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: pink;
		z-index: 99999;
		border: solid 2px black;

		p {
			margin: calc(2 * var(--padding));
			text-align: center;
			font-size: clamp(12px, 1.6vw, 22px);
		}
	}
</style>
