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
import TopNavigation from "../components/common/TopNavigation";
import TargetMusclePieChart from "../components/common/TargetMusclePieChart";
import WorkoutDescription from "../components/Workout/Description";
import { useTargetColors } from "../hooks/useTargetColors";
import {
	checkLoggedInAndAlert,
	fetchWorkoutExercises,
	deleteWorkoutExercise,
} from "../utils/firebaseUtils";

const MyWorkoutExercisesScreen = ({ route, navigation }) => {
	const { workout } = route.params;
	const [exercises, setExercises] = useState([]);
	const { getColorForTarget } = useTargetColors();

	useEffect(() => {
		const fetchData = async () => {
			if (!checkLoggedInAndAlert(navigation)) {
				return;
			}
			const workoutId = workout.id;

			const unsubscribe = fetchWorkoutExercises(workoutId, setExercises);
			return unsubscribe;
		};

		fetchData();
	}, [workout, navigation]);

	const handlePlayButtonPress = () => {
		navigation.navigate("WorkoutExerciseScreen", {
			exercises,
			workoutName: workout.name,
		});
	};

	const handleDeleteExercise = (item) => {
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
					onPress: () => {
						const workoutId = workout.id;
						const exerciseId = item.id;

						deleteWorkoutExercise(workoutId, exerciseId);
					},
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation title="My Workout" activeDot={2} navigation={navigation} />
			<View style={styles.detailsContainer}>
				<Image source={{ uri: workout.image }} style={styles.workoutImage} />
				<Text style={styles.title}>{workout.name}</Text>
				<WorkoutDescription
					description={workout.description}
					style={styles.description}
				/>
				<TouchableOpacity
					onPress={handlePlayButtonPress}
					style={[styles.button, exercises.length === 0 && styles.disabledButton]}
					activeOpacity={0.5}
					disabled={exercises.length === 0}
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
				style={styles.exercises}
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
		backgroundColor: colors.black,
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
	exercises: {
		backgroundColor: colors.grey,
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
		flexWrap: "wrap",
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
	disabledButton: {
		backgroundColor: colors.lightGrey,
	},
	buttonText: {
		color: colors.black,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default MyWorkoutExercisesScreen;
