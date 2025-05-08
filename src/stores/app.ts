import { isNight } from '@shared/sun-moon-data';
import { create } from 'zustand';

export type Mode = 'day' | 'night';

export interface AppState {
  currentMode: Mode;
}

const pathname = window.location.href;

const isDayByPathname = pathname.includes('day');
const isNightByPathname = pathname.includes('night');

export const useAppState = create<AppState>()(() => ({
  currentMode: isNightByPathname ? 'night' : isDayByPathname ? 'day' : isNight ? 'night' : 'day', // TODO: FIX
}));
