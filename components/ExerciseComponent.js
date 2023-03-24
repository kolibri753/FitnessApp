import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
	Modal,
	TextInput,
	Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { db, auth } from "../firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const ExerciseComponent = ({
	navigation,
	exercise,
	handleSelectExercise,
	showSelectButton,
}) => {
	const [isStarred, setIsStarred] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [description, setDescription] = useState("");
	const [time, setTime] = useState("");
	const [rest, setRest] = useState("");

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			return;
		}

		const unsubscribe = onSnapshot(
			doc(db, "users", currentUser.uid, "favoriteExercises", exercise.id),
			(snapshot) => {
				setIsStarred(snapshot.exists());
			},
			(error) => {
				console.error("Error fetching starred exercise:", error);
			}
		);

		return () => {
			unsubscribe();
		};
	}, [exercise.id, auth.currentUser]);

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
				Alert.alert(
					"This function is only for registered users",
					"Do you want to register now?",
					[
						{
							text: "Cancel",
							style: "cancel",
						},
						{
							text: "OK",
							onPress: () => {
								navigation.navigate("RegistrationScreen");
							},
						},
					]
				);
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
		const exerciseData = {
			...exercise,
			description: description,
			time: time,
			rest: rest,
		};

		handleSelectExercise(exerciseData);

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
			<Modal animationType="slide" transparent={true} visible={isModalVisible}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<TouchableOpacity style={styles.closeButton} onPress={closeModal}>
							<MaterialIcons name="close" size={24} color="black" />
						</TouchableOpacity>
						<Text style={styles.modalTitle}>
							Add |{exercise.name}| to your workout
						</Text>
						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Description</Text>
							<TextInput
								style={[styles.input, styles.multilineInput]}
								value={description}
								onChangeText={(text) => setDescription(text)}
								multiline={true}
								numberOfLines={4}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Time for exercise</Text>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={time}
								onChangeText={(text) => setTime(text)}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Rest time</Text>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={rest}
								onChangeText={(text) => setRest(text)}
							/>
						</View>
						<TouchableOpacity style={styles.saveButton} onPress={handleSaveExercise}>
							<Text style={styles.saveButtonText}>SAVE</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
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
		// marginBottom: 5,
	},
	category: {
		fontSize: 16,
		color: colors.yellow,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.grey,
	},
	modalContent: {
		backgroundColor: colors.lightGrey,
		borderRadius: 10,
		padding: 20,
		width: "90%",
		alignItems: "center",
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 20,
	},
	inputContainer: {
		marginBottom: 20,
		width: "100%",
	},
	inputLabel: {
		fontSize: 14,
		marginBottom: 5,
	},
	input: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		fontSize: 16,
		width: "100%",
	},
	multilineInput: {
		height: 100,
		textAlignVertical: "top",
	},
	saveButton: {
		backgroundColor: colors.yellow,
		borderRadius: 10,
		padding: 10,
		width: "100%",
		alignItems: "center",
		marginTop: 10,
	},
	saveButtonText: {
		color: colors.black,
		fontSize: 18,
		fontWeight: 900,
	},
});

export default ExerciseComponent;
