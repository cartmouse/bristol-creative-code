<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import type { Event } from '$lib/content/types';

	type Props = { event: Event; hideDetailsButton?: boolean };
	let { event, hideDetailsButton }: Props = $props();
</script>

<aside class="card-next">
	<h2 class="title">
		{event.title}
	</h2>
	<p class="meta">
		<time datetime={event.date}>{formatDate(event.date)}</time>
	</p>
	<div class="actions">
		{#if !hideDetailsButton}
			<a class="btn" href="/about">Details</a>
		{/if}
		{#if event.rsvp}
			<a class="btn btn-accent" href={event.rsvp} rel="noopener noreferrer" target="_blank">RSVP</a>
		{/if}
	</div>
</aside>

<style>
	.card-next {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-5);
		border: var(--border);
		color: var(--color-ink);
	}

	.title {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1.1;
	}

	.meta {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.9rem;
	}

	.actions {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		margin-top: var(--space-2);
	}
</style>
