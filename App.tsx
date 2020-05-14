import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import DeckListView from "./components/Decks/DeckListView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DeckListView />
    </SafeAreaView>
  );
}
