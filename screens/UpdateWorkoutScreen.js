import React, { useState, useEffect } from "react";
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
import TopNavigationComponent from "../components/TopNavigationComponent";
import InputComponent from "../components/InputComponent";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import * as ImagePicker from "expo-image-picker";

const UpdateWorkoutScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState("");

  const { workout } = route.params;
  console.log(workout);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const workoutDocRef = doc(userRef, "userWorkouts", workout.id);
        const workoutDoc = await getDoc(workoutDocRef);

        if (workoutDoc.exists()) {
          const { name, description, image } = workoutDoc.data();
          setName(name);
          setDescription(description);
          setImage(image);
        } else {
          console.log("Workout not found");
        }
      } catch (error) {
        console.error("Error fetching workout: ", error);
      }
    }
    fetchWorkout();
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
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const workoutDocRef = doc(userRef, "userWorkouts", workout.id);
        await updateDoc(workoutDocRef, { name, description, image });

        console.log("Workout updated successfully");
        navigation.navigate("MyWorkoutsScreen");
      } catch (error) {
        console.error("Error updating workout: ", error);
      }
    }
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
			<TopNavigationComponent title="Update Workout" activeDot={2} />
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
					<InputComponent
						placeholder="Workout Name"
						value={name}
						onChangeText={(text) => {
							setName(text);
							setErrors("");
						}}
					/>
					<InputComponent
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

export default UpdateWorkoutScreen;
