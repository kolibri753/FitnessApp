import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
} from "react-native";
import { colors } from "../../styles/colors";

const CategoryView = ({ handleCategoryPress, model }) => {
	const categoryIcon = model.getIcon();

	return (
		<TouchableHighlight
			onPress={() => {
				handleCategoryPress(model.getCategory());
			}}
			onShowUnderlay={() => model.setIsHovered(true)}
			onHideUnderlay={() => model.setIsHovered(false)}
			style={[
				styles.categoryItem,
				model.getIsHovered() && styles.categoryItemHovered,
			]}
			activeOpacity={1}
			underlayColor="transparent"
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Image
					source={categoryIcon ? categoryIcon.src : ""}
					style={styles.categoryImage}
				/>
				<Text style={styles.categoryText}>{model.getCategory()}</Text>
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

export default CategoryView;
