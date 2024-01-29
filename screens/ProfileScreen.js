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
import Stats from "../components/Profile/Stats";
import { handleLogout } from "../redux/slices/authorizationSlice";
import {
	fetchUserProfile,
	updateUserName,
	updatePhotoURL,
} from "../utils/firebase/authUtils";

const ProfileScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [newName, setNewName] = useState("");
	const [photoURL, setPhotoURL] = useState("");
	const [showInputField, setShowInputField] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		const userProfile = fetchUserProfile();
		if (userProfile) {
			const { email, name, photoURL } = userProfile;
			setEmail(email);
			setName(name);
			setNewName(name);
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
			if (newName.trim() !== name) {
				setName(newName.trim());
				Alert.alert("Success", message);
			}
			setShowInputField(false);
		} catch (error) {
			setShowInputField(false);
			Alert.alert("Error", error.message || "Failed to update name.");
		}
	};

	const handleChangePhotoURL = async () => {
		try {
			const message = await updatePhotoURL(setPhotoURL);
			if (message) {
				const userProfile = fetchUserProfile();
				const { photoURL } = userProfile;
				setPhotoURL(photoURL);
				Alert.alert("Success", message);
			}
		} catch (error) {
			Alert.alert("Error", error.message || "Failed to update photo URL.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation title="Profile" activeDot={1} />
			<View style={styles.content}>
				<TouchableOpacity onPress={handleChangePhotoURL}>
					<Image
						style={styles.profilePhoto}
						source={
							photoURL
								? { uri: photoURL }
								: require("../assets/default-profile-img.jpg")
						}
					/>
				</TouchableOpacity>
				<View style={styles.profileInfo}>
					<Text style={styles.email}>{email}</Text>
					<KeyboardAvoidingView
						style={styles.form}
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={0}
					>
						{email && (
							<>
								{showInputField ? (
									<InputField
										placeholder={"Write new name here"}
										value={newName}
										onChangeText={(text) => {
											setNewName(text);
										}}
										onSubmitEditing={handleChangeName}
									/>
								) : (
									<Text style={styles.title}>{name ? name : "unknown"}</Text>
								)}
								<TouchableOpacity
									style={styles.buttonIcon}
									onPress={
										showInputField
											? handleChangeName
											: () => setShowInputField(!showInputField)
									}
								>
									<Entypo name="new-message" size={24} color={colors.yellow} />
								</TouchableOpacity>
							</>
						)}
					</KeyboardAvoidingView>
					<Stats />
				</View>

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
		paddingVertical: 10,
		backgroundColor: colors.grey,
	},
	profilePhoto: {
		height: 200,
		width: 200,
		borderRadius: 100,
		backgroundColor: colors.white,
		marginBottom: 10,
	},
	profileInfo: {
		width: "100%",
		backgroundColor: colors.black,
		marginBottom: 20,
		borderRadius: 10,
	},
	title: {
		padding: 12,
		fontSize: 19,
		fontWeight: "bold",
		color: colors.white,
		marginBottom: 20,
	},
	email: {
		fontSize: 16,
		padding: 10,
		color: colors.white,
		textAlign: "center",
	},
	form: {
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
	logoutButton: {
		marginTop: "auto",
		marginBottom: 10,
	},
	logoutText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.yellow,
	},
});

export default ProfileScreen;
