import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutComponent from "../components/WorkoutComponent";
import TopNavigationComponent from "../components/TopNavigationComponent";
import { colors } from "../styles/colors";

import data from "../assets/data/workouts.json";

const WorkoutsScreen = ({ navigation }) => {

	const handleWorkoutPress = (workout) => {
		navigation.navigate("WorkoutExercisesScreen", { workout });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title="Choose Workout" activeDot={1}/>
			<ScrollView style={styles.scrollContainer}>
				{data.workouts.map((workout, index) => (
					<WorkoutComponent
						key={index}
						workout={workout}
						handleWorkoutPress={handleWorkoutPress}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
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
