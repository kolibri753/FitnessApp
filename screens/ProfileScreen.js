import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
	Image,
	KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { Entypo } from "@expo/vector-icons";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import InputComponent from "../components/common/InputComponent";
import { handleLogout } from "../redux/slices/authorizationSlice";

import * as ImagePicker from "expo-image-picker";

import { auth } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [newName, setNewName] = useState("");
	const [photoURL, setPhotoURL] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		const user = auth.currentUser;
		if (user) {
			setEmail(user.email);
			setName(user.displayName);
			setPhotoURL(user.photoURL);
		}
	}, []);

	const handleLogoutBtnPress = () => {
		dispatch(handleLogout())
			.then(() => {
				navigation.reset({
					index: 0,
					routes: [{ name: "AuthorizationScreen" }],
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChangeName = () => {
		if (newName.trim() === "") {
			Alert.alert("Error", "Name cannot be empty.");
			return;
		}

		updateProfile(auth.currentUser, {
			displayName: newName.trim(),
		})
			.then(() => {
				setName(newName.trim());
				setNewName("");
				Alert.alert("Success", "Name updated successfully.");
			})
			.catch((error) => {
				console.log(error);
				Alert.alert("Error", "Failed to update name.");
			});
	};

	const handleChangePhotoURL = async () => {
		console.log("changeImage");
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Error", "Permission to access media library is required.");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled || (result.assets && result.assets.length > 0)) {
			updateProfile(auth.currentUser, {
				photoURL: result.assets[0].uri,
			})
				.then(() => {
					setPhotoURL(result.assets[0].uri);
					Alert.alert("Success", "Photo URL updated successfully.");
				})
				.catch((error) => {
					console.log(error);
					Alert.alert("Error", "Failed to update photo URL.");
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title="Profile" activeDot={1} />
			<View style={styles.content}>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={0}
				>
					<InputComponent
						placeholder="New name"
						value={newName}
						onChangeText={(text) => {
							setNewName(text);
						}}
					/>
					<TouchableOpacity style={styles.buttonIcon} onPress={handleChangeName}>
						<Entypo name="new-message" size={24} color={colors.yellow} />
					</TouchableOpacity>
				</KeyboardAvoidingView>
				<TouchableOpacity onPress={handleChangePhotoURL}>
					<Image
						source={
							photoURL
								? { uri: photoURL }
								: require("../assets/default-profile-img.jpg")
						}
						style={styles.profilePhoto}
					/>
				</TouchableOpacity>
				<Text style={styles.title}>Hello, {name ? name : "there"}!</Text>
				<Text style={styles.email}>{email}</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("FavoriteExercisesScreen")}
				>
					<Text style={styles.buttonText}>Favorite Exercises</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("MyWorkoutsScreen")}
				>
					<Text style={styles.buttonText}>My Workouts</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.logoutButton}
					onPress={handleLogoutBtnPress}
				>
					<Text style={styles.logoutText}>Logout</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	content: {
		flex: 1,
		alignItems: "center",
		marginTop: 20,
		// justifyContent: "space-around",
		paddingHorizontal: 20,
	},
	profilePhoto: {
		height: 200,
		width: 200,
		borderRadius: 100,
		backgroundColor: colors.white,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 20,
		color: colors.white,
	},
	email: {
		fontSize: 16,
		marginBottom: 50,
		color: colors.white,
		textAlign: "center",
	},
	form: {
		width: "100%",
		marginBottom: 20,
		position: "relative",
	},
	input: {
		backgroundColor: colors.white,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		width: "80%",
	},
	buttonIcon: {
		position: "absolute",
		top: 0,
		right: 0,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	button: {
		backgroundColor: colors.yellow,
		borderRadius: 5,
		padding: 10,
		width: "80%",
		alignItems: "center",
		marginVertical: 10,
	},
	buttonText: {
		color: colors.black,
		fontSize: 18,
		fontWeight: "bold",
	},
	logoutText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.yellow,
	},
});

export default ProfileScreen;
