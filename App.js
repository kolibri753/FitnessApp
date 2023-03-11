import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import ExercisesScreen from "./screens/ExercisesScreen";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="SplashScreen">
				<Stack.Screen
					name="SplashScreen"
					component={SplashScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ExercisesScreen"
					component={ExercisesScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
