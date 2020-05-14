import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Deck } from "../../types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// displays the title of the Deck
// displays the number of cards in the deck
// displays an option to start a quiz on this specific deck
// An option to add a new question to the deck
// An option to go back: <Button title="Go back" onPress={() => navigation.goBack()} />

const DeckView = ({ route, navigation }: any) => {
  const { title, questions } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        Individual deck view ({title} - {questions?.length})
      </Text>
    </View>
  );
};

export default DeckView;
