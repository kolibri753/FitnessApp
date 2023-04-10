import { combineReducers } from "@reduxjs/toolkit";
import authorizationReducer from "../slices/authorizationSlice";
import registrationReducer from "../slices/registrationSlice";

const rootReducer = combineReducers({
  authorization: authorizationReducer,
  registration: registrationReducer,

});

export default rootReducer;
