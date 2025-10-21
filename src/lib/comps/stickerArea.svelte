<script lang="ts">
	import Sticker from './sticker.svelte';
	import PlacingSticker from './placingSticker.svelte';
	import { about, hideOthers, started, stickerArray } from '$lib/store';
	import { genUniqueId } from '$lib/funcs';
</script>

<div class="stickerArea">
	{#if $started && !$about}
		<PlacingSticker></PlacingSticker>
	{/if}

	{#each $stickerArray as sticker, i (sticker.keyId)}
		<Sticker {...sticker} z={10 + i} placing={false} scale={1}></Sticker>
	{/each}
</div>

<div class="background">
	<p class="text">WE SHOULD USE AI TO</p>
	<div class="line"></div>
	<p class="text">WE SHOULDN'T TO USE AI TO</p>
</div>

<div class="background back">
	<p class="text">WE SHOULD USE AI TO</p>
	<div class="line"></div>
	<p class="text">WE SHOULDN'T TO USE AI TO</p>
</div>

<style lang="scss">
	.stickerArea {
		width: calc(100dvw);
		height: calc(100dvh);
		position: absolute;
		top: 0;
		left: 0;
		/* opacity: 0.1; */
		overflow: hidden;
		/* background-color: pink; */
		z-index: 2;
	}
	.background {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		width: 100dvw;
		justify-content: space-around;
		align-items: center;
		position: relative;
		mix-blend-mode: difference;
		z-index: 99999;
		pointer-events: none;
		&.back {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 0;
			background-color: var(--white);
			mix-blend-mode: none;
		}
		.text {
			font-size: 5vh;
			font-weight: bold;
			text-align: center;
		}
		.line {
			position: fixed;
			height: 10px;
			width: calc(100dvw - 2 * var(--padding));
			top: 50%;
			left: 50%;
			background-color: black;
			transform: translate(-50%, 50%);
			z-index: 1;
		}
	}
</style>
