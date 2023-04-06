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

import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import InputComponent from "../components/InputComponent";

const AuthorizationScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is logged in, navigate to main screen
			console.log("User is logged in");
			// navigation.navigate("Main");
		} else {
			// User is not logged in
			console.log("User is not logged in");
		}
	});

	const handleLogin = () => {
		let newErrors = [];

		if (!email.trim()) {
			newErrors.push("Please enter your name");
		}

		if (!password.trim()) {
			newErrors.push("Please enter your email");
		}

		setErrors(newErrors);

		if (newErrors.length === 0) {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// The user has been authenticated successfully
					const user = userCredential.user;
					console.log(user);
					navigation.navigate("Main");
				})
				.catch((error) => {
					// An error occurred
					const errorCode = error.code;
					let errorMessage = error.message;
					if (errorCode === "auth/email-already-exists") {
						errorMessage = "This email is already used.";
					} else if (errorCode === "auth/invalid-email") {
						errorMessage = "Wrong email format.";
					} else if (errorCode === "auth/user-not-found") {
						errorMessage = "This email is not registred yet.";
					}
					setErrors([errorMessage]);
					console.log(errorCode, errorMessage);
				});
		}
	};

	const handleUseWithoutAuthorization = () => {
		navigation.navigate("Main");
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title="Sign In" activeDot={1} />
			<View style={styles.content}>
				<LogoComponent />
				<Text style={styles.motivation}>
					"Transform your body, transform your life. Let this fitness app be your guide on the journey to a healthier and happier you."
				</Text>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={50}
				>
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
					{errors.length > 0 &&
						errors.map((error, index) => (
							<Text key={index} style={styles.error}>
								{error}
							</Text>
						))}
					<TouchableOpacity style={styles.button} onPress={handleLogin}>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
				<View style={styles.signup}>
					<Text style={styles.signupText}>
						Don't have an account?{"\n"}
						<Text
							style={styles.signupLink}
							onPress={() => navigation.navigate("RegistrationScreen")}
						>
							Create one here
						</Text>
					</Text>
				</View>
			</View>
			<TouchableOpacity onPress={handleUseWithoutAuthorization}>
				<Text style={styles.appLink}>Use app without authorization</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: colors.grey,
	},
	content: {
		flex: 0,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 20,
		color: colors.white,
	},
	motivation: {
		fontSize: 16,
		fontStyle: "italic",
		marginBottom: 50,
		color: colors.white,
		textAlign: "center",
	},
	form: {
		alignItems: "center",
		width: "100%",
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
		color: colors.black,
		fontSize: 18,
		fontWeight: "bold",
	},
	error: {
		color: "red",
		// marginTop: 10,
	},
	signup: {
		marginTop: 50,
	},
	signupText: {
		color: colors.white,
		fontSize: 16,
		fontStyle: "italic",
		textAlign: "center",
	},
	signupLink: {
		color: colors.yellow,
		fontWeight: "bold",
	},
	appLink: {
		color: colors.white,
		fontStyle: "italic",
		textAlign: "center",
		marginBottom: 20,
	},
});

export default AuthorizationScreen;
