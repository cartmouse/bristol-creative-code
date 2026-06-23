import { getEventGalleryImages, getNextEvent, getProjects } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const allProjects = getProjects();
	return {
		nextEvent: getNextEvent(),
		recentProjects: allProjects.slice(0, 6),
		galleryImages: getEventGalleryImages()
	};
};
