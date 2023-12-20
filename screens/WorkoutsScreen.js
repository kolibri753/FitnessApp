import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutComponent from "../components/WorkoutComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import { colors } from "../styles/colors";
import { realTimeDb } from "../firebaseConfig";
import { ref, get } from "firebase/database";

const WorkoutsScreen = ({ navigation }) => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const workoutsRef = ref(realTimeDb, "workouts");
				const snapshot = await get(workoutsRef);

				if (snapshot.exists()) {
					const data = snapshot.val();
					const workoutArray = Object.entries(data).map(([id, workout]) => ({
						id,
						...workout,
						exercises: workout?.exercises || [],
					}));

					console.log("Workouts data:", workoutArray);
					setWorkouts(workoutArray);
				} else {
					console.log("No data available");
				}
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
			<TopNavigationComponent title="Choose Workout" activeDot={1} />
			<ScrollView style={styles.scrollContainer}>
				{workouts.map((workout, index) => (
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
