import { useNightModeStore } from '@stores/night-mode';
import { useEffect, useState } from 'react';

export function usePrediction() {
  const { getPredictionForCurrentMoonPhase } = useNightModeStore();
  const [prediction, setPrediction] = useState<string>('');

  useEffect(() => {
    getPredictionForCurrentMoonPhase().then(setPrediction).catch(console.error);
  }, [getPredictionForCurrentMoonPhase]);

  return prediction;
}
