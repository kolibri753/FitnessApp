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
import ExerciseComponent from "../components/ExerciseComponent";
import PaginationComponent from "../components/PaginationComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import useExercisesPagination from "../hooks/useExercisesPagination";

import { useSelector, useDispatch } from "react-redux";
import { fetchExercisesData } from "../redux/slices/exercisesSlice";

const ExercisesScreen = ({ route, navigation }) => {
	const { showSelectButton } = route.params || false;

	// Use useSelector to get the selected category from Redux state
	const { selectedCategory } = useSelector((state) => state.exercises);
	const dispatch = useDispatch();

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
		// Dispatch the fetchExercisesData thunk to fetch exercises data
		dispatch(fetchExercisesData(selectedCategory));
	}, [dispatch, selectedCategory]);

	// Use the useSelector hook to get the updated Redux state
	const reduxExercises = useSelector((state) => state.exercises.exercises);

	useEffect(() => {
		setExercises(reduxExercises); // Use the updated Redux state
		setFetchedExercises(reduxExercises);
	}, [reduxExercises, setExercises]);

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

	// const handleCategoryChange = (newCategory) => {
	// 	// Dispatch the selectCategory action to update the Redux state
	// 	dispatch(selectCategory(newCategory));
	// };

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title={`Exercises: ${selectedCategory}`}
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
				{getPaginatedExercises().map((exercise, index) => (
					<ExerciseComponent
						key={index}
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
