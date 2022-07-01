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
  subCategory: string;
  questions: SubmittedItemAnswer[];
}

export interface SubmittedItemAnswer {
  subCategory: string;
  selectedOptionId: string;
  isQuestionAnswered: boolean;
  question: QuizItem;
}
