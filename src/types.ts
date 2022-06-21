export interface QuizItem {
  id: string;
  question: string;
  options: Option[];
  answer: Answer;
}

export interface Option {
  id: string;
  value: string;
}

export interface Answer {
  id: string;
  value: string;
}
