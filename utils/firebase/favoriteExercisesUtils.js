import { auth, db } from "../../firebaseConfig";
import {
	collection,
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	onSnapshot,
} from "firebase/firestore";
import { checkLoggedInAndAlert, countDocumentsInCollection } from "./generalUtils";

export const fetchFavoriteExercises = (uid, setExercises) => {
	const unsubscribe = onSnapshot(
		collection(db, "users", uid, "favoriteExercises"),
		(snapshot) => {
			const exercises = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setExercises(exercises);
		},
		(error) => {
			console.error("Error fetching favorite exercises:", error);
		}
	);

	return unsubscribe;
};

export const toggleStarredExercise = async (exercise, navigation) => {
	try {
		if (!checkLoggedInAndAlert(navigation)) {
			return;
		}

		const userRef = doc(db, "users", auth.currentUser.uid);
		const exerciseRef = doc(userRef, "favoriteExercises", exercise.id);
		const exerciseDoc = await getDoc(exerciseRef);

		if (exerciseDoc.exists()) {
			await deleteDoc(exerciseRef);
			return false;
		} else {
			await setDoc(exerciseRef, {
				...exercise,
				starredAt: new Date(),
			});
			return true;
		}
	} catch (error) {
		console.error("Error adding/deleting exercise to/from firestore:", error);
		throw error;
	}
};

export const countFavoriteExercises = async () => {
	return await countDocumentsInCollection("favoriteExercises");
};
