import React, { useState, useEffect, useRef } from "react";
import {
	Text,
	StyleSheet,
	ScrollView,
} from "react-native";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseComponent from "../components/ExerciseComponent";
import PaginationComponent from "../components/PaginationComponent";
import TopNavigationComponent from "../components/TopNavigationComponent";

const ExercisesScreen = ({ route, navigation }) => {
	const { category } = route.params || { category: "all" };
	const [exercises, setExercises] = useState([]);
	const [page, setPage] = useState(1);
	const scrollViewRef = useRef(null);

	useEffect(() => {
		const fetchExercisesData = async () => {
			let exercisesData = [];

			if (category === "all") {
				exercisesData = await fetchData(
					"https://exercisedb.p.rapidapi.com/exercises",
					exerciseOptions
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
		return exercises.slice(startIndex, endIndex);
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title={`Exercises: ${category}`} activeDot={2} navigation={navigation} />
			<ScrollView style={styles.exercisesContainer} ref={scrollViewRef}>
				{getPaginatedExercises().map((exercise) => (
					<ExerciseComponent key={exercise.id} exercise={exercise} />
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
	bottomNav: {
		height: 60,
		backgroundColor: colors.secondary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	bottomNavItem: {
		paddingHorizontal: 10,
	},
	bottomNavText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.black,
	},
});

export default ExercisesScreen;
