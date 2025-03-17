import { useDayModeStore } from '@stores/day-mode';

import { Quiz } from './pages/Quiz/Quiz';
import { StartPage } from './pages/StartPage/StartPage';

export function DayMode() {
  const currentPage = useDayModeStore((state) => state.currentPage);

  return (
    <>
      {currentPage === 'start' ? <StartPage /> : null}
      {(currentPage === 'quiz-progress' || currentPage === 'quiz-results') && (
        <Quiz showResult={currentPage === 'quiz-results'} />
      )}
    </>
  );
}
