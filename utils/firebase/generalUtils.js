import showRegisterAlert from "../../helpers/showRegisterAlert";
import { auth, db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const checkLoggedInAndAlert = (navigation) => {
	const currentUser = auth.currentUser;
	if (!currentUser) {
		showRegisterAlert(navigation);
		return false;
	}
	return true;
};

export const createId = () => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < 10; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const countDocumentsInCollection = async (collectionPath) => {
	try {
		const uid = auth.currentUser.uid;
		const querySnapshot = await getDocs(
			collection(db, "users", uid, collectionPath)
		);
		return querySnapshot.size;
	} catch (error) {
		console.error(`Error counting documents in ${collectionPath}:`, error);
		throw error;
	}
};
