import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { db, auth } from "../firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const ExerciseComponent = ({ navigation, exercise }) => {
	const [isStarred, setIsStarred] = useState(false);

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

	return (
		<View style={styles.container}>
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
});

export default ExerciseComponent;
