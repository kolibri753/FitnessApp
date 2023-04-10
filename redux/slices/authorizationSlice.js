import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const initialState = {
	email: "",
	password: "",
	errors: [],
	authenticated: false,
};

const authorizationSlice = createSlice({
	name: "authorization",
	initialState,
	reducers: {
		setEmail: (state, action) => {
			state.email = action.payload;
			state.errors = [];
		},
		setPassword: (state, action) => {
			state.password = action.payload;
			state.errors = [];
		},
		setErrors: (state, action) => {
			state.errors = action.payload;
		},
		setAuthenticated: (state, action) => {
			state.authenticated = action.payload;
		},
	},
});

export const { setEmail, setPassword, setErrors, setAuthenticated } =
	authorizationSlice.actions;

export const handleLogin = (email, password) => async (dispatch) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		dispatch(setAuthenticated(true));
	} catch (error) {
		const errorCode = error.code;
		let errorMessage = error.message;
		if (errorCode === "auth/email-already-exists") {
			errorMessage = "This email is already used.";
		} else if (errorCode === "auth/invalid-email") {
			errorMessage = "Wrong email format.";
		} else if (errorCode === "auth/user-not-found") {
			errorMessage = "This email is not registered yet.";
		}
		dispatch(setErrors([errorMessage]));
		console.log(errorCode, errorMessage);
	}
};

export const checkAuthenticated = () => async (dispatch) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is logged in
      console.log("User is logged in");
			dispatch(setAuthenticated(true));
		} else {
			// User is not logged in
			console.log("User is not logged in");
		}
	});
};

export const handleLogout = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(setAuthenticated(false));
  } catch (error) {
    console.log(error);
  }
};


export default authorizationSlice.reducer;
