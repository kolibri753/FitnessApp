import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

const ExerciseTimerComponent = ({ timeLeft, setTimeLeft, handleNextPress }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextPress();
    }
  }, [timeLeft]);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;
  const formattedTimeLeft = `${minutesLeft}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formattedTimeLeft}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
	timerContainer: {
		marginBottom: 20,
		borderWidth: 3,
		borderColor: colors.yellow,
		borderRadius: 10,
		padding: 10,
	},
	timerText: {
		fontSize: 48,
		fontWeight: "bold",
		color: colors.white,
	},
});

export default ExerciseTimerComponent;
