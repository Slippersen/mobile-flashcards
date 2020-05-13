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

// An option to enter in the title for the new deck
// An option to submit the new deck title

const NewDeckView = () => {
  return (
    <View style={styles.container}>
      <Text>New deck view</Text>
    </View>
  );
};

export default NewDeckView;
