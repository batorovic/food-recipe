import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "recipe-app-c5434.firebaseapp.com",
  projectId: "recipe-app-c5434",
  storageBucket: "recipe-app-c5434.appspot.com",
  messagingSenderId: "216766024843",
  appId: "1:216766024843:web:54a06446fe1a23e8d8588e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
