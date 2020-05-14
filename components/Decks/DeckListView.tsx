import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { getDecks } from "../../utils/functions";
import { Deck, Decks } from "../../types";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "lightgray",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  details: {
    fontSize: 24,
  },
});

// displays the title of each Deck
// displays the number of cards in each deck

const DeckListItem = ({ title, questions }: Deck) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{questions.length} questions</Text>
    </View>
  );
};

const DeckListView = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    let data: Decks = getDecks();
    if (data) {
      setDecks(Object.values(data));
    }
  }, []);

  return (
    <FlatList
      data={decks}
      renderItem={({ item }) => (
        <DeckListItem title={item.title} questions={item.questions} />
      )}
      keyExtractor={(item) => item.title}
    />
  );
};

export default DeckListView;
