import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import showRegisterAlert from "../helpers/showRegisterAlert";
import { db, auth } from "../firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import useStarredExercise from "../hooks/useStarredExercise";
import ExerciseModal from "./ExerciseModal";

const ExerciseComponent = ({
	navigation,
	exercise,
	handleSelectExercise,
	showSelectButton,
}) => {
	const [isStarred, setIsStarred] = useStarredExercise(exercise.id);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [description, setDescription] = useState("");
	const [time, setTime] = useState("");
	const [rest, setRest] = useState("");

	const handleStarPress = async () => {
		try {
			if (auth.currentUser) {
				const userRef = doc(db, "users", auth.currentUser.uid);
				const exerciseRef = doc(userRef, "favoriteExercises", exercise.id);
				const exerciseDoc = await getDoc(exerciseRef);

				if (exerciseDoc.exists()) {
					// Exercise is already starred, so delete it from favoriteExercises
					await deleteDoc(exerciseRef);
					setIsStarred(false);
				} else {
					// Exercise is not starred, so add it to favoriteExercises
					await setDoc(exerciseRef, {
						...exercise,
						starredAt: new Date(),
					});
					setIsStarred(true);
				}
			} else {
				showRegisterAlert(navigation);
			}
		} catch (error) {
			console.error("Error adding/deleting exercise to/from firestore:", error);
		}
	};

	const openModal = () => {
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const handleSaveExercise = async () => {
		if (time.trim() === "" || rest.trim() === "") {
			return;
		}

		const { id, ...exerciseDataWithoutId } = exercise;
		const updatedExerciseData = {
			...exerciseDataWithoutId,
			description: description,
			time: time,
			rest: rest,
		};

		handleSelectExercise(updatedExerciseData);
		closeModal();
	};

	return (
		<View style={styles.container}>
			{showSelectButton && (
				<TouchableOpacity style={styles.selectButton} onPress={openModal}>
					<MaterialIcons name="check" size={28} color={colors.black} />
				</TouchableOpacity>
			)}
			<TouchableOpacity style={styles.button} onPress={handleStarPress}>
				<MaterialIcons
					name={isStarred ? "star" : "star-border"}
					size={28}
					color={isStarred ? colors.yellow : colors.black}
				/>
			</TouchableOpacity>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: exercise.gifUrl }} />
			</View>
			<View style={styles.details}>
				<Text style={styles.title}>{exercise.name}</Text>
			</View>
			<ExerciseModal
				isModalVisible={isModalVisible}
				closeModal={closeModal}
				handleSaveExercise={handleSaveExercise}
				exercise={exercise}
				description={description}
				setDescription={setDescription}
				time={time}
				setTime={setTime}
				rest={rest}
				setRest={setRest}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 10,
		padding: 20,
		marginBottom: 20,
		elevation: 2,
		position: "relative",
	},
	button: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 2,
		padding: 5,
		borderRadius: 50,
		backgroundColor: colors.lightGrey,
	},
	selectButton: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 2,
		padding: 5,
		borderRadius: 50,
		backgroundColor: colors.lightGrey,
	},
	imageContainer: {
		alignItems: "center",
		marginVertical: 10,
	},
	image: {
		width: "100%",
		height: 300,
		borderRadius: 10,
		resizeMode: "cover",
	},
	details: {
		marginVertical: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default React.memo(ExerciseComponent);
