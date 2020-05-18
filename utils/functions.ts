import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Decks, Deck, Question, QuizResult } from "../types";

const DECKS_STORAGE_KEY = "mobile-flashcards:decks";
const QUIZRESULTS_STORAGE_KEY = "mobile-flashcards:quizResults";
const NOTIFICATIONS_KEY = "mobile-flashcards:notifications";

const dummyData: Decks = {
  React: {
    title: "React",
    questions: [
      {
        question: "Can a React application be written in TypeScript?",
        answer: "Yes",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "Is EcmaScript another name for JavaScript?",
        answer: "Yes",
      },
      {
        question: "Is JavaScript and Java the same?",
        answer: "No",
      },
    ],
  },
  "ASP.NET": {
    title: "ASP.NET",
    questions: [
      {
        question: "Does ASP.NET have a React-like library?",
        answer: "Yes (Blazor)",
      },
    ],
  },
  Golang: {
    title: "Golang",
    questions: [
      {
        question: "Was Golang (Go) written by Facebook?",
        answer: "No (by Google)",
      },
    ],
  },
  MATLAB: {
    title: "MATLAB",
    questions: [
      {
        question: "Is MATLAB used for web development?",
        answer: "No",
      },
    ],
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
    return dummyData;
  }
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
 * @returns Decks
 * @description add the card to the list of questions for the deck with the associated title
 */
export const addCardToDeck = async (title: string, card: Question): Promise<Decks> => {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (decks !== null) {
    const decksObject = JSON.parse(decks);
    decksObject[title].questions.push(card);
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksObject));
    return decksObject;
  }

  return dummyData;
};

/**
 * @param title: string
 * @returns void
 * @description take in a single title argument and add it to the decks
 */
export const saveQuizResults = async (deckTitle: string, percentage: number) => {
  const results = await AsyncStorage.getItem(QUIZRESULTS_STORAGE_KEY);
  let result: QuizResult = {
    deckTitle,
    percentage,
    date: new Date(),
  };
  if (results !== null) {
    const resultsList = JSON.parse(results) as Array<QuizResult>;
    resultsList.push(result);
    await AsyncStorage.setItem(QUIZRESULTS_STORAGE_KEY, JSON.stringify(resultsList));
  } else {
    await AsyncStorage.setItem(QUIZRESULTS_STORAGE_KEY, JSON.stringify([result]));
  }
};

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATIONS_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
  console.log("Cleared notifications");
};

export const createNotification = () => {
  return {
    title: "Do a quiz!",
    body: "👋 Do not forget to complete a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
};

export const setLocalNotification = async () => {
  const notifications = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
  if (notifications === null) {
    // const notificationsObject = JSON.parse(notifications);
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }: any) => {
      if (status === "granted") {
        Notifications.cancelAllScheduledNotificationsAsync();

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(20);
        tomorrow.setMinutes(0);

        Notifications.scheduleLocalNotificationAsync(createNotification(), {
          time: tomorrow,
          repeat: "day",
        });

        AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
      }
    });
  }
};
