import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/colors";

const InputComponent = ({
	placeholder,
	value,
	onChangeText,
	secureTextEntry,
	error,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={[styles.input, error ? styles.error : null]}
				placeholder={placeholder}
				placeholderTextColor={colors.white}
				selectionColor={colors.yellow}
				onChangeText={onChangeText}
				value={value}
				secureTextEntry={!showPassword && secureTextEntry}
			/>
			{secureTextEntry && (
				<TouchableOpacity
					onPress={() => setShowPassword(!showPassword)}
					style={styles.iconContainer}
				>
					<Icon
						name={showPassword ? "eye-slash" : "eye"}
						size={20}
						color={colors.white}
					/>
				</TouchableOpacity>
			)}
			{error ? <Text style={styles.errorMessage}>{error}</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: colors.yellow,
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		backgroundColor: colors.black,
		color: colors.white,
		position: "relative",
	},
	iconContainer: {
		position: "absolute",
		top: 15,
		right: 15,
	},
	error: {
		color: "red",
		marginTop: 10,
	},
	errorMessage: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
});

export default InputComponent;
