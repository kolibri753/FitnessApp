import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutComponent from "../components/WorkoutComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import {
	checkLoggedInAndAlert,
	fetchUserWorkouts,
	deleteUserWorkout,
} from "../utils/firebaseUtils";
import Toast from "react-native-root-toast";
import { auth } from "../firebaseConfig";

const MyWorkoutsScreen = ({ navigation }) => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		if (!checkLoggedInAndAlert(navigation)) {
			return;
		}

		const userId = auth.currentUser.uid;

		const unsubscribe = fetchUserWorkouts(
			userId,
			(workouts) => setWorkouts(workouts),
			(error) => console.error(error)
		);

		return unsubscribe;
	}, []);

	const handleDeleteWorkout = async (workoutId) => {
		const userId = auth.currentUser.uid;

		deleteUserWorkout(
			userId,
			workoutId,
			(message) => {
				Toast.show(message, {
					duration: Toast.durations.SHORT,
					position: 0,
					shadow: true,
					animation: true,
					hideOnPress: true,
					backgroundColor: colors.success,
					textColor: colors.white,
					delay: 0,
				});
			},
			(error) => {
				Toast.show(error, {
					duration: Toast.durations.SHORT,
					position: 0,
					shadow: true,
					animation: true,
					hideOnPress: true,
					backgroundColor: colors.error,
					textColor: colors.white,
					delay: 0,
				});
			}
		);
	};

	const handleCreateWorkoutPress = () => {
		navigation.navigate("CreateWorkoutScreen");
	};

	const handleUpdateWorkout = (workout) => {
		navigation.navigate("UpdateWorkoutScreen", { workout });
	};

	const handleWorkoutPress = (workout) => {
		navigation.navigate("MyWorkoutExercisesScreen", { workout });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title="Choose Workout"
				activeDot={2}
				navigation={navigation}
			/>
			<ScrollView style={styles.scrollContainer}>
				<TouchableOpacity
					onPress={handleCreateWorkoutPress}
					style={styles.button}
					activeOpacity={0.5}
				>
					<Text style={styles.buttonText}>Create Workout</Text>
					<AntDesign name="pluscircle" size={24} color="black" />
				</TouchableOpacity>
				{workouts.map((workout, index) => (
					<WorkoutComponent
						key={index}
						workout={workout}
						handleWorkoutPress={handleWorkoutPress}
						handleDeleteWorkout={() => handleDeleteWorkout(workout.id)}
						handleUpdateWorkout={() => handleUpdateWorkout(workout)}
						showDeleteButton="true"
						showUpdateButton="true"
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
	scrollContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	title: {
		color: colors.white,
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	button: {
		display: "flex",
		flexDirection: "row",
		gap: 14,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.yellow,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
	},
	buttonText: {
		color: colors.black,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default MyWorkoutsScreen;
