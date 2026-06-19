import { getProjects } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { projects: getProjects() };
};
