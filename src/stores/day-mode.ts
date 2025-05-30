import { create } from 'zustand';

export type DayModePage =
  | 'start'
  | 'quiz-progress'
  | 'quiz-results-send-timer'
  | 'quiz-results-send'
  | 'quiz-results'
  | 'info';

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

export interface DayModeState {
  currentPage: DayModePage;
  quiz: {
    isFinished: boolean;
    isStarted: boolean;
    answers: QuizAnswer[];
    questions: QuizQuestion[];
  };
}

export interface DayModeActions {
  setCurrentPage: (page: DayModePage) => void;
  reset: () => void;
  quiz: {
    start: () => Promise<void>;
    answerQuestion: (answer: string) => void;
    finish: () => void;
    nextQuestion: () => void;
    currentQuestion: () => QuizQuestion;
    correctAnswers: () => number;
    restart: () => void;
    sendResultsTimer: () => void;
    sendResults: () => void;
    showResults: () => void;
  };
}

const initialState: DayModeState = {
  currentPage: 'start' as DayModePage,
  quiz: {
    isFinished: false,
    isStarted: false,
    answers: [],
    questions: [],
  },
};

export const useDayModeStore = create<DayModeActions & DayModeState>()((set, get) => ({
  ...initialState,
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
  reset: () => {
    set({
      ...initialState,
      quiz: {
        ...get().quiz,
        ...initialState.quiz,
      },
    });
  },

  quiz: {
    ...initialState.quiz,

    correctAnswers: () =>
      get().quiz.answers.filter((answer) => {
        const questionFromId = get().quiz.questions.find((q) => q.id === answer.questionId);

        return questionFromId?.correctVariant === answer.userAnswer;
      }).length,

    currentQuestion: () => get().quiz.questions[get().quiz.answers.length - 1],

    start: async () => {
      if ((get().quiz.isStarted || get().quiz.questions.length > 0) && !get().quiz.isFinished) return;

      const response = await fetch('questions.json');

      const json = (await response.json()) as QuizQuestion[];

      const randomQuestions = json.sort(() => 0.5 - Math.random()).slice(0, 5); // 5 random questions

      set((state) => ({
        quiz: {
          ...state.quiz,
          questions: randomQuestions,
          isStarted: true,
          isFinished: false,
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

    restart: () => {
      get().quiz.start();
    },

    finish: () => {
      set((state) => ({ quiz: { ...state.quiz, isFinished: true } }));

      get().quiz.sendResultsTimer();
    },

    sendResultsTimer: () => {
      get().setCurrentPage('quiz-results-send-timer');
    },

    sendResults: () => {
      get().setCurrentPage('quiz-results-send');
    },

    showResults: () => {
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
