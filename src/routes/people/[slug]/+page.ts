import { error } from '@sveltejs/kit';
import { getPerson, getPersonSlugs, getProjectsByPerson } from '$lib/content';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return getPersonSlugs().map((slug) => ({ slug }));
};

export const load: PageLoad = ({ params }) => {
	const person = getPerson(params.slug);
	if (!person) throw error(404, `Person "${params.slug}" not found`);
	const projects = getProjectsByPerson(params.slug);
	return { person, projects };
};
