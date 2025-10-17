export type StickerType = {
	id: string;
	x: number;
	y: number;
	text: string;
	visable: boolean;
	rotate: number;
	keyId: string;
	placed: boolean;
};

export type DataType = {
	data: { prompts: PromptType[]; stickers: StickerPBType[] };
};

export type StickerPBType = {
	collectionId: string;
	collectionName: string;
	id: string;
	prompt: string;
	x: number;
	y: number;
	approved: boolean;
	created: string;
	updated: string;
};

export type PromptType = {
	collectionId: string;
	collectionName: string;
	id: string;
	prompt: string;
	approved: boolean;
	created: string;
	updated: string;
};
