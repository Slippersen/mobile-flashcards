import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import DecksContext from "../../contexts/DecksContext";
import { createStackNavigator } from "@react-navigation/stack";
import { headerOptions } from "../../constants";

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
  input: {
    height: 40,
    width: 250,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "azure",
    borderColor: "lightblue",
    borderWidth: 1,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

// An option to enter in the title for the new deck
// An option to submit the new deck title

const NewDeckForm = ({ navigation }: any) => {
  const { saveDeck } = useContext(DecksContext);
  const [newDeckName, setNewDeckName] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What is the title of your new deck?</Text>
      <TextInput style={styles.input} onChangeText={(text) => setNewDeckName(text)} value={newDeckName} />
      <TouchableOpacity style={styles.button} onPress={() => saveDeck(newDeckName, navigation)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

const NewDeckView = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New Deck" component={NewDeckForm} options={headerOptions} />
    </Stack.Navigator>
  );
};

export default NewDeckView;
