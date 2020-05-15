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
    data.getDecks().then((data) => setDecks(Object.values(data)));
  }, []);

  const saveDeck = (title: string, navigation: any) => {
    data.saveDeckTitle(title).then(() => {
      let newDeck: Deck = {
        title,
        questions: [],
      };
      setDecks(decks.concat([newDeck]));
      navigation.navigate("Decks");
    });
  };

  return (
    <DecksContext.Provider
      value={{
        decks,
        saveDeck,
      }}>
      {children}
    </DecksContext.Provider>
  );
};

export default DecksContext;
