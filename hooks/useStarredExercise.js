import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { fetchFavoriteExercises } from "../utils/firebaseUtils";

export default function useStarredExercise(exerciseId) {
	const [isStarred, setIsStarred] = useState(false);

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			return;
		}

		const unsubscribe = fetchFavoriteExercises(currentUser.uid, (exercises) => {
			const starredExercise = exercises.find(
				(exercise) => exercise.id === exerciseId
			);
			setIsStarred(!!starredExercise);
		});

		return () => {
			unsubscribe();
		};
	}, [exerciseId, auth.currentUser]);

	return [isStarred, setIsStarred];
}
