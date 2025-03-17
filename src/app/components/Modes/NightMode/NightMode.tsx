import { useNightModeStore } from '@stores/night-mode';

import { MoonAwaitingPage } from './pages/MoonAwaiting/MoonAwaiting';
import { StartPage } from './pages/StartPage/StartPage';

export function NightMode() {
  const currentPage = useNightModeStore((state) => state.currentPage);

  return (
    <>
      {currentPage === 'start' ? <StartPage /> : null}
      {currentPage === 'moon-awaiting' ? <MoonAwaitingPage /> : null}
    </>
  );
}
