import { error } from '@sveltejs/kit';
import { getProject, getProjectSlugs, getEvent, getPerson } from '$lib/content';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return getProjectSlugs().map((slug) => ({ slug }));
};

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) throw error(404, `Project "${params.slug}" not found`);
	const event = getEvent(project.event);
	if (!event) {
		throw error(500, `Project "${params.slug}" references missing event "${project.event}"`);
	}
	const author = project.author ? getPerson(project.author) : undefined;
	return { project, event, author };
};
