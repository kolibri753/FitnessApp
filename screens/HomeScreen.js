import React, { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import CategoryComponent from "../components/CategoryComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { selectCategory } from "../redux/slices/exercisesSlice";

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories.data);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleCategoryPress = (category) => {
		dispatch(selectCategory(category));
		navigation.navigate("ExercisesScreen", {
			category,
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent title="Choose Category" activeDot={1} />
			<ScrollView style={styles.categoriesContainer}>
				{categories.map((category) => (
					<CategoryComponent
						key={category}
						category={category}
						handleCategoryPress={handleCategoryPress}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
		// paddingVertical: 10,
	},
	categoriesContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});

export default HomeScreen;
