import { combineReducers } from "@reduxjs/toolkit";
import authorizationReducer from "../slices/authorizationSlice";
import registrationReducer from "../slices/registrationSlice";
import categoriesReducer from "../slices/categoriesSlice";

const rootReducer = combineReducers({
  authorization: authorizationReducer,
  registration: registrationReducer,
  categories: categoriesReducer,
});

export default rootReducer;
