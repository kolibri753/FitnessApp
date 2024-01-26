import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Workout from "../components/Workout";
import TopNavigation from "../components/common/TopNavigation";
import { colors } from "../styles/colors";
import { fetchWorkoutsFromRealTimeDb } from "../utils/firebaseUtils";

const WorkoutsScreen = ({ navigation }) => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const workoutArray = await fetchWorkoutsFromRealTimeDb();
				console.log("Workouts data:", workoutArray);
				setWorkouts(workoutArray);
			} catch (error) {
				console.error("Error fetching workouts:", error);
			}
		};

		fetchWorkouts();
	}, []);

	const handleWorkoutPress = (workout) => {
		navigation.navigate("WorkoutExercisesScreen", { workout });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation title="Choose Workout" activeDot={1} />
			<ScrollView style={styles.scrollContainer}>
				{workouts.map((workout, index) => (
					<Workout
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
		backgroundColor: colors.black,
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
		backgroundColor: colors.grey,
	},
});

export default WorkoutsScreen;
