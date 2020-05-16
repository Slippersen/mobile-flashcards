import React, { useState, useEffect } from "react";
import { Deck, Question } from "../types";
import * as data from "../utils/functions";

const DecksContext = React.createContext<any>(null);

type Props = {
  children: any;
};

export const DecksProvider = ({ children }: Props) => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    data.getDecks().then((data) => setDecks(Object.values(data).reverse()));
  }, []);

  const saveDeck = (title: string, navigation: any) => {
    data.saveDeckTitle(title).then(() => {
      let newDeck: Deck = {
        title,
        questions: [],
      };
      setDecks(decks.concat([newDeck]).reverse());
      navigation.navigate("Deck", { deck: newDeck });
    });
  };

  const removeDeck = (title: string, navigation: any) => {
    data.deleteDeck(title).then(() => {
      setDecks(decks.filter((deck) => deck.title !== title));
      navigation.navigate("Decks");
    });
  };

  const saveCardToDeck = (deck: Deck, question: string, answer: string, navigation: any) => {
    let q: Question = {
      question,
      answer,
    };
    data.addCardToDeck(deck.title, q).then((data) => {
      setDecks(Object.values(data).reverse());
      deck.questions.push(q);
      navigation.navigate("Deck", { deck: deck });
    });
  };

  return (
    <DecksContext.Provider
      value={{
        decks,
        saveDeck,
        removeDeck,
        saveCardToDeck,
      }}>
      {children}
    </DecksContext.Provider>
  );
};

export default DecksContext;
