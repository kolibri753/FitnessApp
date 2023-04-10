import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Modal,
	TextInput,
	Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

const ExerciseView = ({
	model,
	handleSelectExercise,
	isStarred,
	handleStarPress,
	isModalVisible,
	openModal,
	closeModal,
	description,
	setDescription,
	time,
	setTime,
	rest,
	setRest,
}) => {
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
				<Image style={styles.image} source={{ uri: model.gifUrl }} />
			</View>
			<View style={styles.details}>
				<Text style={styles.title}>{model.name}</Text>
			</View>
			<Modal animationType="slide" transparent={true} visible={isModalVisible}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<TouchableOpacity style={styles.closeButton} onPress={closeModal}>
							<MaterialIcons name="close" size={24} color="black" />
						</TouchableOpacity>
						<Text style={styles.modalTitle}>
							Add |{model.name}| to your workout
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
								value={time}
								onChangeText={(text) => setTime(text)}
								keyboardType="numeric"
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Rest time</Text>
							<TextInput
								style={styles.input}
								value={rest}
								onChangeText={(text) => setRest(text)}
								keyboardType="numeric"
							/>
						</View>
						<Button
							title="Add to workout"
							onPress={() => {
								model.updateDetails(description, time, rest);
								handleSelectExercise(model);
								closeModal();
							}}
						/>
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

export default ExerciseView;