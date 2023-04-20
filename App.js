import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useScreenLock } from "./helpers/useScreenLock";
import AuthorizationScreen from "./screens/AuthorizationScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import WorkoutExerciseScreen from "./screens/WorkoutExerciseScreen";
import WorkoutCompleteScreen from "./screens/WorkoutCompleteScreen";
import SplashScreen from "./components/SplashScreen";
import rootReducer from "./redux/reducers/rootReducer";

const Stack = createStackNavigator();

const store = configureStore({
	reducer: rootReducer,
});

const App = () => {
	const [loading, setLoading] = useState(true);

	useScreenLock();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000); // 3 seconds
	}, []);

	if (loading) {
		return <SplashScreen />;
	}

	return (
		<Provider store={store}>
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
						component={BottomTabNavigator}
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
		</Provider>
	);
};

export default App;
