<script lang="ts">
	import type { StickerType } from '$lib/types';
	import { fade, scale as scaleFunc } from 'svelte/transition';
	let {
		id,
		x,
		y,
		text,
		visable,
		rotate,
		z,
		scale = 1,
		placing = false,
		colour = false
	}: StickerType & { z: number; scale: number; placing: boolean; colour: boolean } = $props();
</script>

<div
	class="stickerWrapper"
	style="--x:{50 - x}%; --y:{50 - y}%; --rotate:{rotate}deg; --z:{z}; --scale:{scale};
	"
	in:scaleFunc={{ duration: 1000, start: 1.5, opacity: 1 }}
>
	<div class="sticker" class:colour>
		<p class="text">
			{text}
		</p>
	</div>
</div>

<style lang="scss">
	.stickerWrapper {
		z-index: var(--z);
		position: absolute;
		top: var(--y);
		left: var(--x);
		transform: translate(-50%, -50%) rotate(var(--rotate));
		.sticker {
			transform: scale(var(--scale));
			background: #bcd6ff;
			display: flex;
			align-items: center;
			justify-content: center;
			width: auto;
			height: auto;
			border: solid 1.5px black;
			white-space: pre;
			padding: 0.35vw 0.75vw;
			--shadow-color: 0deg 0% 0%;
			--shadow-elevation-low:
				0.3px 0.6px 0.7px hsl(var(--shadow-color) / 0.12),
				0.6px 1.1px 1.4px -1.3px hsl(var(--shadow-color) / 0.12),
				1.5px 2.6px 3.4px -2.5px hsl(var(--shadow-color) / 0.12);
			box-shadow: var(--shadow-elevation-low);
			cursor: pointer;

			&.colour {
				background: palegreen;
			}
			.text {
				font-size: clamp(8px, 1vw, 14px);
				text-align: center;
			}
		}
	}
</style>
