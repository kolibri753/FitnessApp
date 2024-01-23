import React from "react";
import { Text } from "react-native";

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
					<Text key={index} style={{ fontWeight: "bold", ...style }}>
						{part}
					</Text>
				);
			}
		});

	return <Text>{boldTextArray}</Text>;
};

export default WorkoutDescription;
