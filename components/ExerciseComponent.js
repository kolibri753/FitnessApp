import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

const ExerciseComponent = ({ exercise }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.button}>
					<MaterialIcons name="star-border" size={24} color="#333" />
				</TouchableOpacity>
			</View>
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
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	button: {
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
		color: colors.yello,
	},
});

export default ExerciseComponent;
