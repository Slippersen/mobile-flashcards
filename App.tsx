import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Constants from "expo-constants";
import DeckListView from "./components/Decks/DeckListView";
import NewDeckView from "./components/Decks/NewDeckView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
});

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Decks" barStyle={{ backgroundColor: "lightblue", paddingBottom: 24 }}>
          <Tab.Screen name="Decks" component={DeckListView} />
          <Tab.Screen name="New Deck" component={NewDeckView} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
