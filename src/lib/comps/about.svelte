<script lang="ts">
	import { Spring } from 'svelte/motion';
	import Sticker from '$lib/comps/sticker.svelte';
	import type { StickerType } from '$lib/types';
	import { genUniqueId, randomNumber } from '$lib/funcs';
	import { about } from '$lib/store';
	const createSticker = () => {
		const sticker: StickerType = {
			id: genUniqueId(),
			x: 100,
			y: 100,
			text: 'Click to Hide',
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
<button onclick={() => ($about = false)} class="clicker">
	<Sticker {...thisSticker} z={999999} scale={1.6} placing={true} colour="lightgreen"></Sticker>
</button>

<div class="welcome">
	<p>
		In his 1976 seminal book, Computer Power and Human Reason, Joseph Weizenbaum postulates that the
		relevant issues around computing 'are neither technological nor even mathematical; they are
		ethical.' He goes on to say, 'They cannot be settled by asking questions beginning with "can."
		The limits of the applicability of computers are ultimately statable only in terms of oughts.'
	</p>
	<p>
		In 2025 where we are told by Silicon Valley, Journalists and Politicians that AI can, should and
		will do everything, it is more relevant than ever to head Weizenbaum's advice. As much as we are
		able, we should choose where to limit AI's integration into our lives. This website asks you to
		draw this line yourself by proposing a series of statements that you must choose if Ai should or
		shouldn't be responsible for doing.
	</p>
	<p>
		Made by <a href="www.fredwordie.com" target="_blank">Fred Wordie</a>
	</p>

	<button class="mobBut mobOnly" onclick={() => ($about = false)}>Explore The Board</button>
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
		background-color: lightsalmon;
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
			a {
				font-size: inherit;
				text-decoration: underline;
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
