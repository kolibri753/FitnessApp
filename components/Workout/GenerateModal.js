import React, { useState } from "react";
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Alert,
	ActivityIndicator,
} from "react-native";
import Toast from "react-native-root-toast";
import CustomModal from "../common/CustomModal";
import InputField from "../common/InputField";
import { colors } from "../../styles/colors";
import { generateWorkout } from "../../utils/huggingFaceUtils";

const GenerateWorkoutModal = ({ isVisible, onClose, onGenerate }) => {
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);

	const handleGenerateWorkout = async () => {
		if (prompt.trim()) {
			try {
				setLoading(true);
				const { name, description } = await generateWorkout(prompt);

				onGenerate(name, description);
				handleSuccess("Check out the generated name and description!");
			} catch (error) {
				console.error("Error generating AI workout:", error);
				handleError(`Failed to generate workout. ${error}`);
			} finally {
				setLoading(false);
				onClose();
			}
		} else {
			Alert.alert("Warning", "Please enter a prompt to generate the workout.");
		}
	};

	const handleSuccess = (message) => {
		Toast.show(message, {
			duration: Toast.durations.SHORT,
			position: 0,
			shadow: true,
			animation: true,
			hideOnPress: true,
			backgroundColor: colors.success,
			textColor: colors.white,
			delay: 0,
		});
	};

	const handleError = (message) => {
		Toast.show(message, {
			duration: Toast.durations.SHORT,
			position: 0,
			shadow: true,
			animation: true,
			hideOnPress: true,
			backgroundColor: colors.error,
			textColor: colors.white,
			delay: 0,
		});
	};

	return (
		<CustomModal
			isModalVisible={isVisible}
			closeModal={onClose}
			handleSave={handleGenerateWorkout}
			title="Define your Workout Goals"
		>
			<InputField
				placeholder="Example: I'm a student with a busy schedule and need quick, effective workout to stay active and fit"
				value={prompt}
				onChangeText={(text) => {
					setPrompt(text);
				}}
				multiline={true}
				numberOfLines={4}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={handleGenerateWorkout}
				disabled={loading}
			>
				{loading ? (
					<>
						<Text style={styles.buttonText}>
							Creating your Workout <ActivityIndicator color={colors.black} />
						</Text>
					</>
				) : (
					<Text style={styles.buttonText}>Get AI-Designed Workout</Text>
				)}
			</TouchableOpacity>
		</CustomModal>
	);
};

const styles = StyleSheet.create({
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
});

export default GenerateWorkoutModal;
