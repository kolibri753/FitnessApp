import { Alert } from "react-native";

const showRegisterAlert = (navigation) => {
  Alert.alert(
    "This function is only for registered users",
    "Do you want to register now?",
    [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          navigation.navigate("ProfileScreen");
        },
      },
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("RegistrationScreen");
        },
      },
    ]
  );
};

export default showRegisterAlert;
