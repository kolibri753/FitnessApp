import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
// import { exerciseOptions, fetchData } from "../utils/fetchData";
import CategoryComponent from "../components/CategoryComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categoriesSlice";

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories.data);
	// categories.unshift("all");

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleCategoryPress = (category) => {
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
		paddingVertical: 10
	},
	categoriesContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});

export default HomeScreen;
