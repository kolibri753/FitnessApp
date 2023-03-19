import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import ExerciseTimerComponent from "./ExerciseTimerComponent";
import LottieView from "lottie-react-native";

const WorkoutRestComponent = ({ restTime, handleNextPress }) => {
	const [timeLeft, setTimeLeft] = useState(restTime);

	// useEffect(() => {
	//   if (timeLeft === 0) {
	//     handleNextPress();
	//   }
	// }, [timeLeft]);

	const handleSkipPress = () => {
		handleNextPress();
	};

	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.animatedTextContainer}>
				<LottieView
					source={require("../assets/data/break-text.json")}
					autoPlay
					loop
					style={styles.animationText}
				/>
			</View>
			<View style={[styles.container, isLandscape && styles.landscapeContainer]}>
				<View style={styles.animationContainer}>
					<LottieView
						source={require("../assets/data/cute-doggie.json")}
						autoPlay
						loop
						style={[styles.animation, isLandscape && styles.landscapeAnimation]}
					/>
				</View>
				<View style={[styles.infoContainer, isLandscape && styles.landscapeInfoContainer]}>
					<Text style={styles.title}>Rest Time</Text>
					<ExerciseTimerComponent
						timeLeft={timeLeft}
						setTimeLeft={setTimeLeft}
						handleNextPress={handleNextPress}
					/>
					<TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
						<Text style={styles.skipButtonText}>Skip</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
		alignItems: "center",
		justifyContent: "space-between",
	},
	landscapeContainer: {
		flexDirection: "row",
	},
	animationContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
  animatedTextContainer: {
    flex: 0,
    justifyContent: "center",
		alignItems: "center",
  },
	animation: {
		width: 300,
		height: 300,
	},
  landscapeAnimation: {
		width: 200,
		height: 200,
	},
	animationText: {
		height: 50,
	},
	infoContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
  landscapeInfoContainer: {
    flexDirection: "row",
    gap: 20,
    marginEnd: 100,
  },
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: colors.white,
		marginBottom: 10,
	},
	skipButton: {
		backgroundColor: colors.yellow,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginBottom: 10,
	},
	skipButtonText: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.black,
	},
});

export default WorkoutRestComponent;
