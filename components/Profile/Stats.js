import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
	countFinishedWorkouts,
	countFavoriteExercises,
	countUserWorkouts,
} from "../../utils/firebaseUtils";
import { colors } from "../../styles/colors";

const Stats = () => {
	const [finishedWorkouts, setFinishedWorkouts] = useState(0);
	const [favoriteExercises, setFavoriteExercises] = useState(0);
	const [userWorkouts, setUserWorkouts] = useState(0);

	useFocusEffect(
		React.useCallback(() => {
			async function fetchStats() {
				try {
					const finishedWorkoutsCount = await countFinishedWorkouts();
					const favoriteExercisesCount = await countFavoriteExercises();
					const userWorkoutsCount = await countUserWorkouts();

					setFinishedWorkouts(finishedWorkoutsCount);
					setFavoriteExercises(favoriteExercisesCount);
					setUserWorkouts(userWorkoutsCount);
				} catch (error) {
					console.error("Error fetching statistics: ", error);
				}
			}

			fetchStats();
		}, [])
	);

	const statsData = [
		`Finished Workouts: ${finishedWorkouts}`,
		`Favorite Exercises: ${favoriteExercises}`,
		`Created Workouts: ${userWorkouts}`,
	];

	return (
		<View style={styles.stats}>
			{statsData.map((stat, index) => (
				<View
					key={index}
					style={[
						styles.statContainer,
						{
							borderBottomStartRadius: index === 0 ? 10 : 0,
							borderBottomEndRadius: index === statsData.length - 1 ? 10 : 0,
						},
					]}
				>
					<Text style={styles.statText}>{stat}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	stats: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statContainer: {
		flex: 1,
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.lightGrey,
		padding: 10,
	},
	statText: {
		fontSize: 14,
		fontWeight: "bold",
		color: colors.white,
	},
});

export default Stats;
