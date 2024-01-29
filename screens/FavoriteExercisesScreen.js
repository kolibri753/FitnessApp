import React, { useEffect } from "react";
import { Text, StyleSheet, ScrollView, Alert } from "react-native";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Exercise from "../components/Exercise";
import Pagination from "../components/common/Pagination";
import TopNavigation from "../components/common/TopNavigation";
import useExercisesPagination from "../hooks/useExercisesPagination";
import { fetchFavoriteExercises } from "../utils/firebase/favoriteExercisesUtils";
import { auth } from "../firebaseConfig";
import { checkLoggedInAndAlert } from "../utils/firebase/generalUtils";

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
		if (!checkLoggedInAndAlert(navigation)) {
			return;
		}

		const unsubscribe = fetchFavoriteExercises(currentUser.uid, setExercises);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigation
				title={`Favorite Exercises`}
				activeDot={2}
				navigation={navigation}
			/>
			<ScrollView style={styles.exercisesContainer} ref={scrollViewRef}>
				{getPaginatedExercises().map((exercise) => (
					<Exercise key={exercise.id} exercise={exercise} navigation={navigation} />
				))}
				{getPaginatedExercises().length === 0 ? (
					<Text style={styles.headerText}>
						You haven't added any exercises at this page yet!
					</Text>
				) : (
					<></>
				)}
				<Pagination
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
	},
});

export default FavoriteExercisesScreen;
