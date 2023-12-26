import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors, markedDatesColors } from "../styles/colors";
import TargetMusclePieChart from "./TargetMusclePieChart";
import { auth, db } from "../firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

const CalendarComponent = () => {
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [workoutData, setWorkoutData] = useState([]);

	const onDayPress = (day) => {
		setSelectedDate(day.dateString);
		// Implement logic to show workouts for the selected date
		// Use this selectedDate value to fetch and display the relevant workout data
		console.log("Selected date:", day.dateString);
	};

	useEffect(() => {
		const fetchWorkoutData = async () => {
			try {
				const userId = auth.currentUser.uid;
				const userActivitiesRef = collection(db, "users", userId, "userActivities");
				const q = query(
					userActivitiesRef
					// Fetch all workouts for the user
				);

				const querySnapshot = await getDocs(q);
				const data = [];
				querySnapshot.forEach((doc) => {
					const { workoutName, timestamp, targets } = doc.data();
					data.push({
						workoutName,
						timestamp: timestamp.toDate(),
						targets,
					});
				});

				console.log("Fetched workout data:", data);

				setWorkoutData(data);
			} catch (error) {
				console.error("Error fetching workout data: ", error);
			}
		};

		fetchWorkoutData();
	}, []);

	const markedDates = {};

	workoutData.forEach((workout) => {
		const date = new Date(workout.timestamp).toISOString().split("T")[0];
		const workoutsCount = workoutData.filter(
			(w) => w.timestamp.toISOString().split("T")[0] === date
		).length;

		let dots = [];
		if (workoutsCount >= 5) {
			dots = [
				{ key: "first", color: markedDatesColors.first },
				{ key: "second", color: markedDatesColors.second },
				{ key: "third", color: markedDatesColors.third },
			];
		} else if (workoutsCount >= 3) {
			dots = [
				{ key: "first", color: markedDatesColors.first },
				{ key: "second", color: markedDatesColors.second },
			];
		} else if (workoutsCount < 3) {
			dots = [{ key: "first", color: markedDatesColors.first }];
		}

		markedDates[date] = {
			dots,
			selected: false,
			disableTouchEvent: false,
			selectedDotColor: colors.yellow,
			marked: true,
		};
	});

	markedDates[selectedDate] = {
		...markedDates[selectedDate],
		selected: true,
	};

	const filteredWorkouts = workoutData.filter(
		(workout) =>
			new Date(workout.timestamp).toISOString().split("T")[0] === selectedDate
	);

	return (
		<View style={styles.container}>
			<Calendar
				current={selectedDate}
				onDayPress={onDayPress}
				markingType="multi-dot"
				markedDates={markedDates}
				theme={{
					"stylesheet.calendar.header": {
						dayTextAtIndex0: {
							color: "red",
						},
						dayTextAtIndex6: {
							color: "green",
						},
					},
					backgroundColor: colors.white,
					calendarBackground: colors.white,
					textSectionTitleColor: colors.black,
					selectedDayBackgroundColor: colors.yellow,
					selectedDayTextColor: colors.white,
					todayTextColor: colors.yellow,
					dayTextColor: colors.black,
					textDisabledColor: colors.lightGrey,
					dotColor: colors.yellow,
					selectedDotColor: colors.white,
					arrowColor: colors.black,
					monthTextColor: colors.black,
					textDayFontWeight: "bold",
					textMonthFontWeight: "bold",
					textDayHeaderFontWeight: "bold",
					textDayFontSize: 18,
					textMonthFontSize: 18,
					textDayHeaderFontSize: 14,
				}}
			/>
			<FlatList
				data={filteredWorkouts}
				keyExtractor={(item, index) => index.toString()}
				ListHeaderComponent={() => (
					<Text style={styles.workoutTitle}>Workouts for {selectedDate}</Text>
				)}
				renderItem={({ item, index }) => (
					<View key={index} style={styles.workoutItem}>
						<Text style={styles.workoutName}>{item.workoutName}</Text>
						<Text style={styles.workoutTime}>
							{item.timestamp.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</Text>
					</View>
				)}
				ListFooterComponent={() => (
					<TargetMusclePieChart
						targets={filteredWorkouts.flatMap((w) => w.targets)}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	workoutContainer: {
		padding: 20,
		color: colors.white,
	},
	workoutTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: colors.white,
	},
	workoutItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	workoutTime: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.white,
	},
	workoutName: {
		fontSize: 16,
		color: colors.white,
	},
});

export default CalendarComponent;
