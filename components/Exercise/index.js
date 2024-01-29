import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { toggleStarredExercise } from "../../utils/firebase/favoriteExercisesUtils";
import useStarredExercise from "../../hooks/useStarredExercise";
import AddExerciseToWorkoutModal from "./AddToWorkoutModal";

const Exercise = ({
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
      const toggledStar = await toggleStarredExercise(exercise, navigation);
      setIsStarred(toggledStar);
    } catch (error) {
      console.error("Error toggling starred exercise:", error);
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
			<AddExerciseToWorkoutModal
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
		marginBottom: 10,
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

export default React.memo(Exercise);
