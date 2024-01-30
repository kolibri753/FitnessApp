import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
	requestMediaLibraryPermissions,
	launchImageLibrary,
} from "../../utils/imagePickerUtils";
import { colors } from "../../styles/colors";

const ImageSelector = ({ onSelectImage, image }) => {
	const handleSelectImage = async () => {
		const granted = await requestMediaLibraryPermissions();

		if (!granted) {
			console.log("Permission to access media library is required");
			return;
		}

		const result = await launchImageLibrary();

		if (!result.canceled) {
			onSelectImage(result.assets[0].uri);
		}
	};

	return (
		<TouchableOpacity onPress={handleSelectImage}>
			{image ? (
				<Image source={{ uri: image }} style={styles.image} />
			) : (
				<View style={styles.imagePlaceholder}>
					<Text style={styles.imagePlaceholderText}>Select an Image</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 300,
		height: 225,
		borderRadius: 10,
		marginBottom: 20,
	},
	imagePlaceholder: {
		width: 300,
		height: 225,
		borderRadius: 10,
		backgroundColor: colors.lightGrey,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	imagePlaceholderText: {
		fontSize: 16,
		color: colors.grey,
	},
});

export default ImageSelector;
