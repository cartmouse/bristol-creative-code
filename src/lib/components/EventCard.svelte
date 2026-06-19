<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import type { Event } from '$lib/content/types';

	type Props = {
		event: Event;
	};

	let { event }: Props = $props();
</script>

<a class="card" href="/events/{event.slug}">
	<div class="body">
		<h3>{event.title}</h3>
		<time class="muted" datetime={event.date}>{formatDate(event.date)}</time>
	</div>
</a>

<style>
	.card {
		display: block;
		background: var(--color-paper);
		border: var(--border);
		color: inherit;
		text-decoration: none;
	}

	.card:hover,
	.card:focus-visible {
		background: var(--color-ink);
		color: var(--color-paper);
		text-decoration: none;
	}

	.body {
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.body h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}
</style>
