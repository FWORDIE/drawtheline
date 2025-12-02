import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { URL, PB_USER, PB_PASS } from '$env/static/private';

const pb = new PocketBase(URL);

const authData = await pb.collection('users').authWithPassword(PB_USER, PB_PASS);

export const GET = async (event) => {
	return json({
		prompts: await pb.collection('prompts').getFullList({
			sort: '-created',
			filter: 'approved = true'
		}),
		stickers: await pb.collection('stickers').getFullList({
			sort: '-created',
			filter: 'prompt.approved = true'
		})
	});
};
