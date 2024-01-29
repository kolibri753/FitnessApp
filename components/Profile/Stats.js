import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const Stats = () => {
	const statsData = ["Statistic 1", "Statistic 2", "Statistic 3"];

	return (
		<View style={styles.stats}>
			{statsData.map((stat, index) => (
				<View
					key={index}
					style={[
						styles.statContainer,
						{
							borderBottomStartRadius: index === 0 ? 10 : 0,
							borderBottomEndRadius: index === statsData.length - 1 ? 10 : 0,
						},
					]}
				>
					<Text style={styles.statText}>{stat}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	stats: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statContainer: {
		flex: 1,
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.lightGrey,
		padding: 10,
	},
	statText: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.white,
	},
});

export default Stats;
