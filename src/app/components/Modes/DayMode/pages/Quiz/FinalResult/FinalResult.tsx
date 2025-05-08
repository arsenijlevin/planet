import { useDayModeStore } from '@stores/day-mode';

import styles from './FinalResult.module.css';

export function FinalResult() {
  const { quiz, currentPage } = useDayModeStore();

  const correctAnswers = quiz.correctAnswers();
  const quizLength = quiz.questions.length;
  const isAllCorrect = correctAnswers === quizLength;

  return (
    <div className={styles.result}>
      <span className={styles.resultTitle}>{isAllCorrect ? 'Все верно!' : 'Упс('}</span>
      <div
        className={`${styles.resultCounter} ${isAllCorrect ? styles.resultCounterCorrect : styles.resultCounterWrong}`}
      >
        <span>{quiz.correctAnswers()}</span>
        <span>/</span>
        <span>{quiz.questions.length}</span>
      </div>
      {!isAllCorrect ? (
        <span className={styles.result__text}>Можешь попробовать еще раз</span>
      ) : isAllCorrect && currentPage === 'quiz-results-send-timer' ? (
        <span className={styles.result__text}>
          Космическая инсталляция может изменять свое звуковое состояние не чаще чем раз в Х минут.
          <br />
          <br />
          Следующее окно возможностей в 00:00
        </span>
      ) : isAllCorrect && currentPage === 'quiz-results-send' ? (
        <span className={styles.result__text}>↓↓↓↓↓↓↓↓↓↓↓↓↓</span>
      ) : currentPage === 'quiz-results' ? (
        <span className={styles.result__text}>
          Активный режим звуковой инсталляции запущен на следующие 4 минуты.
          <br />
          <br />
          Приятного прослушивания.
        </span>
      ) : null}
    </div>
  );
}
