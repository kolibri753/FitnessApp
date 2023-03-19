import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
} from "react-native";
import { colors } from "../styles/colors";

const WorkoutComponent = ({ workout, handleWorkoutPress }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<TouchableHighlight
			onPress={() => {
				handleWorkoutPress(workout);
			}}
			onShowUnderlay={() => setIsHovered(true)}
			onHideUnderlay={() => setIsHovered(false)}
			style={[styles.workoutItem, isHovered && styles.workoutItemHovered]}
			activeOpacity={1}
			underlayColor="transparent"
		>
			<View style={styles.workoutContent}>
				<Image source={{ uri: workout.image }} style={styles.workoutImage} />
				<View style={styles.workoutInfo}>
					<Text style={styles.workoutTitle}>{workout.name}</Text>
					<Text style={styles.workoutDescription}>{workout.description}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	workoutItem: {
		backgroundColor: colors.black,
		// backgroundImage: { uri: workout.image },
    position: "relative",
		borderRadius: 10,
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 5,
		borderColor: colors.yellow,
	},
	workoutItemHovered: {
		backgroundColor: "#463A00",
	},
	workoutContent: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
	},
	workoutImage: {
		position: "absolute",
		top: 10,
		left: 10,
    borderRadius: 10,
		width: "106%",
		height: "106%",
		resizeMode: "cover",
	},
	// workoutImage: {
	// 	width: 80,
	// 	height: 80,
	// 	marginRight: 20,
	// },
	workoutInfo: {
		flex: 1,
	},
	workoutTitle: {
		fontSize: 24,
		color: colors.white,
		fontWeight: "bold",
		textTransform: "capitalize",
		marginBottom: 10,
	},
	workoutDescription: {
		fontSize: 16,
		color: colors.white,
		textTransform: "capitalize",
	},
});

export default WorkoutComponent;
