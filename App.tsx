import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import DeckListView from "./components/Decks/DeckListView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DeckListView />
    </SafeAreaView>
  );
}
