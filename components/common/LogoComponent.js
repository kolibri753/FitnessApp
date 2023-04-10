import React from "react";
import {
	StyleSheet,
	View,
	Text,
} from "react-native";
import { colors } from "../../styles/colors";
import Logo from "../../assets/logo.svg";

const LogoComponent = () => {

	return (
		<View style={styles.logoContainer}>
			<Text style={styles.logoText}>Gym</Text>
			<Logo width={60} height={40} fill="white" />
			<Text style={[styles.logoText, { color: colors.white }]}>Rat</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	logoText: {
		fontSize: 30,
		fontWeight: "bold",
		color: colors.yellow,
	},
});

export default LogoComponent;
