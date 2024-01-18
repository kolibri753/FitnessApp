import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import TargetMusclePieChart from "../common/TargetMusclePieChart";
import { colors } from "../../styles/colors";

const CalendarAgenda = ({ selectedDate, workouts }) => {
	return (
		<FlatList
			data={workouts}
			keyExtractor={(item, index) => index.toString()}
			ListHeaderComponent={() => (
				<Text style={styles.workoutTitle}>Workouts for {selectedDate}</Text>
			)}
			renderItem={({ item, index }) => (
				<View key={index} style={styles.workoutItem}>
					<Text style={styles.workoutTime}>
						{item.timestamp.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Text>
					<View style={styles.dottedLine}></View>
					<Text style={styles.workoutName}>{item.workoutName}</Text>
				</View>
			)}
			ListFooterComponent={() => (
				<>
					{workouts.length > 0 ? (
						<TargetMusclePieChart targets={workouts.flatMap((w) => w.targets)} />
					) : (
						<Text style={styles.noWorkoutMessage}>
							No workouts recorded on this day
						</Text>
					)}
				</>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	workoutTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: colors.white,
		textAlign: "center",
		marginTop: 10,
	},
	workoutItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		paddingHorizontal: 10,
	},
	workoutTime: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.white,
	},
	dottedLine: {
		flex: 1,
		height: 1,
		backgroundColor: "transparent",
		borderBottomColor: colors.white,
		borderBottomWidth: 1,
		borderStyle: "dashed",
		marginHorizontal: 10,
	},
	workoutName: {
		fontSize: 16,
		color: colors.white,
		maxWidth: 250,
	},
	noWorkoutMessage: {
		fontSize: 16,
		color: colors.white,
    textAlign: "center",
	},
});

export default CalendarAgenda;
