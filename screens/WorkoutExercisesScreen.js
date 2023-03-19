import React from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import TopNavigationComponent from "../components/TopNavigationComponent";

const WorkoutExercisesScreen = ({ route, navigation }) => {
	const { workout } = route.params;

	const handlePlayButtonPress = () => {
		console.log("WorkoutExercisesScreen", JSON.stringify(workout.exercises));
		navigation.navigate("WorkoutExerciseScreen", {
			exercises: workout.exercises,
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title={`Workout: #${workout.id}`}
				activeDot={2}
				navigation={navigation}
			/>
			<View style={styles.detailsContainer}>
				<Image source={{ uri: workout.image }} style={styles.workoutImage} />
				<Text style={styles.title}>{workout.name}</Text>
				<Text style={styles.description}>{workout.description}</Text>
				<TouchableOpacity
					onPress={handlePlayButtonPress}
					style={styles.playButton}
					activeOpacity={0.5}
				>
					<Text style={styles.playButtonText}>Play Workout</Text>
					<AntDesign name="play" size={24} color="black" />
				</TouchableOpacity>
			</View>
			<FlatList
				data={workout.exercises}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<View style={styles.exerciseContainer}>
						<Text style={styles.exerciseTitle}>
							{index + 1}. {item.name}
						</Text>
					</View>
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
	exerciseTitle: {
		color: colors.white,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
	},
	playButton: {
		display: "flex",
		flexDirection: "row",
		gap: 14,
		alignItems: "center",
		backgroundColor: colors.yellow,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
	},
	playButtonText: {
		color: colors.black,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default WorkoutExercisesScreen;
