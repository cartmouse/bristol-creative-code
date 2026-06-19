import { getEvents, isUpcoming } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const all = getEvents();
	const upcoming = all.filter(isUpcoming);
	const past = all.filter((e) => !isUpcoming(e));
	return { upcoming, past };
};
