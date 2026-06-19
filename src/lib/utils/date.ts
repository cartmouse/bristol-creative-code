const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export function formatDate(iso: string): string {
	const [y, m, d] = iso.split('-').map(Number);
	return `${d ?? 1} ${MONTHS[(m ?? 1) - 1]} ${y}`;
}

export function formatDateRange(start: string, end?: string): string {
	if (!end || end === start) return formatDate(start);
	const s = new Date(start);
	const e = new Date(end);
	if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
		const sDay = s.getDate();
		const eDay = e.getDate();
		const month = MONTHS[s.getMonth()];
		return `${month} ${sDay}–${eDay}, ${s.getFullYear()}`;
	}
	return `${formatDate(start)} – ${formatDate(end)}`;
}
