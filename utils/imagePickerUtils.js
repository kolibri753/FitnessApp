import * as ImagePicker from "expo-image-picker";

export const requestMediaLibraryPermissions = async () => {
	const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
	return status === "granted";
};

export const launchImageLibrary = async () => {
	return ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [1, 1],
		quality: 1,
	});
};
