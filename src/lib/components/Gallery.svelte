<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { EventGalleryImage } from '$lib/content';
	import { prefersReducedMotion } from 'svelte/motion';

	type Props = {
		images: EventGalleryImage[];
		intervalMs?: number;
	};

	let { images, intervalMs = 5000 }: Props = $props();

	let currentIndex = $state(0);
	let timer: ReturnType<typeof setInterval> | undefined;

	function start() {
		stop();
		if (images.length < 2 || prefersReducedMotion.current) return;
		timer = setInterval(advance, intervalMs);
	}

	function stop() {
		if (timer !== undefined) {
			clearInterval(timer);
			timer = undefined;
		}
	}

	function advance() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	onDestroy(stop);

	$effect(() => {
		if (prefersReducedMotion.current) {
			stop();
		} else {
			start();
		}
	});
</script>

<div
	class="gallery"
	role="group"
	aria-roledescription="carousel"
	aria-label="Photos from past jams"
>
	{#each images as image, i (image.src)}
		<div class="slide" class:active={i === currentIndex}>
			<img src={image.src} alt={image.alt} loading={i === 0 ? 'eager' : 'lazy'} />
		</div>
	{/each}
</div>

<style>
	.gallery {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: var(--color-ink);
		border: var(--border);
		overflow: hidden;
	}

	.slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 600ms ease;
	}

	.slide.active {
		opacity: 1;
	}

	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	@media (prefers-reduced-motion: reduce) {
		.slide {
			transition: none;
		}
	}
</style>
