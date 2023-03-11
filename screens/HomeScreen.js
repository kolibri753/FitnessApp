import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import CategoryComponent from "../components/CategoryComponent";

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
	categories.unshift("all")

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
			<View style={styles.header}>
				<Text style={styles.headerText}>Choose Category</Text>
				<View style={styles.steps}>
					<View style={[styles.dot, styles.activeDot]}></View>
					<View style={styles.dot}></View>
				</View>
			</View>
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
			<View style={styles.bottomNav}>
				<TouchableOpacity
					style={styles.bottomNavItem}
					onPress={() => navigation.navigate("ProfileScreen")}
				>
					<Text style={styles.bottomNavText}>Profile</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	header: {
		height: 50,
		backgroundColor: colors.black,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "white",
		borderBottomStyle: "solid",
	},
	headerText: {
		fontSize: 24,
		color: "#fff",
	},
	steps: {
		flexDirection: "row",
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 5,
		backgroundColor: "#fff",
	},
	activeDot: {
		backgroundColor: "#ffd700",
	},
	categoriesContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	bottomNav: {
		height: 60,
		backgroundColor: colors.black,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingRight: 20,
		borderTopWidth: 1,
		borderTopColor: "white",
		borderTopStyle: "solid",
	},
	bottomNavItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		backgroundColor: colors.white,
	},
	bottomNavText: {
		fontSize: 18,
		color: colors.black,
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default HomeScreen;
