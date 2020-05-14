import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { getDecks } from "../../utils/functions";
import { Deck } from "../../types";
import DeckView from "./DeckView";

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

interface DeckListItemProps {
  deck: Deck;
  navigation: any;
}

const ListItem = ({ deck, navigation }: DeckListItemProps) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title} onPress={() => navigation.navigate("Deck", { title: deck.title, questions: deck.questions })}>
        {deck.title}
      </Text>
      <Text style={styles.details}>{deck.questions?.length} questions</Text>
    </View>
  );
};

const List = ({ navigation }: any) => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    getDecks().then((data) => setDecks(Object.values(data)));
  }, []);

  return <FlatList data={decks} renderItem={({ item }) => <ListItem deck={item} navigation={navigation} />} keyExtractor={(item) => item.title} />;
};

const Stack = createStackNavigator();

const DeckListView = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={List} />
      <Stack.Screen name="Deck" component={DeckView} />
    </Stack.Navigator>
  );
};

export default DeckListView;
