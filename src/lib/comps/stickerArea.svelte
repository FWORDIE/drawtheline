<script lang="ts">
	import Sticker from './sticker.svelte';
	import PlacingSticker from './placingSticker.svelte';
	import { stickerArray } from '$lib/store';
	import { genUniqueId } from '$lib/funcs';

	let { started } = $props();
</script>

<div class="stickerArea">
	{#if started}
		<PlacingSticker></PlacingSticker>
	{/if}

	{#each $stickerArray.filter((sticker) => {
		return sticker.visable;
	}) as sticker, i (sticker.keyId)}
		<Sticker {...sticker} z={10 + i} placing={false} scale={1}></Sticker>
	{/each}
</div>

<div class="background">
	<p class="text">WE SHOULD USE AI TO</p>
	<div class="line"></div>
	<p class="text">WE SHOULDN'T TO USE AI TO</p>
</div>

<style lang="scss">
	.stickerArea {
		width: calc(85dvw);
		height: calc(90dvh);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: lightgray 1px dotted;
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
		mix-blend-mode: overlay;
		z-index: 99999;
		pointer-events: none;
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
