import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseComponent from "../components/ExerciseComponent";
import PaginationComponent from "../components/PaginationComponent";

const ExercisesScreen = ({ route, navigation }) => {
	const { category } = route.params;
	const [exercises, setExercises] = useState([]);
	const [page, setPage] = useState(1);

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
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
				<Text style={styles.headerText}>Exercises: {category}</Text>
				<View style={styles.steps}>
					<View style={styles.dot}></View>
					<View style={[styles.dot, styles.activeDot]}></View>
				</View>
			</View>
			<ScrollView style={styles.exercisesContainer}>
				{getPaginatedExercises().map((exercise) => (
					<ExerciseComponent key={exercise.id} exercise={exercise} />
				))}
				<PaginationComponent
					page={page}
					handlePrevPage={handlePrevPage}
					handleNextPage={handleNextPage}
					setPage={setPage}
				/>
			</ScrollView>
			<View style={styles.bottomNav}>
				<TouchableOpacity
					style={styles.bottomNavItem}
					onPress={() => navigation.navigate("ProfileScreen")}
				>
					<Text style={styles.bottomNavText}>Profile</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	header: {
		height: 50,
		backgroundColor: colors.black,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "white",
		borderBottomStyle: "solid",
	},
	headerText: {
		color: colors.white,
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	steps: {
		flexDirection: "row",
		alignItems: "center",
	},
	dot: {
		width: 10,
		height: 10,
		backgroundColor: colors.white,
		borderRadius: 10,
		marginHorizontal: 5,
	},
	activeDot: {
		backgroundColor: colors.yellow,
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
