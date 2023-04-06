import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthorizationScreen from "./screens/AuthorizationScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import WorkoutExerciseScreen from "./screens/WorkoutExerciseScreen";
import WorkoutCompleteScreen from "./screens/WorkoutCompleteScreen";
import SplashScreen from "./components/SplashScreen";

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
  );
};

export default App;
