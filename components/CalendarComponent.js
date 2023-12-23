import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { View, Text, StyleSheet } from "react-native";
import { colors, markedDatesColors } from "../styles/colors";

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
	const markedDates = {};

	Object.keys(workoutData).forEach((date) => {
		const workoutsCount = workoutData[date].length;

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
