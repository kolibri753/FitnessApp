import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ExercisesScreen from "./screens/ExercisesScreen";
import BottomNavigationComponent from "./components/BottomNavigationComponent";
import SplashScreen from "./components/SplashScreen";

const Tab = createBottomTabNavigator();

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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
