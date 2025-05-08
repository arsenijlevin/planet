import { Header } from '@/app/components/Header/Header';
import { useDayModeStore } from '@/stores/day-mode';
import arrowBigIcon from '@assets/arrow-big.svg';
import rocketIcon from '@assets/rocket.svg';

import { FinalResult } from './FinalResult/FinalResult';
import styles from './Quiz.module.css';

interface QuizProps {
  showResult: boolean;
}

export function Quiz(props: QuizProps) {
  const { quiz, currentPage } = useDayModeStore();

  const currentQuestion = quiz.currentQuestion();

  const isFinalResult = quiz.answers.length === quiz.questions.length && props.showResult;
  const correctAnswers = quiz.correctAnswers();
  const quizLength = quiz.questions.length;
  const isAllCorrect = correctAnswers === quizLength;

  console.log(quiz);

  return (
    <div className={styles.quizPageWrapper}>
      <main className={styles.quizPage}>
        <Header mode="day" />
        <div className={styles.heading}>
          <h1>
            <b>Планетари</b>ум
          </h1>
        </div>
        <div className={styles.quiz}>
          {!props.showResult ? (
            <>
              <div className={styles.counter}>
                <span>
                  <b>{quiz.answers.length}</b>
                </span>
                <span>/</span>
                <span>
                  <b>{quiz.questions.length}</b>
                </span>
              </div>
              <div className={styles.question}>
                <p>{currentQuestion.question}</p>
              </div>
              <div className={styles.answerButtons}>
                {Object.keys(currentQuestion).map((key) => {
                  const variantKey = key as keyof typeof currentQuestion;
                  const variant = currentQuestion[variantKey].toString();
                  const lastAnswer = quiz.answers[quiz.answers.length - 1];
                  const lastUserAnswer = lastAnswer.userAnswer.toString();
                  const answeredQuestion = quiz.questions.find((question) => question.id === lastAnswer.questionId);
                  const correctVariant = answeredQuestion?.correctVariant.toString();

                  console.log('correctVariant', correctVariant);

                  const correctAnswerStyle = lastUserAnswer && variant === correctVariant ? styles.correctAnswer : '';

                  const wrongAnswerStyle =
                    lastUserAnswer !== correctVariant && lastUserAnswer === variant ? styles.wrongAnswer : '';

                  const unselectedAnswerStyle =
                    !correctAnswerStyle && !wrongAnswerStyle && lastUserAnswer ? styles.unselectedAnswer : '';

                  if (key.startsWith('variant_')) {
                    return (
                      <button
                        className={`${correctAnswerStyle} ${wrongAnswerStyle} ${unselectedAnswerStyle}`.trim()}
                        onClick={() => quiz.answerQuestion(variant)}
                        key={key}
                      >
                        <span>{variant}</span>
                      </button>
                    );
                  }
                })}
              </div>
            </>
          ) : (
            <FinalResult />
          )}
        </div>
        <div className={`${styles.navigation} ${isFinalResult ? styles.navigation__result : ''}`}>
          {quiz.answers[quiz.answers.length - 1].userAnswer &&
          (currentPage === 'quiz-progress' ||
            currentPage === 'quiz-results-send-timer' ||
            currentPage === 'quiz-results-send') ? (
            <button
              className={
                isAllCorrect && isFinalResult && currentPage === 'quiz-results-send-timer' ? styles.disabled : ''
              }
              onClick={
                !isAllCorrect && props.showResult
                  ? quiz.restart
                  : isAllCorrect && props.showResult && currentPage === 'quiz-results-send-timer'
                    ? quiz.sendResults
                    : isAllCorrect && isFinalResult
                      ? quiz.showResults
                      : quiz.answers.length === quiz.questions.length
                        ? quiz.finish
                        : quiz.nextQuestion
              }
            >
              {quiz.answers.length !== quiz.questions.length ? (
                <>
                  <span>следующий вопрос</span>
                  <img src={arrowBigIcon} alt="" />
                </>
              ) : null}

              {quiz.answers.length === quiz.questions.length && !props.showResult ? (
                <>
                  <span>результат</span>
                </>
              ) : null}
              {isAllCorrect && isFinalResult && currentPage === 'quiz-results-send' ? (
                <>
                  <img src={rocketIcon} alt="" />
                  <span>ПОЕХАЛИ!</span>
                  <img src={rocketIcon} alt="" />
                </>
              ) : null}
              {isAllCorrect && isFinalResult && currentPage === 'quiz-results-send-timer' ? (
                <>
                  <img src={rocketIcon} alt="" />
                  <span>отправка через 22:48</span>
                  <img src={rocketIcon} alt="" />
                </>
              ) : null}
              {!isAllCorrect && props.showResult ? (
                <>
                  <span>пройти заново</span>
                </>
              ) : null}

              {/* 
                                <span>
                    {props.showResult
                      ? 'Полетели!'
                      : quiz.answers.length === quiz.questions.length
                        ? 'результат'
                        : 'Следующий вопрос'}
                  </span> */}
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
}
