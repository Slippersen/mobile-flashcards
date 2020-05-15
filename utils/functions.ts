import { AsyncStorage } from "react-native";
import { Decks, Deck, Question } from "../types";

const DECKS_STORAGE_KEY = "mobile-flashcards:decks";

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
  "Deck 2": {
    title: "Deck 2",
    questions: [
      {
        question: "How are you?",
        answer: "Not OK",
      },
      {
        question: "How are they?",
        answer: "Not OK",
      },
    ],
  },
  "Deck 3": {
    title: "Deck 3",
    questions: [],
  },
  "Deck 4": {
    title: "Deck 4",
    questions: [],
  },
  "Deck 5": {
    title: "Deck 5",
    questions: [],
  },
  "Deck 6": {
    title: "Deck 6",
    questions: [],
  },
};

/**
 * @param id: string
 * @returns Decks
 * @description return all of the decks along with their titles, questions and answers
 */
export const getDecks = async (): Promise<Decks> => {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (decks !== null) {
    return JSON.parse(decks);
  } else {
    // store initial dummy data in AsyncStorage
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));
  }

  return dummyData;
};

/**
 * @param id: string
 * @returns Deck
 * @description take in a single id argument and return the deck associated with that id
 */
export const getDeck = async (id: string): Promise<Deck> => {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (decks !== null) {
    const decksObject = JSON.parse(decks);
    return decksObject[id] || null;
  }

  return dummyData[id];
};

/**
 * @param title: string
 * @returns void
 * @description take in a single title argument and add it to the decks
 */
export const saveDeckTitle = async (title: string) => {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  let newDeck: Deck = {
    title,
    questions: [],
  };
  if (decks !== null) {
    const decksObject = JSON.parse(decks);
    decksObject[title] = newDeck;
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksObject));
  }
};

/**
 * @param title: string
 * @returns void
 * @description take in a single title argument and removes the corresponding deck from the decks
 */
export const deleteDeck = async (title: string) => {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (decks !== null) {
    const decksObject = JSON.parse(decks);
    delete decksObject[title];
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksObject));
  }
};

/**
 * @param title: string
 * @param card: Question
 * @returns void
 * @description add the card to the list of questions for the deck with the associated title
 */
export const addCardToDeck = async (title: string, card: Question) => {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (decks !== null) {
    const decksObject = JSON.parse(decks);
    decksObject[title].questions.push(card);
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksObject));
  }
};
