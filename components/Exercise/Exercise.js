import React from "react";
import ExerciseController from "./ExerciseController";
import ExerciseModel from "./ExerciseModel";
import ExerciseView from "./ExerciseView";

const Exercise = ({
	navigation,
	exercise,
	handleSelectExercise,
	showSelectButton,
}) => {
	const model = new ExerciseModel(exercise);
	const controller = new ExerciseController(navigation, handleSelectExercise);
	return (
		<ExerciseView
			model={model}
			controller={controller}
			showSelectButton={showSelectButton}
		/>
	);
};

export default Exercise;
