import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseComponent from "../components/ExerciseComponent";
import PaginationComponent from "../components/PaginationComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import useExercisesPagination from "../hooks/useExercisesPagination";

const ExercisesScreen = ({ route, navigation }) => {
	const { showSelectButton } = route.params || "false";
	const { category } = route.params || { category: "biceps" };
	const [searchQuery, setSearchQuery] = useState("");
	const [fetchedExercises, setFetchedExercises] = useState([]);

	const {
		exercises,
		setExercises,
		page,
		setPage,
		scrollViewRef,
		scrollToTop,
		handleNextPage,
		handlePrevPage,
		getPaginatedExercises,
	} = useExercisesPagination([]);

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
			setFetchedExercises(exercisesData);
		};

		fetchExercisesData();
	}, [category]);

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

	const handleSearch = () => {
		let filteredExercises = [];

		if (searchQuery === "") {
			filteredExercises = fetchedExercises;
		} else {
			filteredExercises = exercises.filter(
				(exercise) =>
					exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					exercise.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
					exercise.bodyPart.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setExercises(filteredExercises);
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title={`Exercises: ${category}`}
				activeDot={2}
				navigation={navigation}
			/>
			<ScrollView style={styles.exercisesContainer} ref={scrollViewRef}>
				<View style={styles.searchBarContainer}>
					<TextInput
						style={styles.searchInput}
						placeholder="Search exercises..."
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
					<TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
						<AntDesign name="search1" size={24} color={colors.black} />
					</TouchableOpacity>
				</View>
				{getPaginatedExercises().map((exercise) => (
					<ExerciseComponent
						key={exercise.id}
						exercise={exercise}
						navigation={navigation}
						handleSelectExercise={handleSelectExercise}
						showSelectButton={showSelectButton}
					/>
				))}
				{getPaginatedExercises().length === 0 && (
					<Text style={styles.headerText}>
						This is a limited version with only a few exercises. Upgrade to premium to
						get access to the full list of exercises.
					</Text>
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
	searchBarContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	searchInput: {
		flex: 1,
		height: 40,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: colors.black,
		backgroundColor: colors.white,
		borderRadius: 5,
		marginRight: 10,
	},
	searchButton: {
		backgroundColor: colors.white,
		paddingHorizontal: 7,
		paddingVertical: 7,
		borderRadius: 5,
	},
	headerText: {
		fontSize: 14,
		color: colors.white,
		marginBottom: 20,
	},
});

export default ExercisesScreen;
