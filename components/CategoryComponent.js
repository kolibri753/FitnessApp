import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
} from "react-native";
import { colors } from "../styles/colors";

const CategoryComponent = ({ category, handleCategoryPress, icons }) => {
	const categoryIcon = icons.find((element) => element.title === category);
	const [isHovered, setIsHovered] = useState(false);

	// Return the new view for the "all" category
	if (!category) {
		return (
			<TouchableHighlight
				onPress={() => {
					handleCategoryPress(category);
				}}
				onShowUnderlay={() => setIsHovered(true)}
				onHideUnderlay={() => setIsHovered(false)}
				style={[styles.categoryItem, isHovered && styles.categoryItemHovered]}
				activeOpacity={1}
				underlayColor="transparent"
			>
				<View
					style={[styles.categoryItem, isHovered && styles.categoryItemHovered]}
				>
					<Image
						source={categoryIcon ? categoryIcon.src : ""}
						style={styles.categoryImage}
					/>
					<Text style={styles.categoryText}>All</Text>
				</View>
			</TouchableHighlight>
		);
	}

	return (
		<TouchableHighlight
			onPress={() => {
				handleCategoryPress(category);
			}}
			onShowUnderlay={() => setIsHovered(true)}
			onHideUnderlay={() => setIsHovered(false)}
			style={[styles.categoryItem, isHovered && styles.categoryItemHovered]}
			activeOpacity={1}
			underlayColor="transparent"
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Image
					source={categoryIcon ? categoryIcon.src : ""}
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
	categoryItemHovered: {
		backgroundColor: "#463A00",
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

export default CategoryComponent;
