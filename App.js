import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthorizationScreen from "./screens/AuthorizationScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import ExercisesScreen from "./screens/ExercisesScreen";
import WorkoutsScreen from "./screens/WorkoutsScreen";
import WorkoutExercisesScreen from "./screens/WorkoutExercisesScreen";
import WorkoutExerciseScreen from "./screens/WorkoutExerciseScreen";
import WorkoutCompleteScreen from "./screens/WorkoutCompleteScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FavoriteExercisesScreen from "./screens/FavoriteExercisesScreen";
import MyWorkoutsScreen from "./screens/MyWorkoutsScreen";
import CreateWorkoutScreen from "./screens/CreateWorkoutScreen";
import UpdateWorkoutScreen from "./screens/UpdateWorkoutScreen";
import MyWorkoutExercisesScreen from "./screens/MyWorkoutExercisesScreen";
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
					name="AuthorizationScreen"
					component={AuthorizationScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="RegistrationScreen"
					component={RegistrationScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Main"
					component={MainTabNavigator}
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
				<Stack.Screen
					name="WorkoutCompleteScreen"
					component={WorkoutCompleteScreen}
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
				name="WorkoutStack"
				component={WorkoutStackNavigator}
				options={{
					headerShown: false,
					title: "Workouts",
					iconName: "ios-bicycle",
				}}
			/>
			<Tab.Screen
				name="ProfileStack"
				component={ProfileStackNavigator}
				options={{
					headerShown: false,
					title: "Profile",
					iconName: "at-circle",
				}}
			/>
		</Tab.Navigator>
	);
};

const WorkoutStackNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="WorkoutsScreen"
				component={WorkoutsScreen}
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
		</Stack.Navigator>
	);
};

const ProfileStackNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
					name="FavoriteExercisesScreen"
					component={FavoriteExercisesScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="MyWorkoutsScreen"
					component={MyWorkoutsScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="CreateWorkoutScreen"
					component={CreateWorkoutScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="UpdateWorkoutScreen"
					component={UpdateWorkoutScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="MyWorkoutExercisesScreen"
					component={MyWorkoutExercisesScreen}
					options={{
						headerShown: false,
					}}
				/>
		</Stack.Navigator>
	);
};


export default App;
