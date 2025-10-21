<script lang="ts">
	import { Spring } from 'svelte/motion';
	import Sticker from '$lib/comps/sticker.svelte';
	import type { StickerType } from '$lib/types';
	import { genUniqueId, randomNumber } from '$lib/funcs';
	import { started, about } from '$lib/store';
	const createSticker = () => {
		const sticker: StickerType = {
			id: genUniqueId(),
			x: 100,
			y: 100,
			text: 'Click to Start',
			rotate: randomNumber(-3, 3),
			keyId: genUniqueId(),
			placed: false,
			custom: false
		};

		return sticker;
	};

	let viewport = $state({ w: 0, h: 0 });
	let thisSticker: StickerType = $state(createSticker());

	let coords = new Spring(
		{ x: 50, y: 50 },
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

<svelte:window
	bind:innerWidth={viewport.w}
	bind:innerHeight={viewport.h}
	on:mousemove={(e) => {
		coords.set({ x: (e.clientX / viewport.w) * 100, y: (e.clientY / viewport.h) * 100 });
	}}
/>
<button onclick={() => ($started = true)} class="clicker">
	<Sticker {...thisSticker} z={999999} scale={1.6} placing={true} colour="lightgreen"></Sticker>
</button>

<div class="welcome">
	<p>
		<strong>This is an collective exercise in deciding what we/you believe AI should do...</strong>
	</p>
	<p>Click to place each prompt above or below the line</p>
	<p>Explore other peoples decisions [1]</p>
	<p>Or write your own prompts [2]</p>
	<p class="mobOnly">
		Unfortuntly this doesn't work on phones but you can still explore other people's answers
	</p>
	<button class="mobBut mobOnly" onclick={() => (($started = true), ($about = true))}>About</button>
	<button class="mobBut mobOnly" onclick={() => ($started = true)}>Explore The Board</button>
</div>

<style lang="scss">
	button.clicker {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		z-index: 999999999;
		top: 0;
		@media (max-width: 600px) {
			display: none;
		}
	}
	.mobBut {
		background: lightgreen;
		display: flex;
		align-items: center;
		justify-content: center;
		width: auto;
		height: auto;
		border: solid 1.5px black;
		white-space: pre;
		padding: 1vw 1.5vw;
		margin: 1vw;
		--shadow-color: 0deg 0% 0%;
		--shadow-elevation-low:
			0.3px 0.6px 0.7px hsl(var(--shadow-color) / 0.12),
			0.6px 1.1px 1.4px -1.3px hsl(var(--shadow-color) / 0.12),
			1.5px 2.6px 3.4px -2.5px hsl(var(--shadow-color) / 0.12);
		box-shadow: var(--shadow-elevation-low);
		cursor: pointer;
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
		pointer-events: none;
		padding: calc(2 * var(--padding));

		@media (max-width: 600px) {
			width: calc(80dvw);
			max-width: 800px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			z-index: 9999999;
			pointer-events: unset;
		}
		p {
			margin-block: var(--padding);
			text-align: center;

			font-size: clamp(12px, 1.6vw, 22px);
			@media (max-width: 600px) {
				font-size: clamp(16px, 1.6vw, 26px);
			}
			strong {
				font-size: inherit;
			}
		}
		.mobOnly {
			display: none;
			@media (max-width: 600px) {
				font-weight: bold;
				display: block;
			}
		}
	}
</style>
