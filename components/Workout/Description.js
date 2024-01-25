import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const WorkoutDescription = ({ description, style }) => {
	if (!description) {
		return null;
	}

	const formattedText = description.replace(/\\n/g, "\n");

	const boldTextArray = formattedText
		.split(/\*\*(.*?)\*\*/g)
		.map((part, index) => {
			if (index % 2 === 0) {
				return (
					<Text key={index} style={{ ...style }}>
						{part}
					</Text>
				);
			} else {
				return (
					<Text key={index} style={[styles.boldText, style]}>
						{part}
					</Text>
				);
			}
		});

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.text}>{boldTextArray}</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		maxHeight: 200,
		marginBottom: 20,
	},
	text: {
		paddingHorizontal: 10,
	},
	boldText: {
		fontWeight: "bold",
	},
});

export default WorkoutDescription;
