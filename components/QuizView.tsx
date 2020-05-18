import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { saveQuizResults, clearLocalNotification, setLocalNotification } from "../utils/functions";

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
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  button: {
    backgroundColor: "green",
    borderColor: "green",
    borderWidth: 1,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 16,
    alignItems: "center",
  },
  whiteText: {
    color: "white",
  },
  red: {
    backgroundColor: "red",
    borderColor: "red",
  },
  azure: {
    backgroundColor: "azure",
    borderColor: "lightblue",
  },
  lightblue: {
    backgroundColor: "lightblue",
    borderColor: "lightblue",
  },
  text: {
    color: "black",
    textAlign: "center",
    marginVertical: 24,
  },
});

const QuizView = ({ route, navigation }: any) => {
  const { deck } = route.params;
  const [index, setIndex] = useState<number>(0);
  const [showingAnswer, setShowingAnswer] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showingSummary, setShowingSummary] = useState<boolean>(false);

  const goToNextQuestion = (correctGuess: boolean) => {
    if (correctGuess === true) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (index + 1 === deck.questions.length) {
      saveQuizResults(deck.title, (correctAnswers / deck.questions.length) * 100);
      // Clear local notification
      clearLocalNotification().then(() => {
        setShowingSummary(true);
        setLocalNotification().then(() => console.log("Notification set"));
      });
    } else {
      setIndex(index + 1);
    }
  };

  if (deck.questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.subHeader}>There are no cards in this deck</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.text}>Go back to deck</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showingSummary === true) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your percentage: {((correctAnswers / deck.questions.length) * 100).toFixed(0)}%</Text>
        <View>
          <TouchableOpacity
            style={[styles.button, styles.azure]}
            onPress={() => {
              setShowingSummary(false);
              setIndex(0);
            }}>
            <Text>Restart quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lightblue]} onPress={() => navigation.goBack()}>
            <Text>Go back to deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    deck?.questions && (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{deck.questions[index]?.question}</Text>
          <Text style={styles.subHeader}>
            {index + 1}/{deck.questions.length}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => goToNextQuestion(true)}>
            <Text style={styles.whiteText}>I know this!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.red]} onPress={() => goToNextQuestion(false)}>
            <Text style={styles.whiteText}>I have no idea</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowingAnswer(!showingAnswer)}>
            {!showingAnswer ? <Text style={styles.text}>Show Answer</Text> : <Text style={styles.text}>{deck.questions[index]?.answer} (touch to hide)</Text>}
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default QuizView;
