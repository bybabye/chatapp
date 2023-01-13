// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP_s7rNFEhfjTbt7CMWWRU2DouIr4PtK4",
  authDomain: "instagram-d6899.firebaseapp.com",
  databaseURL: "https://instagram-d6899-default-rtdb.firebaseio.com",
  projectId: "instagram-d6899",
  storageBucket: "instagram-d6899.appspot.com",
  messagingSenderId: "656120435573",
  appId: "1:656120435573:web:a32bfdb9d6af8e5bea793c",
  measurementId: "G-GJVQJRXFS1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();