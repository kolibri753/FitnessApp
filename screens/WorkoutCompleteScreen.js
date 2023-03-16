import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import LottieView from "lottie-react-native";

const WorkoutCompleteScreen = ({ navigation }) => {
	const handleReturnPress = () => {
		navigation.popToTop();
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.messageContainer}>
				<LottieView
					source={require("../assets/data/fireworks.json")}
					autoPlay
					loop
					style={styles.animation}
				/>
				<Text style={styles.title}>Congratulations!</Text>
				<Text style={styles.message}>You have completed your workout.</Text>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={handleReturnPress}
					style={styles.returnButton}
					activeOpacity={0.5}
				>
					<Text style={styles.returnButtonText}>Return to Home</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
		padding: 20,
	},
	messageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		color: colors.white,
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	message: {
		color: colors.white,
		fontSize: 24,
		textAlign: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	returnButton: {
		backgroundColor: colors.yellow,
		borderRadius: 10,
		padding: 10,
		margin: 20,
	},
	returnButtonText: {
		color: colors.black,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
  animation: {
    width: 300,
    height: 300,
  },
});

export default WorkoutCompleteScreen;
