class ExerciseModel {
	constructor(exercise) {
		this.id = exercise.id;
		this.name = exercise.name;
		this.gifUrl = exercise.gifUrl;
		this.videoUrl = exercise.videoUrl;
		this.description = "";
		this.time = "";
		this.rest = "";
	}

	updateDetails(description, time, rest) {
		this.description = description;
		this.time = time;
		this.rest = rest;
	}
}

export default ExerciseModel;
