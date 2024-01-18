import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import Logo from "../components/common/Logo";
import TopNavigation from "../components/common/TopNavigation";
import InputField from "../components/common/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
	setName,
	setEmail,
	setPassword,
	setConfirmPassword,
	handleRegister,
	setErrors,
} from "../redux/slices/registrationSlice";

const RegistrationScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { name, email, password, confirmPassword, errors } = useSelector(
		(state) => state.registration
	);

	const handleRegisterButtonPress = () => {
		let newErrors = [];
		if (!name.trim()) {
			newErrors.push("Please enter your name.");
		}
		if (!email.trim()) {
			newErrors.push("Please enter your email.");
		}
		if (!password.trim()) {
			newErrors.push("Please enter your password.");
		}
		if (!confirmPassword.trim()) {
			newErrors.push("Please confirm your password.");
		}

		dispatch(setErrors(newErrors));

		if (newErrors.length === 0) {
			dispatch(handleRegister(name, email, password))
				.then((response) => {
					if (response.success) {
						console.log("User registered successfully");
						navigation.navigate("Main");
					} else {
						dispatch(setErrors([response.error]));
					}
				})
				.catch((error) => {
					dispatch(setErrors([error.error]));
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation title="Sign Up" activeDot={2} />
			<View style={styles.content}>
				<Logo />
				<Text style={styles.motivation}>
					"Exercise is a celebration of what your body can do. Not a punishment for
					what you ate."
				</Text>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={-20}
				>
					<InputField
						placeholder="Name"
						value={name}
						onChangeText={(text) => {
							dispatch(setName(text));
							dispatch(setErrors(""));
						}}
					/>
					<InputField
						placeholder="Email"
						value={email}
						onChangeText={(text) => {
							dispatch(setEmail(text));
							dispatch(setErrors(""));
						}}
					/>
					<InputField
						placeholder="Password"
						value={password}
						onChangeText={(text) => {
							dispatch(setPassword(text));
							dispatch(setErrors(""));
						}}
						secureTextEntry={true}
					/>
					<InputField
						placeholder="Confirm Password"
						value={confirmPassword}
						onChangeText={(text) => {
							dispatch(setConfirmPassword(text));
							dispatch(setErrors(""));
						}}
						secureTextEntry={true}
					/>
					{errors.length > 0 &&
						errors.map((error, index) => (
							<Text key={index} style={styles.error}>
								{error}
							</Text>
						))}
					<TouchableOpacity
						style={styles.button}
						onPress={handleRegisterButtonPress}
					>
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
