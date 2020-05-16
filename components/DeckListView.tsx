import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import { Deck } from "../types";
import DeckView from "./DeckView";
import { headerOptions } from "../constants";
import DecksContext from "../contexts/DecksContext";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  item: {
    backgroundColor: "azure",
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

interface DeckListItemProps {
  deck: Deck;
  navigation: any;
}

const ListItem = ({ deck, navigation }: DeckListItemProps) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Deck", { deck: deck })}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.details}>{deck.questions?.length} cards</Text>
    </TouchableOpacity>
  );
};

const List = ({ navigation }: any) => {
  const { decks } = useContext(DecksContext);

  return (
    <View style={styles.container}>
      <FlatList data={decks} extraData={decks} renderItem={({ item }) => <ListItem deck={item} navigation={navigation} />} keyExtractor={(item) => item.title} />
    </View>
  );
};

const Stack = createStackNavigator();

const DeckListView = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={List} options={headerOptions} />
      <Stack.Screen name="Deck" component={DeckView} options={headerOptions} />
    </Stack.Navigator>
  );
};

export default DeckListView;
