import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import LogoComponent from "../components/LogoComponent";
import TopNavigationComponent from "../components/TopNavigationComponent";
import InputComponent from "../components/InputComponent";

import { db, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegistrationScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const handleRegister = () => {
		let newErrors = [];

		if (!name.trim()) {
			newErrors.push("Please enter your name");
		}

		if (!email.trim()) {
			newErrors.push("Please enter your email");
		}

		if (!password.trim()) {
			newErrors.push("Please enter your password");
		}

		if (!confirmPassword.trim()) {
			newErrors.push("Please confirm your password");
		} else if (password.trim() !== confirmPassword.trim()) {
			newErrors.push("Passwords do not match");
		}

		setErrors(newErrors);

		if (newErrors.length === 0) {
			
			createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
					const user = userCredential.user;
					console.log("userCredential " + user);
					updateProfile(userCredential.user, {
							displayName: name,
						})
						.then(() => {
							console.log("User registered successfully:", userCredential.user);
							navigation.navigate("Main");
						})
						.catch((error) => {
							setErrors([error.message]);
						});
				})
				.catch((error) => {
					// An error occurred
					const errorCode = error.code;
					let errorMessage = error.message;
					if (errorCode === "auth/email-already-exists") {
						errorMessage = "This email is already used.";
					} else if (errorCode === "auth/invalid-email") {
						errorMessage = "Wrong email format.";
					}
					setErrors([errorMessage]);
					console.log(errorCode, errorMessage);
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title="Sign Up" activeDot={2} />
			<View style={styles.content}>
				<LogoComponent />
				<Text style={styles.motivation}>
					"Exercise is a celebration of what your body can do. Not a punishment for what you ate."
				</Text>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={-20}
				>
					<InputComponent
						placeholder="Name"
						value={name}
						onChangeText={(text) => {
							setName(text);
							setErrors("");
						}}
					/>
					<InputComponent
						placeholder="Email"
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							setErrors("");
						}}
					/>
					<InputComponent
						placeholder="Password"
						value={password}
						onChangeText={(text) => {
							setPassword(text);
							setErrors("");
						}}
						secureTextEntry={true}
					/>
					<InputComponent
						placeholder="Confirm Password"
						value={confirmPassword}
						onChangeText={(text) => {
							setConfirmPassword(text);
							setErrors("");
						}}
						secureTextEntry={true}
					/>
					{errors.length > 0 &&
						errors.map((error, index) => (
							<Text key={index} style={styles.error}>
								{error}
							</Text>
						))}
					<TouchableOpacity style={styles.button} onPress={handleRegister}>
						<Text style={styles.buttonText}>Sign up</Text>
					</TouchableOpacity>
					<View style={styles.signin}>
						<Text style={styles.signinText}>
							Registered succssesfully?{"\n"}
							<Text
								style={styles.signinLink}
								onPress={() => navigation.navigate("AuthorizationScreen")}
							>
								Go back to Login
							</Text>
						</Text>
					</View>
				</KeyboardAvoidingView>
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
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	motivation: {
		fontSize: 16,
		fontStyle: "italic",
		color: colors.white,
		marginVertical: 15,
		textAlign: "center",
	},
	form: {
		alignItems: "center",
		width: "100%",
	},
	input: {
		backgroundColor: colors.gray,
		borderRadius: 25,
		padding: 15,
		marginVertical: 10,
		color: colors.white,
	},
	error: {
		color: "red",
		textAlign: "center",
		// marginBottom: 10,
	},
	button: {
		backgroundColor: colors.yellow,
		borderRadius: 5,
		padding: 10,
		width: "80%",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: colors.black,
	},
	signin: {
		marginTop: 50,
	},
	signinText: {
		color: colors.white,
		fontSize: 16,
		fontStyle: "italic",
		textAlign: "center",
	},
	signinLink: {
		color: colors.yellow,
		fontWeight: "bold",
	},
});

export default RegistrationScreen;
