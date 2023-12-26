import showRegisterAlert from "../helpers/showRegisterAlert";
import { auth, db } from "../firebaseConfig";
import {
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	onSnapshot,
} from "firebase/firestore";

export const checkLoggedInAndAlert = (navigation) => {
	const currentUser = auth.currentUser;
	if (!currentUser) {
		showRegisterAlert(navigation);
		return false;
	}
	return true;
};

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

export const fetchUserWorkouts = (uid, onSuccess, onError) => {
	const unsubscribe = onSnapshot(
		collection(db, "users", uid, "userWorkouts"),
		(snapshot) => {
			const workouts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			onSuccess(workouts);
		},
		onError
	);

	return unsubscribe;
};

export const fetchUserWorkout = async (workoutId) => {
	try {
		const userRef = doc(db, "users", auth.currentUser.uid);
		const workoutDocRef = doc(userRef, "userWorkouts", workoutId);
		const workoutDoc = await getDoc(workoutDocRef);

		return workoutDoc.exists() ? workoutDoc.data() : null;
	} catch (error) {
		console.error("Error fetching workout: ", error);
		return null;
	}
};

export const deleteUserWorkout = async (uid, workoutId, onSuccess, onError) => {
	try {
		await deleteDoc(doc(db, "users", uid, "userWorkouts", workoutId));
		onSuccess("Workout deleted successfully");
	} catch (error) {
		onError(`Error deleting workout: ${error}`);
	}
};

export const createUserWorkout = async (
	name,
	description,
	image,
	onSuccess,
	onError
) => {
	try {
		const userRef = doc(db, "users", auth.currentUser.uid);
		const workoutDocRef = doc(userRef, "userWorkouts", createId());
		await setDoc(workoutDocRef, { name, description, image });

		onSuccess("Workout created successfully");
	} catch (error) {
		onError(`Error adding workout: ${error}`);
	}
};

export const createId = () => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < 10; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const updateUserWorkout = async (
	workoutId,
	name,
	description,
	image,
	onSuccess,
	onError
) => {
	try {
		const userRef = doc(db, "users", auth.currentUser.uid);
		const workoutDocRef = doc(userRef, "userWorkouts", workoutId);
		await updateDoc(workoutDocRef, { name, description, image });

		onSuccess("Workout updated successfully");
	} catch (error) {
		onError(`Error updating workout: ${error}`);
	}
};

export const fetchWorkoutExercises = (uid, workoutId, setExercises) => {
	const userWorkoutsRef = collection(
		db,
		"users",
		uid,
		"userWorkouts",
		workoutId,
		"exercises"
	);

	const unsubscribe = onSnapshot(userWorkoutsRef, (snapshot) => {
		const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		const sortedData = data.sort((a, b) => a.order - b.order);
		setExercises(sortedData);
	});

	return unsubscribe;
};

export const deleteWorkoutExercise = async (uid, workoutId, exerciseId) => {
	try {
		const exerciseRef = doc(
			db,
			"users",
			uid,
			"userWorkouts",
			workoutId,
			"exercises",
			exerciseId
		);

		await deleteDoc(exerciseRef);
		console.log("Exercise deleted successfully!");
	} catch (error) {
		console.error("Error deleting exercise: ", error);
	}
};

export const fetchUserActivity = (onSuccess, onError) => {
	try {
		const userId = auth.currentUser.uid;
		const userActivitiesRef = collection(db, "users", userId, "userActivities");

		const unsubscribe = onSnapshot(
			userActivitiesRef,
			(snapshot) => {
				const data = snapshot.docs.map((doc) => {
					const { workoutName, timestamp, targets } = doc.data();
					return {
						workoutName,
						timestamp: timestamp.toDate(),
						targets,
					};
				});
				onSuccess(data);
			},
			onError
		);

		return unsubscribe;
	} catch (error) {
		console.error("Error fetching workout data: ", error);
		onError(error);
		throw error;
	}
};
