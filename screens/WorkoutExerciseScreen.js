import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import ExerciseTimerComponent from "../components/ExerciseTimerComponent";
import ScreenUnlock from "../utils/ScreenUnlock";

const WorkoutExerciseScreen = ({ route, navigation }) => {
	const exercises = Array.isArray(route.params.exercises)
		? route.params.exercises
		: [route.params.exercises];
	const [currentIndex, setCurrentIndex] = useState(0);
	const exercise = exercises[currentIndex];
	const [timeLeft, setTimeLeft] = useState(exercise.time);

	const handleNextPress = () => {
		if (Array.isArray(exercises)) {
			setCurrentIndex((currentIndex + 1) % exercises.length);
			setTimeLeft(exercises[(currentIndex + 1) % exercises.length].time);
		}
	};

	const handlePrevPress = () => {
		if (Array.isArray(exercises)) {
			setCurrentIndex((currentIndex - 1 + exercises.length) % exercises.length);
			setTimeLeft(
				exercises[(currentIndex - 1 + exercises.length) % exercises.length].time
			);
		}
	};

	useEffect(() => {
		if (currentIndex === exercises.length - 1) {
			navigation.navigate("WorkoutCompleteScreen");
		}
	}, [currentIndex]);

	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;

	return (
		<SafeAreaView style={[styles.container, isLandscape && styles.landscapeContainer]}>
			<ScreenUnlock />
			<View style={styles.imageContainer}>
				<Image source={{ uri: exercise.gifUrl }} style={[styles.image, isLandscape && styles.landscapeImage]} />
			</View>
			<View style={[styles.detailsContainer, isLandscape && styles.landscapeDetailsContainer]}>
				<View>
					<Text style={styles.title}>{exercise.name}</Text>
					<Text style={styles.description}>{exercise.description}</Text>
					<View style={styles.indexContainer}>
						<Text style={styles.indexText}>{`Exercise ${currentIndex + 1} of ${
							exercises.length
						}`}</Text>
					</View>
				</View>
				<View style={styles.bottomContainer}>
					<TouchableOpacity onPress={handlePrevPress} style={styles.button}>
						<AntDesign name="arrowleft" size={24} color="black" />
						<Text style={styles.buttonText}>Prev</Text>
					</TouchableOpacity>
					<ExerciseTimerComponent
						timeLeft={timeLeft}
						setTimeLeft={setTimeLeft}
						handleNextPress={handleNextPress}
					/>
					<TouchableOpacity onPress={handleNextPress} style={styles.button}>
						<Text style={styles.buttonText}>Next</Text>
						<AntDesign name="arrowright" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
		padding: 20,
		justifyContent: "space-between",
	},
	landscapeContainer: {
		flexDirection: "row", 
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: 400,
		resizeMode: "contain",
	},
	landscapeImage: {
		height: 350,
	},
	detailsContainer: {
		// flex: 1,
		flex: 0,
		justifyContent: "space-between",
		alignItems: "center",
	},
	landscapeDetailsContainer: {
		flex: 1,
	},
	bottomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.white,
		marginBottom: 10,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		color: colors.white,
		marginBottom: 20,
		textAlign: "center",
	},
	indexContainer: {
		marginBottom: 10,
	},
	indexText: {
		fontSize: 16,
		color: colors.white,
		textAlign: "center",
	},
	button: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: colors.yellow,
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
		width: 100,
		height: 50,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.black,
		textAlign: "center",
	},
});

export default WorkoutExerciseScreen;
