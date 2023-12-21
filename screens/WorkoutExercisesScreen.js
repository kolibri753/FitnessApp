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
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import TargetMusclePieChart from "../components/TargetMusclePieChart";
import { useTargetColors } from "../hooks/useTargetColors";

const WorkoutExercisesScreen = ({ route, navigation }) => {
	const { workout } = route.params;
	const { getColorForTarget } = useTargetColors();

	const handlePlayButtonPress = () => {
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
						<Text
							style={[
								styles.exerciseTarget,
								{ backgroundColor: getColorForTarget(item.target) },
							]}
						>
							{item.target}
						</Text>
					</View>
				)}
				ListFooterComponent={() => (
          <TargetMusclePieChart
            targets={workout.exercises.map((exercise) => exercise.target)}
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
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 10,
		backgroundColor: colors.darkGray,
		borderRadius: 10,
		padding: 5,
	},
	exerciseTitle: {
		color: colors.white,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
		textTransform: "capitalize",
		flex: 1,
	},
	exerciseTarget: {
		fontSize: 18,
		fontWeight: "bold",
		backgroundColor: colors.white,
		borderRadius: 15,
		padding: 5,
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
