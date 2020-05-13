import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// displays the title of each Deck
// displays the number of cards in each deck

const DeckListView = () => {
  return (
    <View style={styles.container}>
      <Text>Deck list view</Text>
    </View>
  );
};

export default DeckListView;
