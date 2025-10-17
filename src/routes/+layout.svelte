<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/sass/global.scss';

	let { children } = $props();
	// Tag
	console.log(
		'%c * Made by Fred Wordie, Say hi if it dont work * ',
		'background: #f4f1e6; color: #115545; padding: 10px 20px; line-height:100px; '
	);
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<title>Draw The Line</title>
</svelte:head>

{@render children?.()}
