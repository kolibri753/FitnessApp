import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
} from "react-native";
import { colors } from "../../styles/colors";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const Category = ({ category, handleCategoryPress, isLast }) => {
	const [categoryImage, setCategoryImage] = useState("");
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const storageRef = ref(
			storage,
			`categories/${category.replace(/\s/g, "-")}.png`
		);
		getDownloadURL(storageRef)
			.then((url) => {
				setCategoryImage(url);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [category]);

	return (
		<TouchableHighlight
			onPress={() => {
				handleCategoryPress(category);
			}}
			onShowUnderlay={() => setIsHovered(true)}
			onHideUnderlay={() => setIsHovered(false)}
			style={[styles.categoryItem, 
        isLast && styles.lastCategoryItem, isHovered && styles.categoryItemHovered]}
			activeOpacity={1}
			underlayColor="transparent"
		>
			<View style={styles.categoryBox}>
				<Image
					source={
						categoryImage !== ""
							? { uri: categoryImage }
							: require("../../assets/default-categories-img.png")
					}
					style={styles.categoryImage}
				/>

				<Text style={styles.categoryText}>{category}</Text>
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	categoryItem: {
		backgroundColor: colors.black,
		borderRadius: 10,
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "space-around",
		borderWidth: 5,
		borderColor: colors.yellow,
	},
	lastCategoryItem: {
    marginBottom: 20,
  },
	categoryItemHovered: {
		backgroundColor: "#463A00",
	},
	categoryBox: {
		flexDirection: "row",
		alignItems: "center",
	},
	categoryImage: {
		width: "55%",
		height: undefined,
		aspectRatio: 1,
		resizeMode: "contain",
		marginRight: 20,
	},
	categoryText: {
		fontSize: 24,
		color: colors.white,
		fontWeight: "bold",
		textTransform: "capitalize",
		width: "40%",
		flexWrap: "wrap",
	},
});

export default React.memo(Category);
