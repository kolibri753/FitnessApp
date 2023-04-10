import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	StyleSheet,
	ScrollView,
  Alert,
} from "react-native";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseComponent from "../components/ExerciseComponent";
import PaginationComponent from "../components/PaginationComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import showRegisterAlert from "../helpers/showRegisterAlert";
import { auth, db } from "../firebaseConfig";
import { collection, doc, onSnapshot } from "firebase/firestore";
import useExercisesPagination from "../hooks/useExercisesPagination";

const FavoriteExercisesScreen = ({ navigation }) => {
	const {
    exercises,
    setExercises,
    page,
    setPage,
    scrollViewRef,
    scrollToTop,
    handleNextPage,
    handlePrevPage,
    getPaginatedExercises,
  } = useExercisesPagination([]);

	useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      showRegisterAlert(navigation);
      return;
    }

		const unsubscribe = onSnapshot(
      collection(db, "users", currentUser.uid, "favoriteExercises"),
      (snapshot) => {
        const exercises = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setExercises(exercises);
      },
      (error) => {
        console.error("Error fetching favorite exercises:", error);
      }
    );
  
    return () => {
      unsubscribe();
    };
    
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title={`Favorite Exercises`} activeDot={2} navigation={navigation} />
			<ScrollView style={styles.exercisesContainer} ref={scrollViewRef}>
				{getPaginatedExercises().map((exercise) => (
					<ExerciseComponent key={exercise.id} exercise={exercise} navigation={navigation} />
				))}
				{getPaginatedExercises().length === 0 ? (
					<Text style={styles.headerText}>
						You haven't added any exercises at this page yet!
					</Text>
				) : (
					<></>
				)}
				<PaginationComponent
					page={page}
					handlePrevPage={handlePrevPage}
					handleNextPage={handleNextPage}
					scrollToTop={scrollToTop}
					setPage={setPage}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	exercisesContainer: {
		flex: 1,
		padding: 20,
	},
  headerText: {
		fontSize: 14,
		color: colors.white,
		marginBottom: 20,
	}
});

export default FavoriteExercisesScreen;
