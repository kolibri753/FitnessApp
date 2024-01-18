import showRegisterAlert from "../helpers/showRegisterAlert";
import { auth, db, realTimeDb } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	onSnapshot,
	serverTimestamp,
  query,
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

export const fetchUserWorkouts = (onSuccess, onError) => {
	const uid = auth.currentUser.uid;
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

export const deleteUserWorkout = async (workoutId, onSuccess, onError) => {
	try {
		const uid = auth.currentUser.uid;
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

export const fetchWorkoutExercises = (workoutId, setExercises) => {
	const uid = auth.currentUser.uid;
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

export const addWorkoutExercise = async (workoutId, exerciseData, onSuccess, onError) => {
  try {
		const uid = auth.currentUser.uid;
    const userWorkoutsRef = collection(
      db,
      "users",
      uid,
      "userWorkouts",
      workoutId,
      "exercises"
    );

    const q = query(userWorkoutsRef);
    const querySnapshot = await getDocs(q);

    const numExercises = querySnapshot.size;

    await addDoc(userWorkoutsRef, { ...exerciseData, order: numExercises + 1 });
    onSuccess("Exercise added to workout successfully");
	} catch (error) {
		onError(`Error adding exercise: ${error}`);
	}
};

export const deleteWorkoutExercise = async (workoutId, exerciseId) => {
	try {
		const uid = auth.currentUser.uid;
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

export const toggleStarredExercise = async (exercise, navigation) => {
	try {
		if (!checkLoggedInAndAlert(navigation)) {
			return;
		}

		const userRef = doc(db, "users", auth.currentUser.uid);
		const exerciseRef = doc(userRef, "favoriteExercises", exercise.id);
		const exerciseDoc = await getDoc(exerciseRef);

		if (exerciseDoc.exists()) {
			// Exercise is already starred, so delete it from favoriteExercises
			await deleteDoc(exerciseRef);
			return false;
		} else {
			// Exercise is not starred, so add it to favoriteExercises
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

export const fetchWorkoutsFromRealTimeDb = async () => {
	try {
		const workoutsRef = ref(realTimeDb, "workouts");
		const snapshot = await get(workoutsRef);

		if (snapshot.exists()) {
			const data = snapshot.val();
			return Object.entries(data).map(([id, workout]) => ({
				id,
				...workout,
				exercises: workout?.exercises || [],
			}));
		} else {
			console.log("No data available");
			return [];
		}
	} catch (error) {
		console.error("Error fetching workouts:", error);
		throw error;
	}
};
