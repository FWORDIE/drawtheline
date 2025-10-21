<script lang="ts">
	import StickerArea from '$lib/comps/stickerArea.svelte';
	import type { DataType, PromptType, StickerType } from '$lib/types';

	let { data }: DataType = $props();
	import { prompts, stickerArray, started, about } from '$lib/store';
	import { genUniqueId, randomNumber } from '$lib/funcs';

	import Welcome from '$lib/comps/welcome.svelte';
	import Options from '$lib/comps/options.svelte';
	import About from '$lib/comps/about.svelte';

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
			rotate: randomNumber(-5, 5),
			keyId: genUniqueId(),
			placed: false,
			custom: false
		};
	});
</script>

<StickerArea></StickerArea>
{#if $about}
	<About></About>
{/if}
{#if !$started}
	<Welcome></Welcome>
{/if}

<Options></Options>

<style lang="scss">
</style>
