import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutComponent from "../components/WorkoutComponent";
import TopNavigationComponent from "../components/TopNavigationComponent";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { auth, db } from "../firebaseConfig";
import {
	collection,
	getDocs,
	doc,
	setDoc,
	onSnapshot,
} from "firebase/firestore";
// import data from "../assets/data/workouts.json";

const MyWorkoutsScreen = ({ navigation }) => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
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

			return;
		}

		const unsubscribe = onSnapshot(
			collection(db, "users", auth.currentUser.uid, "userWorkouts"),
			(snapshot) => {
				setWorkouts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			}
		);

		return unsubscribe;
	}, []);

	const handleCreateWorkoutPress = () => {
		navigation.navigate("CreateWorkoutScreen");
	};

	const handleWorkoutPress = (workout) => {
		navigation.navigate("WorkoutExercisesScreen", { workout });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title="Choose Workout" activeDot={1} />
			<ScrollView style={styles.scrollContainer}>
				<TouchableOpacity
					onPress={handleCreateWorkoutPress}
					style={styles.button}
					activeOpacity={0.5}
				>
					<Text style={styles.buttonText}>Create Workout</Text>
					<AntDesign name="pluscircle" size={24} color="black" />
				</TouchableOpacity>
				{workouts.map((workout, index) => (
					<WorkoutComponent
						key={index}
						workout={workout}
						handleWorkoutPress={handleWorkoutPress}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	scrollContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	title: {
		color: colors.white,
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	subtitle: {
		color: colors.white,
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
		textAlign: "center",
	},
	button: {
		display: "flex",
		flexDirection: "row",
		gap: 14,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.yellow,
		borderRadius: 10,
		padding: 10,
		marginBottom: 20,
	},
	buttonText: {
		color: colors.black,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default MyWorkoutsScreen;
