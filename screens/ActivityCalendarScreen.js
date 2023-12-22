import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import CalendarComponent from "../components/CalendarComponent";
import { colors } from "../styles/colors"; // Import your color styles

const ActivityCalendarScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title="Activity Calendar"
				activeDot={2}
				navigation={navigation}
			/>
			<CalendarComponent />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
    flex: 1,
		backgroundColor: colors.grey,
	}
});

export default ActivityCalendarScreen;
