<script lang="ts">
	import { resolve } from '$app/paths';
	import { getAvatarString, getPersonDisplayName } from '$lib/content';
	import type { Person } from '$lib/content/types';

	type Props = {
		person: Person;
	};

	let { person }: Props = $props();

	const displayName = $derived(getPersonDisplayName(person));
	const showHandle = $derived(!!person.name);
	const handleLabel = $derived(`@${person.slug}`);
	const avatarString = $derived(getAvatarString(person));
</script>

<a class="card" href={resolve('/people/[slug]', { slug: person.slug })}>
	{#if !avatarString}
		<img class="avatar" src={person.avatar} alt="" loading="lazy" />
	{:else}
		<div class="avatar placeholder" aria-hidden="true">
			{avatarString}
		</div>
	{/if}
	<div class="body">
		<h3>{showHandle ? person.name : displayName}</h3>
		{#if showHandle}
			<span class="muted handle">{handleLabel}</span>
		{/if}
		{#if person.pronouns}
			<span class="muted pronouns">{person.pronouns}</span>
		{/if}
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-5);
		background: var(--color-paper);
		border: var(--border);
		color: inherit;
		text-decoration: none;
		text-align: center;
	}

	.card:hover,
	.card:focus-visible {
		background: var(--color-ink);
		color: var(--color-paper);
		text-decoration: none;
	}

	.avatar {
		width: 5rem;
		height: 5rem;
	}

	.avatar.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 2.5rem;
		color: var(--color-paper);
		background: var(--color-ink);
	}

	.card:hover .avatar.placeholder {
		background: var(--color-accent);
		color: var(--color-ink);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		font-family: var(--font-mono);
	}

	.body h3 {
		margin: 0;
		font-size: 0.95rem;
		letter-spacing: 0.02em;
		font-family: inherit;
	}

	.pronouns {
		font-size: 0.8rem;
	}

	.handle {
		font-size: 0.8rem;
	}
</style>
