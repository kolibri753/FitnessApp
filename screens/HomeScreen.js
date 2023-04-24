import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import CategoryComponent from "../components/CategoryComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";

const HomeScreen = ({ navigation }) => {
	const [categories, setCategories] = useState([]);
	categories.unshift("all");

	useEffect(() => {
		const fetchCategoriesData = async () => {
			const categoriesData = await fetchData(
				"https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
				exerciseOptions
			);
			setCategories(categoriesData);
		};
		fetchCategoriesData();
	}, []);

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
