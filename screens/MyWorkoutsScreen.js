import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutComponent from "../components/WorkoutComponent";
import TopNavigationComponent from "../components/TopNavigationComponent";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { auth, db } from "../firebaseConfig";
import {
	collection,
	getDocs,
	doc,
	setDoc,
	onSnapshot,
	deleteDoc,
} from "firebase/firestore";
// import data from "../assets/data/workouts.json";

const MyWorkoutsScreen = ({ navigation }) => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			Alert.alert(
				"This function is only for registered users",
				"Do you want to register now?",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "OK",
						onPress: () => {
							navigation.navigate("RegistrationScreen");
						},
					},
				]
			);

			return;
		}

		const unsubscribe = onSnapshot(
			collection(db, "users", auth.currentUser.uid, "userWorkouts"),
			(snapshot) => {
				setWorkouts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			}
		);

		return unsubscribe;
	}, []);

	const handleDeleteWorkout = async (workoutId) => {
		try {
			await deleteDoc(
				doc(db, "users", auth.currentUser.uid, "userWorkouts", workoutId)
			);
			console.log("Workout deleted successfully!");
		} catch (error) {
			console.error("Error deleting workout: ", error);
		}
	};

	const handleCreateWorkoutPress = () => {
		navigation.navigate("CreateWorkoutScreen");
	};

	const handleUpdateWorkout = (workout) => {
		navigation.navigate("UpdateWorkoutScreen", { workout });
	};

	const handleWorkoutPress = (workout) => {
		navigation.navigate("WorkoutExercisesScreen", { workout });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title="Choose Workout" activeDot={1} />
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
