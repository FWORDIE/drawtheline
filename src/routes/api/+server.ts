import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { URL, PB_USER, PB_PASS } from '$env/static/private';

const pb = new PocketBase(URL);

const authData = await pb.collection('users').authWithPassword(PB_USER, PB_PASS);

export const POST = async (event) => {
	const body = await event.request.json();
	const sticker = body.thisSticker;
	const response = await pb.collection('stickers').create({
		prompt: sticker.id,
		x: sticker.x,
		y: sticker.y
	});
	return json({ response }, { status: 201 });
};
