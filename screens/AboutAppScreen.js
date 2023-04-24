import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import TopNavigationComponent from "../components/common/TopNavigationComponent";
import { colors } from "../styles/colors";

const AboutAppScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<TopNavigationComponent
				title="About"
				activeDot={2}
				navigation={navigation}
			/>
			<ScrollView
				style={styles.content}
				contentContainerStyle={{ paddingBottom: 50 }}
			>
				<View style={styles.sectionContainer}>
					<MaterialCommunityIcons name="account" size={50} color={colors.primary} />
					<Text style={styles.sectionTitle}>About the Developer</Text>
					<Text style={styles.sectionText}>
						{"\t\t"}Hi, I'm Vakhovska V.M., the developer behind this app. {"\n\t\t"}
						As a passionate fitness enthusiast, I wanted to create an app that allows
						people to not only follow different exercises and workouts, but also
						create their own routines. {"\n\t\t"}I hope you enjoy using this app as
						much as I enjoyed creating it!
					</Text>
				</View>
				<View style={styles.sectionContainer}>
					<Entypo name="info" size={50} color={colors.primary} />
					<Text style={styles.sectionTitle}>About the App</Text>
					<Text style={styles.sectionText}>Welcome to Fitness App "GymRat"!</Text>
					<Text style={styles.sectionText}>
						{"\t\t"}This app offers a diverse range of exercises and workouts to help
						you achieve your fitness goals. {"\n\t\t"}I understand that everyone's
						fitness journey is different, which is why I want to empower you to
						customize your workouts and make them as effective and enjoyable as
						possible.
					</Text>
				</View>
				<View style={styles.sectionContainer}>
					<MaterialCommunityIcons name="phone" size={50} color={colors.primary} />
					<Text style={styles.sectionTitle}>Contact Me</Text>
					<Text style={styles.sectionText}>
						{"\t\t"}Have any questions or feedback? I'd love to hear from you!
					</Text>
					<Text style={styles.sectionText}>Email: vahovskavm2003@gmail.com</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey,
	},
	content: {
		marginTop: 20,
		paddingHorizontal: 20,
	},
	sectionContainer: {
		backgroundColor: colors.white,
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	sectionText: {
		fontSize: 16,
		marginBottom: 5,
		textAlign: "justify",
	},
});

export default AboutAppScreen;
