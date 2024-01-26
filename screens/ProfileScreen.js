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
import { Entypo, Ionicons } from "@expo/vector-icons";
import TopNavigation from "../components/common/TopNavigation";
import InputField from "../components/common/InputField";
import { handleLogout } from "../redux/slices/authorizationSlice";
import {
	updateUserName,
	updatePhotoURL,
	fetchUserProfile,
} from "../utils/firebaseUtils";

const ProfileScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [newName, setNewName] = useState("");
	const [photoURL, setPhotoURL] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		const userProfile = fetchUserProfile();
		if (userProfile) {
			const { email, name, photoURL } = userProfile;
			setEmail(email);
			setName(name);
			setPhotoURL(photoURL);
		}
	}, [name, photoURL]);

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

	const handleChangeName = async () => {
		try {
			const message = await updateUserName(newName);
			setName(newName.trim());
			setNewName("");
			Alert.alert("Success", message);
		} catch (error) {
			Alert.alert("Error", error.message || "Failed to update name.");
		}
	};

	const handleChangePhotoURL = async () => {
		try {
			const message = await updatePhotoURL(setPhotoURL);
			if (message) {
				Alert.alert("Info", message);
			} else {
				const userProfile = fetchUserProfile();
				const { photoURL } = userProfile;
				setPhotoURL(photoURL);
				Alert.alert("Success", "Photo URL updated successfully.");
			}
		} catch (error) {
			Alert.alert("Error", error.message || "Failed to update photo URL.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation title="Profile" activeDot={1} />
			<View style={styles.content}>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={0}
				>
					{email && (
						<InputField
							placeholder="New name"
							value={newName}
							onChangeText={(text) => {
								setNewName(text);
							}}
						/>
					)}
					{email && (
						<TouchableOpacity style={styles.buttonIcon} onPress={handleChangeName}>
							<Entypo name="new-message" size={24} color={colors.yellow} />
						</TouchableOpacity>
					)}
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
					style={styles.navButton}
					onPress={() => navigation.navigate("FavoriteExercisesScreen")}
				>
					<Ionicons name="heart" size={24} color={colors.black} />
					<Text style={styles.navButtonText}>Favorites</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navButton}
					onPress={() => navigation.navigate("MyWorkoutsScreen")}
				>
					<Ionicons name="barbell" size={24} color={colors.black} />
					<Text style={styles.navButtonText}>My Workouts</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navButton}
					onPress={() => navigation.navigate("ActivityCalendarScreen")}
				>
					<Ionicons name="calendar-sharp" size={24} color={colors.black} />
					<Text style={styles.navButtonText}>Activity Calendar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navButton}
					onPress={() => navigation.navigate("AboutAppScreen")}
				>
					<Ionicons name="information-circle" size={24} color={colors.black} />
					<Text style={styles.navButtonText}>About App</Text>
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
		backgroundColor: colors.black,
	},
	content: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: colors.grey,
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
	navButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.yellow,
		borderRadius: 5,
		padding: 10,
		width: "80%",
		marginVertical: 10,
	},
	navButtonText: {
		color: colors.black,
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 10,
	},
	logoutText: {
		marginTop: 10,
		fontSize: 18,
		fontWeight: "bold",
		color: colors.yellow,
	},
});

export default ProfileScreen;
