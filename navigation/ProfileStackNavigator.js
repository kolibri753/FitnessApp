import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import FavoriteExercisesScreen from "../screens/FavoriteExercisesScreen";
import MyWorkoutsScreen from "../screens/MyWorkoutsScreen";
import CreateWorkoutScreen from "../screens/CreateWorkoutScreen";
import UpdateWorkoutScreen from "../screens/UpdateWorkoutScreen";
import MyWorkoutExercisesScreen from "../screens/MyWorkoutExercisesScreen";
import AboutAppScreen from "../screens/AboutAppScreen";
import ActivityCalendarScreen from "../screens/ActivityCalendarScreen";

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
			<Stack.Screen
				name="ActivityCalendarScreen"
				component={ActivityCalendarScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AboutAppScreen"
				component={AboutAppScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStackNavigator;
