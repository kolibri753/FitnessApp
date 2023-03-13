import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";

const WorkoutExerciseScreen = ({ route, navigation }) => {
  const exercise = route.params.exercise;
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("----------------------GifURL" + exercise.gifUrl)

  const handleNextPress = () => {
    if (Array.isArray(exercise)) {
      setCurrentIndex((currentIndex + 1) % exercise.length);
    }
  };
  
  const handlePrevPress = () => {
    if (Array.isArray(exercise)) {
      setCurrentIndex((currentIndex - 1 + exercise.length) % exercise.length);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: exercise[currentIndex].gifUrl }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{exercise[currentIndex].name}</Text>
        <Text style={styles.description}>{exercise[currentIndex].description}</Text>
        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>
            {`Exercise ${currentIndex + 1} of ${exercise.length}`}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handlePrevPress} style={styles.button}>
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPress} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  indexContainer: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  indexText: {
    color: colors.white,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: colors.yellow,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WorkoutExerciseScreen;
