import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
// import WorkoutExerciseScreen from "../screens/WorkoutExerciseScreen";

const WorkoutExercisesScreen = ({ route, navigation }) => {
  const { workout } = route.params;

  const handlePlayButtonPress = () => {
    console.log("WorkoutExercisesScreen", JSON.stringify(workout.exercises));
    navigation.navigate("WorkoutExerciseScreen", {
      exercises: workout.exercises,
    });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.description}>{workout.description}</Text>
        <TouchableOpacity
          onPress={handlePlayButtonPress}
          style={styles.playButton}
        >
          <Text style={styles.playButtonText}>Play Workout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={workout.exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseTitle}>
              {index + 1}. {item.name}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 20,
  },
  detailsContainer: {
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
  exerciseContainer: {
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  exerciseTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  playButton: {
    backgroundColor: colors.yellow,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  playButtonText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WorkoutExercisesScreen;
