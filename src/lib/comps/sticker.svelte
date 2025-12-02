<script lang="ts">
	import { lastPromptID, stickerArray, viewOptions } from '$lib/store';
	import type { StickerType } from '$lib/types';
	import { fade, scale as scaleFunc } from 'svelte/transition';
	let {
		id,
		x = 250,
		y = 250,
		text,
		rotate,
		z,
		placed,
		scale = 1,
		placing = false,
		colour = 'antiquewhite'
	}: StickerType & { z: number; scale?: number; placing?: boolean; colour?: string } = $props();
</script>

<div
	class="stickerWrapper"
	style="--x:{50 - x}%; --y:{50 -
		y}%; --rotate:{rotate}deg; --z:{z}; --scale:{scale}; --colour:{placed ? 'lightblue' : colour};;
	"
	class:top={$viewOptions == 'latest' && $lastPromptID == id}
	in:scaleFunc={{ duration: 1000, start: 1.5, opacity: 1 }}
	class:placed
>
	<div class="sticker">
		{#if placed || placing || $viewOptions == 'all' || ($viewOptions == 'latest' && $lastPromptID == id)}
			{#if z > $stickerArray.length - 200 || ($viewOptions == 'latest' && $lastPromptID == id)}
				<p class="text">
					{text}
				</p>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.stickerWrapper {
		z-index: var(--z);
		position: absolute;
		top: var(--y);
		left: var(--x);
		transform: translate(-50%, -50%) rotate(var(--rotate));
		/* &.hidden {
			height: 10px;
			width: 10px;
			overflow: hidden;
			.sticker {
				height: 10px;
				width: 10px;
				padding: 0;
			}
		} */
		&.top {
			z-index: 9999;
			.sticker {
				background-color: lightpink;
			}
		}
		&.placed {
			.sticker {
				background-color: var(--colour);
			}
		}
		.sticker {
			transform: scale(var(--scale));
			background: var(--colour);
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

			.text {
				font-size: clamp(8px, 1vw, 14px);
				text-align: center;
				@media (max-width: 600px) {
					font-size: clamp(12px, 1vw, 14px);
				}
			}
		}
	}
</style>
