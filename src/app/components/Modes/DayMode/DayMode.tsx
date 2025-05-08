import { useDayModeStore } from '@stores/day-mode';

import { Info } from './pages/Info/Info';
import { Quiz } from './pages/Quiz/Quiz';
import { StartPage } from './pages/StartPage/StartPage';

export function DayMode() {
  const currentPage = useDayModeStore((state) => state.currentPage);

  return (
    <>
      {currentPage === 'start' ? <StartPage /> : null}
      {(currentPage === 'quiz-progress' ||
        currentPage === 'quiz-results' ||
        currentPage === 'quiz-results-send' ||
        currentPage === 'quiz-results-send-timer') && (
        <Quiz
          showResult={
            currentPage === 'quiz-results' ||
            currentPage === 'quiz-results-send' ||
            currentPage === 'quiz-results-send-timer'
          }
        />
      )}
      {currentPage === 'info' ? <Info /> : null}
    </>
  );
}
