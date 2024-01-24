import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import CustomModal from "../common/CustomModal";
import { colors } from "../../styles/colors";

const AddExerciseToWorkoutModal = ({
	isModalVisible,
	closeModal,
	handleSaveExercise,
	exercise,
	description,
	setDescription,
	time,
	setTime,
	rest,
	setRest,
}) => {
	return (
		<CustomModal
			isModalVisible={isModalVisible}
			closeModal={closeModal}
			title={`Add |${exercise.name}| to your workout`}
		>
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
		</CustomModal>
	);
};

const styles = StyleSheet.create({
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
		fontWeight: "900",
	},
});

export default AddExerciseToWorkoutModal;
