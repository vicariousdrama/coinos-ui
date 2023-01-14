import { get } from '$lib/utils';

export async function load({ params, parent, url }) {
	let { subject } = await parent();
	let { pubkey } = subject;

	let events = [];

	try {
		events = await get(`/${pubkey}/notes`);
	} catch (e) {
		console.log(`failed to fetch nostr events for ${pubkey}`, e);
	}

	events.map((e) => {
		e.seen = e.created_at;
	});

	return { events };
}
