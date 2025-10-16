// https://www.newline.co/books/beginners-guide-to-typescript/generating-unique-ids?file=README.md

import type { SassNumber } from 'sass';

export const genUniqueId = () => {
	const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

	const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

	return `${dateStr}-${randomStr}`;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function randomInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNumber(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export const pickRandom = (list: string[]) => list[randomNumber(0, list.length - 1)];
