import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, exerciseOptions } from "../../utils/fetchData";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    console.log("Fetching categories data...");
    const categoriesData = await fetchData(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      exerciseOptions
    );
    console.log("Categories data:", categoriesData);
    return categoriesData;
  }
);

const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		data: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.data = ["all", ...action.payload];
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default categoriesSlice.reducer;
