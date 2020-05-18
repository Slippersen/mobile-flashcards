import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Constants from "expo-constants";
import { DecksProvider } from "./contexts/DecksContext";
import DeckListView from "./components/DeckListView";
import NewDeckView from "./components/NewDeckView";
import { setLocalNotification } from "./utils/functions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
});

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  useEffect(() => {
    setLocalNotification().then(() => console.log("Notification set"));
  }, []);

  return (
    <DecksProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Decks" barStyle={{ backgroundColor: "lightblue", paddingBottom: 24 }}>
            <Tab.Screen name="Decks" component={DeckListView} />
            <Tab.Screen name="New Deck" component={NewDeckView} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </DecksProvider>
  );
}
