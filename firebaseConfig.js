import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBM79QCxUfs3Z1FqdWRhFCZC6pEOCEf2qo",
  authDomain: "fitness-app--react-native.firebaseapp.com",
  projectId: "fitness-app--react-native",
  storageBucket: "fitness-app--react-native.appspot.com",
  messagingSenderId: "376813066895",
  appId: "1:376813066895:web:e9092cb8d0b16b0fb26efa",
  measurementId: "G-WJPFH0EFQ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db =  getFirestore(app);