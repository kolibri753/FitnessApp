import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import WorkoutStackNavigator from "./WorkoutStackNavigator";
import BottomNavigation from "../components/common/BottomNavigation";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
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

export default BottomTabNavigator;
