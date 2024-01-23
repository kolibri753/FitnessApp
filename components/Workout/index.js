import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
	Alert,
} from "react-native";
import { colors } from "../../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import WorkoutDescription from "./Description";

const Workout = ({
	workout,
	handleWorkoutPress,
	handleDeleteWorkout,
	showDeleteButton,
	handleUpdateWorkout,
	showUpdateButton,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleDeletePress = () => {
		Alert.alert(
			"Confirm Deletion",
			"Are you sure you want to delete this workout?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => handleDeleteWorkout(workout.id),
					style: "destructive",
				},
			],
			{ cancelable: false }
		);
	};

	const handleUpdatePress = () => {
		handleUpdateWorkout(workout.id);
	};

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
					<WorkoutDescription
						description={workout.description}
						style={styles.workoutDescription}
					/>
					{showDeleteButton && (
						<TouchableHighlight
							style={styles.deleteButton}
							onPress={handleDeletePress}
							underlayColor="transparent"
						>
							<AntDesign name="delete" size={28} color={colors.yellow} />
						</TouchableHighlight>
					)}
					{showUpdateButton && (
						<TouchableHighlight
							style={styles.updateButton}
							onPress={handleUpdatePress}
							underlayColor="transparent"
						>
							<AntDesign name="edit" size={28} color={colors.yellow} />
						</TouchableHighlight>
					)}
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
		paddingRight: 30,
	},
	workoutDescription: {
		fontSize: 16,
		color: colors.white,
		textTransform: "capitalize",
	},
	deleteButton: {
		backgroundColor: colors.black,
		width: 50,
		height: 50,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		bottom: -20,
		right: -20,
	},
	updateButton: {
		backgroundColor: colors.black,
		width: 50,
		height: 50,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: -20,
		right: -20,
	},
});

export default Workout;
