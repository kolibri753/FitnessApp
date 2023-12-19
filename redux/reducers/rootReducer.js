import { combineReducers } from "@reduxjs/toolkit";
import authorizationReducer from "../slices/authorizationSlice";
import registrationReducer from "../slices/registrationSlice";
import categoriesReducer from "../slices/categoriesSlice";
import exercisesReducer from "../slices/exercisesSlice";

const rootReducer = combineReducers({
  authorization: authorizationReducer,
  registration: registrationReducer,
  categories: categoriesReducer,
  exercises: exercisesReducer,
});

export default rootReducer;
