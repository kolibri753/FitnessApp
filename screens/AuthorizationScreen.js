import React, { useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../styles/colors";
import Logo from "../components/common/Logo";
import TopNavigation from "../components/common/TopNavigation";
import InputField from "../components/common/InputField";
import Toast from "react-native-root-toast";

import {
	setEmail,
	setPassword,
	setErrors,
	setAuthenticated,
	handleLogin,
	checkAuthenticated,
} from "../redux/slices/authorizationSlice";

const AuthorizationScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { email, password, errors, authenticated } = useSelector(
		(state) => state.authorization
	);

	useEffect(() => {
		dispatch(checkAuthenticated());
	}, [dispatch]);

	useEffect(() => {
		if (authenticated) {
			navigation.navigate("Main");
			Toast.show("You logged in using\n" + email, {
				duration: Toast.durations.LONG,
				position: 0,
				shadow: true,
				animation: true,
				hideOnPress: true,
				backgroundColor: colors.success,
				textColor: colors.white,
				delay: 0,
			});
		}
	}, [authenticated, navigation]);

	const handleUseWithoutAuthorization = () => {
		navigation.navigate("Main");
	};

	const handleLoginButtonPress = () => {
		let newErrors = [];

		if (!email.trim()) {
			newErrors.push("Please enter your email address.");
		}
		if (!password.trim()) {
			newErrors.push("Please enter your password.");
		}

		dispatch(setErrors(newErrors));

		if (newErrors.length === 0) {
			dispatch(handleLogin(email, password));
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation title="Sign In" activeDot={1} />
			<View style={styles.content}>
				<Logo />
				<Text style={styles.motivation}>
					"Transform your body, transform your life. Let this fitness app be your
					guide on the journey to a healthier and happier you."
				</Text>
				<KeyboardAvoidingView
					style={styles.form}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={50}
				>
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
					{errors.length > 0 &&
						errors.map((error, index) => (
							<Text key={index} style={styles.error}>
								{error}
							</Text>
						))}
					<TouchableOpacity style={styles.button} onPress={handleLoginButtonPress}>
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
