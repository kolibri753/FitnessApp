import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutComponent from "../components/WorkoutComponent";
import { colors } from "../styles/colors";

import data from "../assets/data/workouts.json";

const WorkoutsScreen = ({ navigation }) => {
	const [selectedWorkout, setSelectedWorkout] = useState(null);

	const handleWorkoutPress = (workout) => {
		setSelectedWorkout(workout);
		navigation.navigate("WorkoutExercisesScreen", { workout });
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Choose Workout</Text>
				<View style={styles.steps}>
					<View style={[styles.dot, styles.activeDot]}></View>
					<View style={styles.dot}></View>
				</View>
			</View>
			<ScrollView style={styles.scrollContainer}>
				{data.workouts.map((workout, index) => (
					<WorkoutComponent
						key={index}
						workout={workout}
						handleWorkoutPress={handleWorkoutPress}
					/>
				))}
			</ScrollView>
			{/* {selectedWorkout && (
        <Text style={styles.subtitle}>
          You have selected {selectedWorkout.title} exercise
        </Text>
      )} */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	header: {
		height: 50,
		backgroundColor: colors.black,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "white",
		borderBottomStyle: "solid",
	},
	headerText: {
		fontSize: 24,
		color: colors.white,
	},
	title: {
		color: colors.white,
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	subtitle: {
		color: colors.white,
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
		textAlign: "center",
	},
	scrollContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});

export default WorkoutsScreen;
