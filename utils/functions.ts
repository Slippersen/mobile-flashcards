import { Decks, Deck, Question } from "../types";

const dummyData: Decks = {
  "Deck 1": {
    title: "Deck 1",
    questions: [
      {
        question: "How are you?",
        answer: "OK",
      },
    ],
  },
};

/**
 * @param id: string
 * @returns Decks
 * @description return all of the decks along with their titles, questions and answers
 */
export const getDecks = (): Decks => {
  return dummyData;
};

/**
 * @param id: string
 * @returns Deck
 * @description take in a single id argument and return the deck associated with that id
 */
export const getDeck = (id: string): Deck => {
  return dummyData[id];
};

/**
 * @param title: string
 * @returns void
 * @description take in a single title argument and add it to the decks
 */
export const saveDeckTitle = (title: string) => {
  let newDeck: Deck = {
    title,
    questions: [],
  };

  dummyData[title] = newDeck;
};

/**
 * @param title: string
 * @param card: Question
 * @returns void
 * @description add the card to the list of questions for the deck with the associated title
 */
export const addCardToDeck = (title: string, card: Question) => {
  dummyData[title]?.questions.push(card);
};
