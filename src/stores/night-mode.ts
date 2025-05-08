import { getMoonPhaseString } from '@shared/sun-moon-data';
import { create } from 'zustand';

export type NightModePage = 'start' | 'moon-awaiting' | 'info';

export interface NightModeStore {
  currentPage: NightModePage;
  setCurrentPage: (page: NightModePage) => void;
  predictions: { [key: string]: string[] } | null;
  fetchPredictions: () => Promise<NightModeStore['predictions']>;
  getPredictionForCurrentMoonPhase: () => Promise<string>;
}

export const useNightModeStore = create<NightModeStore>()((set, get) => ({
  currentPage: 'start',
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
  predictions: null,
  fetchPredictions: async () => {
    const loadedPredictions = get().predictions;

    if (loadedPredictions) return loadedPredictions;

    const response = await fetch('predictions.json');

    const json = await response.json();

    set({ predictions: json });

    return json;
  },
  getPredictionForCurrentMoonPhase: async () => {
    await get()
      .fetchPredictions()
      .catch((err) => console.error(err));

    const predictions = get().predictions;

    if (!predictions) return '';

    const currentMoonPhase = getMoonPhaseString();
    const predictionsForCurrentMoonPhase = predictions[currentMoonPhase];

    if (!predictionsForCurrentMoonPhase) return '';

    return predictionsForCurrentMoonPhase[Math.floor(Math.random() * predictionsForCurrentMoonPhase.length)];
  },
}));
