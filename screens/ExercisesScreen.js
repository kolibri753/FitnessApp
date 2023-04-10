import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import Exercise from "../components/Exercise";
import PaginationComponent from "../components/PaginationComponent";
import TopNavigationComponent from "../components/TopNavigationComponent";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import ExerciseComponent from "../components/ExerciseComponent";

const ExercisesScreen = ({ route, navigation }) => {
	const { showSelectButton } = route.params || "false";
	const { category } = route.params || { category: "hello" };
	const [exercises, setExercises] = useState([]);
	const [page, setPage] = useState(1);
	const scrollViewRef = useRef(null);

	useEffect(() => {
		const fetchExercisesData = async () => {
			let exercisesData = [];

			if (category === "all") {
				exercisesData = await fetchData(
					"https://exercisedb.p.rapidapi.com/exercises",
					exerciseOptions,
					showSelectButton ? 10 : 5
				);
			} else {
				exercisesData = await fetchData(
					`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${category}`,
					exerciseOptions
				);
			}

			setExercises(exercisesData);
		};

		fetchExercisesData();
	}, [category]);

	const scrollToTop = () => {
		scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
	};

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setPage((prevPage) => prevPage - 1);
	};

	const getPaginatedExercises = () => {
		const startIndex = (page - 1) * 5;
		const endIndex = startIndex + 5;
		return exercises ? exercises.slice(startIndex, endIndex) : [];
	};

	const handleSelectExercise = (exerciseData) => {
		// Save exerciseData to Firestore
		const userId = auth.currentUser.uid;
		const workoutId = route.params.workoutId;
		const userWorkoutsRef = collection(
			db,
			"users",
			userId,
			"userWorkouts",
			workoutId,
			"exercises"
		);

		// Get the number of exercises already in the collection
		const q = query(userWorkoutsRef);
		getDocs(q)
			.then((querySnapshot) => {
				const numExercises = querySnapshot.size;
				// Add the new exercise with an order value of the next number
				addDoc(userWorkoutsRef, { ...exerciseData, order: numExercises + 1 })
					.then((docRef) => {
						console.log("Exercise added with ID: ", docRef.id);
					})
					.catch((error) => {
						console.error("Error adding exercise: ", error);
					});
			})
			.catch((error) => {
				console.error("Error getting exercises: ", error);
			});
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title={`Exercises: ${category}`}
				activeDot={2}
				navigation={navigation}
			/>
			<ScrollView style={styles.exercisesContainer} ref={scrollViewRef}>
				{getPaginatedExercises().map((exercise) => (
					<ExerciseComponent
						key={exercise.id}
						exercise={exercise}
						navigation={navigation}
						handleSelectExercise={handleSelectExercise}
						showSelectButton={showSelectButton}
					/>
				))}
				{getPaginatedExercises().length === 0 ? (
					<Text style={styles.headerText}>
						This is a limited version with only a few exercises. Upgrade to premium to
						get access to the full list of exercises.
					</Text>
				) : (
					<></>
				)}
				<PaginationComponent
					page={page}
					handlePrevPage={handlePrevPage}
					handleNextPage={handleNextPage}
					scrollToTop={scrollToTop}
					setPage={setPage}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	exercisesContainer: {
		flex: 1,
		padding: 20,
	},
	headerText: {
		fontSize: 14,
		color: colors.white,
		marginBottom: 20,
	},
});

export default ExercisesScreen;
