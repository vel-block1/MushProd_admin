import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAC3nafklf2hew8TlRsWResj9KqlV5tNe8",
  authDomain: "mushprod-f8f75.firebaseapp.com",
  projectId: "mushprod-f8f75",
  storageBucket: "mushprod-f8f75.appspot.com",
  messagingSenderId: "200212291584",
  appId: "1:200212291584:web:2f2f884ecad6b74dbdb8e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
