import { auth, db } from "../../firebaseConfig";
import {
	collection,
	getDocs,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { countDocumentsInCollection } from "./generalUtils";

export const fetchUserActivity = async (onSuccess, onError) => {
	try {
		const uid = auth.currentUser.uid;
		const userActivitiesRef = collection(db, "users", uid, "userActivities");

		const querySnapshot = await getDocs(userActivitiesRef);

		const data = querySnapshot.docs.map((doc) => {
			const { workoutName, timestamp, targets } = doc.data();
			return {
				workoutName,
				timestamp: timestamp.toDate(),
				targets,
			};
		});

		onSuccess(data);
	} catch (error) {
		console.error("Error fetching workout data: ", error);
		onError(error);
		throw error;
	}
};

export const createUserActivity = async (workoutName, exercises) => {
	try {
		const uid = auth.currentUser?.uid;

		if (!uid) return;

		const userActivitiesRef = collection(db, "users", uid, "userActivities");
		const timestamp = serverTimestamp();

		await addDoc(userActivitiesRef, {
			workoutName,
			timestamp,
			targets: exercises.map((exercise) => exercise.target),
		});

		console.log("New user activity created successfully!");
	} catch (error) {
		console.error("Error creating user activity: ", error);
		throw error;
	}
};

export const countFinishedWorkouts = async () => {
	return await countDocumentsInCollection("userActivities");
};
