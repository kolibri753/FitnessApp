import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import TopNavigation from "../components/common/TopNavigation";
import InputField from "../components/common/InputField";
import Toast from "react-native-root-toast";
import { createUserWorkout } from "../utils/firebaseUtils";

import * as ImagePicker from "expo-image-picker";
import { query } from "../utils/huggingFaceUtils";

const CreateWorkoutScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);
	const [image, setImage] = useState(null);
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);

	const handleCreate = async () => {
		let newErrors = [];

		if (!name.trim()) {
			newErrors.push("Please enter workout name");
		}

		if (!description.trim()) {
			newErrors.push("Please enter workout description");
		}

		setErrors(newErrors);

		if (newErrors.length === 0) {
			createUserWorkout(name, description, image, handleSuccess, handleError);
		}
	};

	const generateWorkout = async () => {
		if (prompt.trim()) {
			try {
				setLoading(true);
				const generatedWorkoutResponse = await query({
					inputs: prompt,
					parameters: {
						max_new_tokens: 500,
					},
				});

				console.log("Generated AI Workout:", generatedWorkoutResponse);

				const generatedText = generatedWorkoutResponse[0]?.generated_text || "";

				// Use a regular expression to find substrings like {name:"...",description:"..."}
				const nameMatch = generatedText.match(/\{name:"([^"]+)"/);
				const descriptionMatch = generatedText.match(/\,description:"([^"]+)/);

				const name = nameMatch ? nameMatch[1] : null;
				const description = descriptionMatch ? descriptionMatch[1] : generatedText;

				console.log("name", name);
				console.log("desc", description);

				setName(name);
				setDescription(description);
			} catch (error) {
				console.error("Error generating AI workout:", error);
			} finally {
				setLoading(false);
			}
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
		navigation.navigate("MyWorkoutsScreen");
	};

	const handleError = (error) => {
		Toast.show(error, {
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

	const handleSelectImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			console.log("Permission to access media library is required");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation
				title="Create Workout"
				activeDot={2}
				navigation={navigation}
			/>
			<View style={styles.content}>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={0}
				>
					<TouchableOpacity onPress={handleSelectImage}>
						{image ? (
							<Image source={{ uri: image }} style={styles.image} />
						) : (
							<View style={styles.imagePlaceholder}>
								<Text style={styles.imagePlaceholderText}>Select an Image</Text>
							</View>
						)}
					</TouchableOpacity>
					<InputField
						placeholder="AI Workout Prompt"
						value={prompt}
						onChangeText={(text) => {
							setPrompt(text);
							setErrors("");
						}}
					/>
					<InputField
						placeholder="Workout Name"
						value={name}
						onChangeText={(text) => {
							setName(text);
							setErrors("");
						}}
						editable={!loading}
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
						editable={!loading}
					/>
					{errors.length > 0 &&
						errors.map((error, index) => (
							<Text key={index} style={styles.error}>
								{error}
							</Text>
						))}
					<TouchableOpacity style={styles.button} onPress={handleCreate}>
						<Text style={styles.buttonText}>Create</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={generateWorkout}
						disabled={loading}
					>
						<Text style={styles.buttonText}>
							{loading ? "Generating..." : "Generate"}
						</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	form: {
		alignItems: "center",
		width: "100%",
	},
	image: {
		width: 300,
		height: 225,
		borderRadius: 10,
		marginBottom: 20,
	},
	imagePlaceholder: {
		width: 300,
		height: 225,
		borderRadius: 10,
		backgroundColor: colors.lightGrey,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	imagePlaceholderText: {
		fontSize: 16,
		color: colors.grey,
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

export default CreateWorkoutScreen;
