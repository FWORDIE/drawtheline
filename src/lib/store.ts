import { writable, type Writable } from 'svelte/store';
import type { PromptType, StickerType } from './types';

export const stickerArray: Writable<StickerType[]> = writable([]);

export const prompts: Writable<PromptType[]> = writable([]);

export const current: Writable<number> = writable(0);

export const devMode: Writable<boolean> = writable(false);

export const hideOthers: Writable<boolean> = writable(false);
export const started: Writable<boolean> = writable(false);
export const custom: Writable<boolean> = writable(false);
