import React, { useState, useEffect } from "react";
import { Deck } from "../types";
import * as data from "../utils/functions";

const DecksContext = React.createContext<any>(null);

type Props = {
  children: any;
};

export const DecksProvider = ({ children }: Props) => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    data.getDecks().then((data) => setDecks(Object.values(data).sort((a, b) => (a.title < b.title ? -1 : 1))));
  }, []);

  const saveDeck = (title: string, navigation: any) => {
    data.saveDeckTitle(title).then(() => {
      let newDeck: Deck = {
        title,
        questions: [],
      };
      setDecks(decks.concat([newDeck]).sort((a, b) => (a.title < b.title ? -1 : 1)));
      navigation.navigate("Deck", { deck: newDeck });
    });
  };

  const removeDeck = (title: string, navigation: any) => {
    data.deleteDeck(title).then(() => {
      setDecks(decks.filter((deck) => deck.title !== title));
      navigation.navigate("Decks");
    });
  };

  return (
    <DecksContext.Provider
      value={{
        decks,
        saveDeck,
        removeDeck,
      }}>
      {children}
    </DecksContext.Provider>
  );
};

export default DecksContext;
