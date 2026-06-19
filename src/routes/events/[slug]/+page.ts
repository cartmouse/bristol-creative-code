import { error } from '@sveltejs/kit';
import { getEvent, getEventSlugs, getProjectsByEvent } from '$lib/content';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return getEventSlugs().map((slug) => ({ slug }));
};

export const load: PageLoad = ({ params }) => {
	const event = getEvent(params.slug);
	if (!event) throw error(404, `Event "${params.slug}" not found`);
	const projects = getProjectsByEvent(params.slug);
	return { event, projects };
};
