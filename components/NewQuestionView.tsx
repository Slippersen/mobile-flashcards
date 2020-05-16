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

// An option to enter in the question
// An option to enter in the answer
// An option to submit the new question

const NewQuestionView = ({ route, navigation }: any) => {
  const { deck } = route.params;

  return (
    <View style={styles.container}>
      <Text>Add new question to {deck.title}</Text>
    </View>
  );
};

export default NewQuestionView;
