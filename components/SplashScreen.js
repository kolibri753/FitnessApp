import React, { useEffect, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { colors } from "../styles/colors";
import Logo from "../assets/logo.svg";

const SplashScreen = () => {
	const [animation] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 3000,
			useNativeDriver: true,
		}).start();
	}, [animation]);
	

	const logoContainerStyles = [
		styles.logoContainer,
		{
			opacity: animation,
			transform: [
				{
					translateY: animation.interpolate({
						inputRange: [0, 1],
						outputRange: [-50, 0],
					}),
				},
			],
		},
	];
	const logoTextStyles = [
		styles.logoText,
		{
			opacity: animation,
			transform: [
				{
					translateY: animation.interpolate({
						inputRange: [0, 1],
						outputRange: [50, 0],
					}),
				},
			],
		},
	];
	const benefitTextStyles = [
		styles.benefitText,
		{
			opacity: animation,
			transform: [
				{
					translateY: animation.interpolate({
						inputRange: [0, 1],
						outputRange: [50, 0],
					}),
				},
			],
		},
	];

	return (
		<View style={styles.container}>
			<Animated.View style={logoContainerStyles}>
				<Animated.Text style={logoTextStyles}>Gym</Animated.Text>
				<Logo width={60} height={40} fill="white" />
				<Animated.Text style={[logoTextStyles, { color: colors.white }]}>
					Rat
				</Animated.Text>
			</Animated.View>
			<Animated.Text style={benefitTextStyles}>
				Keep track of your workouts and achieve your fitness goals!
			</Animated.Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 30,
	},
	logoText: {
		fontSize: 30,
		fontWeight: "bold",
		color: colors.yellow,
	},
	benefitText: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.yellow,
		textAlign: "center",
		marginHorizontal: 20,
	},
});

export default SplashScreen;
