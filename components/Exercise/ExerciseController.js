import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { colors } from "../styles/colors";

const ExerciseController = (navigation, handleSelectExercise) => {
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

	const handleStarPress = async (exercise) => {
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

	const handleSaveExercise = async (exercise) => {
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

	return {
		isStarred,
		isModalVisible,
		description,
		time,
		rest,
		handleStarPress,
		openModal,
		closeModal,
		handleSaveExercise,
	};
};

export default ExerciseController;
