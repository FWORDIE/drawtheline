import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { URL, PB_USER, PB_PASS } from '$env/static/private';

const pb = new PocketBase(URL);

const authData = await pb.collection('users').authWithPassword(PB_USER, PB_PASS);

export const POST = async (event) => {
	const body = await event.request.json();

	const sticker = body.thisSticker;
	if (sticker.custom) {
		const promptResponse = await pb.collection('prompts').create({
			prompt: sticker.text,
			approved: false
		});

		const stickerResponse = await pb.collection('stickers').create({
			prompt: promptResponse.id,
			x: sticker.x,
			y: sticker.y
		});
		return json({ stickerResponse }, { status: 201 });
	} else {
		const stickerResponse = await pb.collection('stickers').create({
			prompt: sticker.id,
			x: sticker.x,
			y: sticker.y
		});
		return json({ stickerResponse }, { status: 201 });
	}
};
