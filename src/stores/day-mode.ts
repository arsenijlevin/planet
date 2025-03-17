import { create } from 'zustand';

export type DayModePage = 'start' | 'quiz-progress' | 'quiz-results' | 'info';

export interface QuizAnswer {
  questionId: number;
  userAnswer: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  variant_1: string;
  variant_2: string;
  variant_3: string;
  variant_4: string;
  correctVariant: string;
}

export interface Quiz {
  isFinished: boolean;
  isStarted: boolean;
  answers: QuizAnswer[];
  questions: QuizQuestion[];
  start: () => Promise<void>;
  answerQuestion: (answer: string) => void;
  finish: () => void;
  nextQuestion: () => void;
  currentQuestion: () => QuizQuestion;
  correctAnswers: () => number;
}

export interface DayModeStore {
  currentPage: DayModePage;
  setCurrentPage: (page: DayModePage) => void;

  quiz: Quiz;
}

export const useDayModeStore = create<DayModeStore>()((set, get) => ({
  currentPage: 'start',
  setCurrentPage: (page) => set(() => ({ currentPage: page })),

  quiz: {
    isFinished: false,
    isStarted: false,

    correctAnswers: () =>
      get().quiz.answers.filter((answer) => {
        const questionFromId = get().quiz.questions.find((q) => q.id === answer.questionId);

        return questionFromId?.correctVariant === answer.userAnswer;
      }).length,

    questions: [],
    answers: [],

    currentQuestion: () => get().quiz.questions[get().quiz.answers.length - 1],

    start: async () => {
      if (get().quiz.isStarted || get().quiz.questions.length > 0) return;

      const response = await fetch('/questions.json');

      const json = (await response.json()) as QuizQuestion[];

      const randomQuestions = json.sort(() => 0.5 - Math.random()).slice(0, 5); // 5 random questions

      set((state) => ({
        quiz: {
          ...state.quiz,
          questions: randomQuestions,
          isStarted: true,
          answers: [
            {
              questionId: randomQuestions[0].id,
              userAnswer: '',
            },
          ],
        },
      }));

      get().setCurrentPage('quiz-progress');
    },

    finish: () => {
      set((state) => ({ quiz: { ...state.quiz, isFinished: true } }));

      get().setCurrentPage('quiz-results');
    },

    answerQuestion: (answer: string) => {
      if (get().quiz.answers[get().quiz.answers.length - 1].userAnswer) return;

      set((state) => ({
        quiz: {
          ...state.quiz,
          answers: state.quiz.answers.map((ans, index) =>
            index === state.quiz.answers.length - 1 ? { ...ans, userAnswer: answer } : ans,
          ),
        },
      }));

      console.log(get());
    },

    nextQuestion: () =>
      set((state) => ({
        quiz: {
          ...state.quiz,
          answers: [
            ...state.quiz.answers,
            {
              questionId: state.quiz.questions[state.quiz.answers.length].id,
              userAnswer: '',
            },
          ],
        },
      })),
  },
}));
