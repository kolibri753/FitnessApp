import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export default function useStarredExercise(exerciseId) {
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			return;
		}

		const unsubscribe = onSnapshot(
			doc(db, "users", currentUser.uid, "favoriteExercises", exerciseId),
			(snapshot) => {
				setIsStarred(snapshot.exists());
			},
			(error) => {
				console.error("Error fetching starred exercise:", error);
			}
		);

		return () => {
			unsubscribe();
		};
	}, [exerciseId, auth.currentUser]);

  return [isStarred, setIsStarred];
}