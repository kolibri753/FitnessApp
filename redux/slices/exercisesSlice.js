import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, exerciseOptions } from "../../helpers/fetchData";

export const fetchExercisesData = createAsyncThunk(
	"exercises/fetchExercisesData",
	async (selectedCategory) => {
		try {
			let url;
			if (selectedCategory === "all") {
				url = "https://exercisedb.p.rapidapi.com/exercises";
			} else {
				url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedCategory}`;
			}

			const data = await fetchData(url, exerciseOptions, 10);
			console.log("Fetched exercises: " + data.length);
			return data;
		} catch (error) {
			console.log("Failed to fetch exercises data");
			throw error;
		}
	}
);

const initialState = {
	exercises: [],
	status: "idle",
	error: null,
	selectedCategory: "all",
};

const exercisesSlice = createSlice({
	name: "exercises",
	initialState,
	reducers: {
		selectCategory: (state, action) => {
			state.selectedCategory = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExercisesData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchExercisesData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.exercises = action.payload;
			})
			.addCase(fetchExercisesData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { selectCategory } = exercisesSlice.actions;

export default exercisesSlice.reducer;
