import { colors, markedDatesColors } from "../styles/colors";

const calculateDots = (workoutsCount) => {
  if (workoutsCount >= 5) {
    return [
      { key: "first", color: markedDatesColors.first },
      { key: "second", color: markedDatesColors.second },
      { key: "third", color: markedDatesColors.third },
    ];
  } else if (workoutsCount >= 3) {
    return [
      { key: "first", color: markedDatesColors.first },
      { key: "second", color: markedDatesColors.second },
    ];
  } else if (workoutsCount < 3) {
    return [{ key: "first", color: markedDatesColors.first }];
  }
  return [];
};

export const generateMarkedDates = (workoutData, selectedDate) => {
  const markedDates = {};

  workoutData.forEach((workout) => {
    const date = new Date(workout.timestamp).toISOString().split("T")[0];
    const workoutsCount = workoutData.filter(
      (w) => w.timestamp.toISOString().split("T")[0] === date
    ).length;

    markedDates[date] = {
      dots: calculateDots(workoutsCount),
      selected: false,
      disableTouchEvent: false,
      selectedDotColor: colors.yellow,
      marked: true,
    };
  });

  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
  };

  return markedDates;
};
