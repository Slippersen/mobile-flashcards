import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import DecksContext from "../contexts/DecksContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 64,
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: 250,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "azure",
    borderColor: "lightblue",
    borderWidth: 1,
    width: 150,
    marginTop: 32,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

// An option to enter in the question
// An option to enter in the answer
// An option to submit the new question

const NewQuestionView = ({ route, navigation }: any) => {
  const { deck } = route.params;
  const { saveCardToDeck } = useContext(DecksContext);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add new card/question to "{deck.title}"</Text>
      <Text style={styles.label}>Question:</Text>
      <TextInput style={styles.input} placeholder="Question ..." onChangeText={(text) => setQuestion(text)} value={question} />
      <Text style={styles.label}>Answer:</Text>
      <TextInput style={styles.input} placeholder="Answer ..." onChangeText={(text) => setAnswer(text)} value={answer} />
      <TouchableOpacity style={styles.button} onPress={() => saveCardToDeck(deck, question, answer, navigation)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewQuestionView;
