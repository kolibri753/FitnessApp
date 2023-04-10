import { useState, useRef } from "react";

const useExercisesPagination = (initialExercises) => {
	const [exercises, setExercises] = useState(initialExercises);
	const [page, setPage] = useState(1);
	const scrollViewRef = useRef(null);

	const scrollToTop = () => {
		scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
	};

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setPage((prevPage) => prevPage - 1);
	};

	const getPaginatedExercises = () => {
		const startIndex = (page - 1) * 5;
		const endIndex = startIndex + 5;
		return exercises ? exercises.slice(startIndex, endIndex) : [];
	};

	return {
		exercises,
		setExercises,
		page,
		setPage,
		scrollViewRef,
		scrollToTop,
		handleNextPage,
		handlePrevPage,
		getPaginatedExercises,
	};
};

export default useExercisesPagination;
