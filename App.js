import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ExercisesScreen from "./screens/ExercisesScreen";
import WorkoutsScreen from "./screens/WorkoutsScreen";
import WorkoutExercisesScreen from "./screens/WorkoutExercisesScreen";
import WorkoutExerciseScreen from "./screens/WorkoutExerciseScreen";
import BottomNavigationComponent from "./components/BottomNavigationComponent";
import SplashScreen from "./components/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000); // 3 seconds
	}, []);

	if (loading) {
		return <SplashScreen />;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Main"
					component={MainTabNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="WorkoutExercisesScreen"
					component={WorkoutExercisesScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="WorkoutExerciseScreen"
					component={WorkoutExerciseScreen}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const MainTabNavigator = () => {
	return (
		<Tab.Navigator tabBar={(props) => <BottomNavigationComponent {...props} />}>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					headerShown: false,
					title: "Home",
					iconName: "home",
				}}
			/>
			<Tab.Screen
				name="ExercisesScreen"
				component={ExercisesScreen}
				options={({ navigation }) => ({
					headerShown: false,
					title: "Exercises",
					iconName: "barbell",
					tabBarOnPress: ({ navigation, route }) => {
						navigation.navigate("ExercisesScreen", {
							category: "notListed",
						});
					},
				})}
			/>
			<Tab.Screen
				name="WorkoutsScreen"
				component={WorkoutsScreen}
				options={{
					headerShown: false,
					title: "Workouts",
					iconName: "ios-bicycle",
				}}
			/>
		</Tab.Navigator>
	);
};

export default App;
