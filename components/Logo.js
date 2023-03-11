import React from "react";

const Logo = () => {
  const logoTextStyles = [
		styles.logoText,
	];

	return (
		<View style={styles.logoContainer}>
			<Text style={logoTextStyles}>Gym</Text>
			<Logo width={60} height={40} fill="white" />
			<Text style={[logoTextStyles, { color: colors.white }]}>Rat</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	logoText: {
		fontSize: 30,
		fontWeight: "bold",
		color: colors.yellow,
	},
});

export default Logo;
