import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Deck } from "../types";
import DecksContext from "../contexts/DecksContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  header: {
    fontSize: 32,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  button: {
    backgroundColor: "azure",
    borderColor: "lightblue",
    borderWidth: 1,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 16,
    alignItems: "center",
  },
  lightblue: {
    backgroundColor: "lightblue",
  },
  link: {
    color: "red",
    textAlign: "center",
    marginVertical: 24,
  },
});

const DeckView = ({ route, navigation }: any) => {
  const { deck } = route.params;
  const { removeDeck } = useContext(DecksContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{deck.title}</Text>
        <Text style={styles.subHeader}>
          {deck.questions?.length} {deck.questions?.length === 1 ? "card" : "cards"}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("New Card/Question", { deck: deck })}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.lightblue]} onPress={() => navigation.navigate("Quiz", { deck: deck })}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeDeck(deck.title, navigation)}>
          <Text style={styles.link}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeckView;
