import { Header } from '@/app/components/Header/Header';
import { useDayModeStore } from '@/stores/day-mode';

import styles from './Quiz.module.css';

interface QuizProps {
  showResult: boolean;
}

export function Quiz(props: QuizProps) {
  const { quiz } = useDayModeStore();

  const currentQuestion = quiz.currentQuestion();

  return (
    <main className={styles.quizPage}>
      <Header mode="day" />
      <div className={styles.heading}>
        <h1>
          Планетари<b>ум</b>
        </h1>
        <span>отгадайте 5 вопросов</span>
      </div>
      <div className={styles.quiz}>
        {!props.showResult ? (
          <>
            <div className={styles.counter}>
              <span>{quiz.answers.length}</span>
              <span>/</span>
              <span>{quiz.questions.length}</span>
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

                const correctAnswerStyle = lastUserAnswer && variant === correctVariant ? styles.correctAnswer : '';

                console.log('correctAnswerStyle', correctAnswerStyle);
                console.log('lastUserAnswer', lastUserAnswer);
                console.log('variant', variant);
                console.log('answeredQuestion?.correctVariant', correctVariant);

                const wrongAnswerStyle =
                  lastUserAnswer !== correctVariant && lastUserAnswer === variant ? styles.wrongAnswer : '';

                if (key.startsWith('variant_')) {
                  return (
                    <button
                      className={`${correctAnswerStyle} ${wrongAnswerStyle}`}
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
          <div className={styles.result}>
            <span>Результат</span>
            <br></br>
            <br></br>
            <span>{quiz.correctAnswers()}</span>
            <span>/</span>
            <span>{quiz.questions.length}</span>
          </div>
        )}

        <div className={styles.navigation}>
          {quiz.answers[quiz.answers.length - 1].userAnswer ? (
            <button onClick={quiz.answers.length === quiz.questions.length ? quiz.finish : quiz.nextQuestion}>
              <span>
                {props.showResult
                  ? 'Полетели!'
                  : quiz.answers.length === quiz.questions.length
                    ? 'Показать результат'
                    : 'Следующий вопрос'}
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
