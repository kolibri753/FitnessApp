import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { View, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import useUserActivity from "../hooks/useUserActivity";
import { generateMarkedDates } from "../utils/calendarUtils";
import CalendarAgendaComponent from "./CalendarAgendaComponent";

const CalendarComponent = () => {
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const workoutData = useUserActivity();

	const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log("Selected date:", day.dateString);
  };

	const markedDates = generateMarkedDates(workoutData, selectedDate);

	const filteredWorkouts = workoutData.filter(
		(workout) =>
			new Date(workout.timestamp).toISOString().split("T")[0] === selectedDate
	);

	return (
		<View style={styles.container}>
			<Calendar
				current={selectedDate}
				onDayPress={handleDayPress}
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
			<CalendarAgendaComponent
				selectedDate={selectedDate}
				workouts={filteredWorkouts}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
});

export default CalendarComponent;
