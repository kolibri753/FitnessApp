import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import TargetMusclePieChart from "../components/TargetMusclePieChart";
import { useTargetColors } from "../hooks/useTargetColors";
import { auth, db } from "../firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const MyWorkoutExercisesScreen = ({ route, navigation }) => {
	const { workout } = route.params;
	const [exercises, setExercises] = useState([]);
	const { getColorForTarget } = useTargetColors();

	useEffect(() => {
		const userId = auth.currentUser.uid;
		const workoutId = workout.id;
		const userWorkoutsRef = collection(
			db,
			"users",
			userId,
			"userWorkouts",
			workoutId,
			"exercises"
		);

		const unsubscribe = onSnapshot(userWorkoutsRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			const sortedData = data.sort((a, b) => a.order - b.order);
			setExercises(sortedData);
		});

		return unsubscribe;
	}, []);

	const handlePlayButtonPress = () => {
		navigation.navigate("WorkoutExerciseScreen", {
			exercises: exercises,
			workoutName: workout.name,
		});
	};

	const handleDeleteExercise = async (item) => {
		const userId = auth.currentUser.uid;
		const workoutId = workout.id;
		const exerciseId = item.id;

		Alert.alert(
			"Delete Exercise",
			"Are you sure you want to delete this exercise?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: async () => {
						try {
							const exerciseRef = doc(
								db,
								"users",
								userId,
								"userWorkouts",
								workoutId,
								"exercises",
								exerciseId
							);

							await deleteDoc(exerciseRef);

							console.log("Exercise deleted successfully!");
						} catch (error) {
							console.error("Error deleting exercise: ", error);
						}
					},
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title="My Workout"
				activeDot={2}
				navigation={navigation}
			/>
			<View style={styles.detailsContainer}>
				<Image source={{ uri: workout.image }} style={styles.workoutImage} />
				<Text style={styles.title}>{workout.name}</Text>
				<Text style={styles.description}>{workout.description}</Text>
				<TouchableOpacity
					onPress={handlePlayButtonPress}
					style={styles.button}
					activeOpacity={0.5}
				>
					<Text style={styles.buttonText}>Play Workout</Text>
					<AntDesign name="play" size={24} color={colors.black} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ExercisesScreen", {
							showSelectButton: "true",
							category: "all",
							workoutId: workout.id,
						})
					}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Add Exercise</Text>
					<AntDesign name="pluscircle" size={24} color={colors.black} />
				</TouchableOpacity>
			</View>
			<FlatList
				data={exercises}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<View style={styles.exerciseContainer}>
						<View style={styles.exerciseDetails}>
							<Text style={styles.exerciseTitle}>
								{index + 1}. {item.name}
							</Text>
							<Text
								style={[
									styles.exerciseTarget,
									{ backgroundColor: getColorForTarget(item.target) },
								]}
							>
								{item.target}
							</Text>
							<TouchableOpacity
								style={styles.deleteButton}
								onPress={() => handleDeleteExercise(item)}
							>
								<AntDesign name="delete" size={24} color={colors.yellow} />
							</TouchableOpacity>
						</View>
					</View>
				)}
				ListFooterComponent={() => (
					<TargetMusclePieChart
						targets={exercises.map((exercise) => exercise.target)}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
		// padding: 20,
	},
	detailsContainer: {
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: colors.lightGrey,
	},
	workoutImage: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		resizeMode: "cover",
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
	exerciseDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	exerciseTitle: {
		color: colors.white,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
		textTransform: "capitalize",
	},
	exerciseTarget: {
		fontSize: 18,
		fontWeight: "bold",
		backgroundColor: colors.white,
		borderRadius: 15,
		padding: 5,
	},
	button: {
		display: "flex",
		flexDirection: "row",
		gap: 14,
		alignItems: "center",
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

export default MyWorkoutExercisesScreen;
