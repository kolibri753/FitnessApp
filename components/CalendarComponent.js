import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

const CalendarComponent = () => {
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);

	const onDayPress = (day) => {
		setSelectedDate(day.dateString);
		// Implement logic to show workouts for the selected date
		// Use this selectedDate value to fetch and display the relevant workout data
		console.log("Selected date:", day.dateString);
	};

	// Dummy workout data for demonstration
	const workoutData = {
		"2023-12-01": [
			{ time: "09:00 AM", exercise: "Running" },
			{ time: "12:30 PM", exercise: "Weightlifting" },
			{ time: "04:00 PM", exercise: "Yoga" },
		],
		"2023-12-02": [
			{ time: "10:00 AM", exercise: "Cycling" },
			{ time: "01:30 PM", exercise: "Swimming" },
		],
	};

	const workoutsForSelectedDate = workoutData[selectedDate] || [];
	const workoutCount = workoutsForSelectedDate.length;

	// Determine dot color based on workout count
	let dotColor;
	if (workoutCount >= 3) {
		dotColor = colors.red; // Red dot for 3 or more workouts
	} else if (workoutCount > 0) {
		dotColor = colors.orange; // Orange dot for 1 or 2 workouts
	} else {
		dotColor = colors.yellow; // Yellow dot for logged days
	}

	const markedDates = {
		[selectedDate]: {
			selected: true,
			disableTouchEvent: true,
			selectedDotColor: colors.yellow,
			dotColor: colors.white,
		},
	};

	if (workoutCount > 0) {
		markedDates[selectedDate].dots = [
			{
				key: "workout",
				color: dotColor,
				selectedDotColor: colors.white,
			},
		];
	}

	return (
		<View style={styles.container}>
			<Calendar
				current={selectedDate}
				onDayPress={onDayPress}
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
			<View style={styles.workoutContainer}>
				<Text style={styles.workoutTitle}>Workouts for {selectedDate}</Text>
				{workoutsForSelectedDate.map((workout, index) => (
					<View key={index} style={styles.workoutItem}>
						<Text style={styles.workoutTime}>{workout.time}</Text>
						<Text style={styles.workoutExercise}>{workout.exercise}</Text>
					</View>
				))}
			</View>
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
	workoutExercise: {
		fontSize: 16,
		color: colors.white,
	},
});

export default CalendarComponent;
