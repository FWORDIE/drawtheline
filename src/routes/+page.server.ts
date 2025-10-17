import type { PageServerLoad } from './$types';
import PocketBase from 'pocketbase';
import { URL, PB_USER, PB_PASS } from '$env/static/private';

const pb = new PocketBase(URL);

const authData = await pb.collection('users').authWithPassword(PB_USER, PB_PASS);
export const load: PageServerLoad = async ({ params }) => {
	console.log(
		await pb.collection('stickers').getFullList({
			sort: '-created'
		})
	);
	return {
		prompts: await pb.collection('prompts').getFullList({
			sort: '-created',
			filter: 'approved = true'
		}),
		stickers: await pb.collection('stickers').getFullList({
			sort: '-created',
			filter: 'prompt.approved = true'
		})
	};
};
