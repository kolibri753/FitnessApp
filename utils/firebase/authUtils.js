import { Alert } from "react-native";
import { auth } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
	requestMediaLibraryPermissions,
	launchImageLibrary,
} from "../../utils/imagePickerUtils";

export const fetchUserProfile = () => {
	const user = auth.currentUser;
	if (user) {
		const { email, displayName: name, photoURL } = user;
		return { email, name, photoURL };
	}
	return null;
};

export const updateUserName = async (newName) => {
	try {
		if (newName.trim() === "") {
			throw new Error("Name cannot be empty.");
		}

		await updateProfile(auth.currentUser, {
			displayName: newName.trim(),
		});

		return "Name updated successfully.";
	} catch (error) {
		console.error("Error updating name: ", error);
		throw error;
	}
};

export const updatePhotoURL = async () => {
	try {
		if (!auth.currentUser) {
			throw new Error("To customize the profile, please register first.");
		}

		const hasPermission = await requestMediaLibraryPermissions();

		if (!hasPermission) {
			Alert.alert("Error", "Permission to access the media library is required.");
			return;
		}

		const result = await launchImageLibrary();

		if (result.canceled || !(result.assets && result.assets.length > 0)) {
			return;
		}

		await updateProfile(auth.currentUser, {
			photoURL: result.assets[0].uri,
		});

		return "Photo URL updated successfully.";
	} catch (error) {
		console.error("Error updating photo URL: ", error);
		throw error;
	}
};
