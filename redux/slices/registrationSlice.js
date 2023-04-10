import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const initialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	errors: [],
};

export const registrationSlice = createSlice({
	name: "registration",
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		setConfirmPassword: (state, action) => {
			state.confirmPassword = action.payload;
		},
		setErrors: (state, action) => {
			state.errors = action.payload;
		},
	},
});

export const { setName, setEmail, setPassword, setConfirmPassword, setErrors } =
	registrationSlice.actions;

export const handleRegister = (name, email, password) => async (dispatch) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		await updateProfile(user, {
			displayName: name,
		});

		return { success: true };
	} catch (error) {
		const errorCode = error.code;
		let errorMessage = error.message;
		if (errorCode === "auth/email-already-in-use") {
			errorMessage = "This email is already used.";
		} else if (errorCode === "auth/invalid-email") {
			errorMessage = "Wrong email format.";
		}
    dispatch(setErrors([errorMessage]));
		console.log(errorCode, errorMessage);
		return { success: false, error: errorMessage };
	}
};

export default registrationSlice.reducer;
