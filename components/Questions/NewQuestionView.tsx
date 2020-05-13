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

const NewQuestionView = () => {
  return (
    <View style={styles.container}>
      <Text>New question view</Text>
    </View>
  );
};

export default NewQuestionView;
