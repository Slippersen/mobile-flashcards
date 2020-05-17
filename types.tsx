export interface Decks {
  [id: string]: Deck;
}

export interface Deck {
  title: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
}

export interface QuizResult {
  deckTitle: string;
  percentage: number;
  date: Date;
}
