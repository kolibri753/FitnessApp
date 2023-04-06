import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutsScreen from "../screens/WorkoutsScreen";
import WorkoutExercisesScreen from "../screens/WorkoutExercisesScreen";

const Stack = createStackNavigator();

const WorkoutStackNavigator = () => {
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

export default WorkoutStackNavigator;
