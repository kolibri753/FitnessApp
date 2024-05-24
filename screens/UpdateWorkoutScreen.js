import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import TopNavigation from "../components/common/TopNavigation";
import InputField from "../components/common/InputField";
import ImageSelector from "../components/Workout/ImageSelector";
import {
	fetchUserWorkout,
	updateUserWorkout,
} from "../utils/firebase/workoutsUtils";
import { showSuccessToast, showErrorToast } from "../utils/toastUtils";
import useKeyboardListener from "../hooks/useKeyboardListener";
import useWorkoutForm from "../hooks/useWorkoutForm";

const UpdateWorkoutScreen = ({ navigation, route }) => {
	const { workout } = route.params;
	const {
		name,
		setName,
		description,
		setDescription,
		errors,
		setErrors,
		image,
		setImage,
	} = useWorkoutForm();
	const isKeyboardOpen = useKeyboardListener();

	useEffect(() => {
		async function fetchWorkoutData() {
			const workoutData = await fetchUserWorkout(workout.id);

			if (workoutData) {
				const { name, description, image } = workoutData;
				setName(name);
				setDescription(description);
				setImage(image);
			} else {
				console.log("Workout not found");
			}
		}

		fetchWorkoutData();
	}, [workout.id]);

	const handleUpdate = async () => {
		let newErrors = [];

		if (!name.trim()) {
			newErrors.push("Please enter workout name");
		}

		if (!description.trim()) {
			newErrors.push("Please enter workout description");
		}

		setErrors(newErrors);

		if (newErrors.length === 0) {
			updateUserWorkout(
				workout.id,
				name,
				description,
				image,
				handleSuccess,
				handleError
			);
		}
	};

	const handleSuccess = (message) => {
		showSuccessToast(message);
		navigation.navigate("MyWorkoutsScreen");
	};

	const handleError = (error) => {
		showErrorToast(error);
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation title="Update Workout" activeDot={2} />
			<View style={styles.content}>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={100}
				>
					{!isKeyboardOpen && (
						<ImageSelector onSelectImage={setImage} image={image} />
					)}
					<InputField
						placeholder="Workout Name"
						value={name}
						onChangeText={(text) => {
							setName(text);
							setErrors("");
						}}
					/>
					<InputField
						placeholder="Workout Description"
						value={description}
						onChangeText={(text) => {
							setDescription(text);
							setErrors("");
						}}
						multiline={true}
						numberOfLines={4}
					/>
					{errors.length > 0 &&
						errors.map((error, index) => (
							<Text key={index} style={styles.error}>
								{error}
							</Text>
						))}
					<TouchableOpacity style={styles.button} onPress={handleUpdate}>
						<Text style={styles.buttonText}>Update</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: colors.grey,
	},
	form: {
		alignItems: "center",
		width: "100%",
	},
	button: {
		backgroundColor: colors.yellow,
		borderRadius: 5,
		padding: 10,
		width: "50%",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: colors.black,
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
});

export default UpdateWorkoutScreen;
