export interface QuizItem {
  id: string;
  question: string;
  options: Option[];
  answer: Answer;
  knowMore: KnowMore;
}

export interface KnowMore {
  link: string;
  description: string;
}

export interface Option {
  id: string;
  value: string;
}

export interface Answer {
  id: string;
  value: string;
}

export interface SubmittedItem {
  category: string;
  subCategory: string;
  questions: SubmittedItemAnswer[];
}

export interface SubmittedItemAnswer {
  selectedOptionId: string;
  isQuestionAnswered: boolean;
  question: QuizItem;
}
