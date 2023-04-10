import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import CategoryComponent from "../components/CategoryComponent";
import TopNavigationComponent from "../components/common/TopNavigationComponent";

import all from "../assets/categories/all.png";
import back from "../assets/categories/back.png";
import cardio from "../assets/categories/cardio.png";
import chest from "../assets/categories/chest.png";
import lowerArms from "../assets/categories/lower-arms.png";
import lowerLegs from "../assets/categories/lower-legs.png";
import neck from "../assets/categories/neck.png";
import shoulders from "../assets/categories/shoulders.png";
import upperArms from "../assets/categories/upper-arms.png";
import upperLegs from "../assets/categories/upper-legs.png";
import waist from "../assets/categories/waist.png";

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
						icons={[
							{ src: all, title: "all" },
							{ src: back, title: "back" },
							{ src: cardio, title: "cardio" },
							{ src: chest, title: "chest" },
							{ src: lowerArms, title: "lower arms" },
							{ src: lowerLegs, title: "lower legs" },
							{ src: neck, title: "neck" },
							{ src: shoulders, title: "shoulders" },
							{ src: upperArms, title: "upper arms" },
							{ src: upperLegs, title: "upper legs" },
							{ src: waist, title: "waist" },
						]}
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
	},
	categoriesContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});

export default HomeScreen;
