import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import { getDecks } from "../../utils/functions";
import { Deck } from "../../types";
import DeckView from "./DeckView";

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
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Deck", { title: deck.title, questions: deck.questions })}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.details}>{deck.questions?.length} questions</Text>
    </TouchableOpacity>
  );
};

const List = ({ navigation }: any) => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    getDecks().then((data) => setDecks(Object.values(data)));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={decks} renderItem={({ item }) => <ListItem deck={item} navigation={navigation} />} keyExtractor={(item) => item.title} />
    </View>
  );
};

const Stack = createStackNavigator();

const DeckListView = () => {
  const headerOptions = {
    headerStyle: {
      backgroundColor: "lightblue",
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={List} options={headerOptions} />
      <Stack.Screen name="Deck" component={DeckView} options={headerOptions} />
    </Stack.Navigator>
  );
};

export default DeckListView;
