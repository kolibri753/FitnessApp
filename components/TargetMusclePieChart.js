import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import { targetColors } from "../styles/colors";

const TargetMusclePieChart = ({ targets }) => {
	const uniqueTargets = Array.from(new Set(targets));
	const targetCounts = uniqueTargets.map(
		(target) => targets.filter((t) => t === target).length
	);

	const sliceColor = uniqueTargets.map(
		(target) => targetColors[target] || "#FFFF00"
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Target Muscles</Text>
			<PieChart
				widthAndHeight={250}
				series={targetCounts}
				sliceColor={sliceColor}
			/>
			<View style={styles.legendContainer}>
				{uniqueTargets.map((target, index) => (
					<View key={index} style={styles.legendItem}>
						<View
							style={[
								styles.legendColor,
								{ backgroundColor: targetColors[target] || "#FFFF00" },
							]}
						/>
						<Text style={styles.legendText}>{target}</Text>
						<Text style={[styles.legendPercentage, { color: targetColors[target] || "#FFFF00" }]}>
							{((targetCounts[index] / targets.length) * 100).toFixed(2)}%
						</Text>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		color: "#fff",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff",
	},
	legendContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginVertical: 10,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
		marginBottom: 5,
	},
	legendColor: {
		width: 20,
		height: 20,
		borderRadius: 10,
		marginRight: 5,
	},
	legendText: {
		fontSize: 16,
		marginRight: 5,
		color: "#fff",
	},
	legendPercentage: {
		fontSize: 18,
	},
});

export default TargetMusclePieChart;
