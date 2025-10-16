import { writable, type Writable } from 'svelte/store';
import type { PromptType, StickerType } from './types';

export const stickerArray: Writable<StickerType[]> = writable([]);

export const prompts: Writable<PromptType[]> = writable([]);

export const current: Writable<number> = writable(0);
