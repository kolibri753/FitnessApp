import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigation from "../components/common/TopNavigation";
import CustomCalendar from "../components/Calendar";
import { colors } from "../styles/colors";
import {
	checkLoggedInAndAlert,
	fetchUserActivity,
} from "../utils/firebaseUtils";

const ActivityCalendarScreen = ({ navigation }) => {
	const [workoutData, setWorkoutData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (checkLoggedInAndAlert(navigation)) {
					fetchUserActivity(
						(data) => setWorkoutData(data),
						(error) => console.error("Error fetching workout data: ", error)
					);
				}
			} catch (error) {
				console.error("Error fetching workout data: ", error);
			}
		};

		fetchData();
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation
				title="Activity Calendar"
				activeDot={2}
				navigation={navigation}
			/>
			<CustomCalendar workoutData={workoutData} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
});

export default ActivityCalendarScreen;
