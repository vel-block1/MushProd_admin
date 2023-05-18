// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6oe9cID6r5VG6dPcYGylqD0eTFXwULNQ",
  authDomain: "betapeak-1b551.firebaseapp.com",
  databaseURL:
    "https://betapeak-1b551-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "betapeak-1b551",
  storageBucket: "betapeak-1b551.appspot.com",
  messagingSenderId: "442665321534",
  appId: "1:442665321534:web:10bc3c8a7112a8c4fc7d6f",
  measurementId: "G-X9CJXFEGY5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics();
export const auth = getAuth();
export const db = getFirestore();
