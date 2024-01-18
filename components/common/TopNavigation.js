import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

const TopNavigation = ({ title, activeDot, navigation }) => {
	return (
		<View style={styles.header}>
			{navigation && (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
			)}
			<Text style={styles.headerText}>{title}</Text>
			<View style={styles.steps}>
				<View style={[styles.dot, activeDot === 1 && styles.activeDot]}></View>
				<View style={[styles.dot, activeDot === 2 && styles.activeDot]}></View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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
		zIndex: 10,
	},
	headerText: {
		fontSize: 24,
		color: colors.white,
	},
	steps: {
		flexDirection: "row",
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 5,
		backgroundColor: colors.white,
	},
	activeDot: {
		backgroundColor: colors.yellow,
	},
});

export default TopNavigation;
