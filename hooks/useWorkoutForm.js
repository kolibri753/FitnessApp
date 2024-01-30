import { useState } from "react";

const useWorkoutForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);
	const [image, setImage] = useState("");

	return {
		name,
		setName,
		description,
		setDescription,
		errors,
		setErrors,
		image,
		setImage,
	};
};

export default useWorkoutForm;
