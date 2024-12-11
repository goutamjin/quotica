// firebase.js (auth and firestore for the second project)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for the authentication and second database
const firebaseConfig = {
  apiKey: "AIzaSyCLeTAJZEdCVIWypYoajQKJyfnDyaJUawk",
  authDomain: "quotica-6e647.firebaseapp.com",
  projectId: "quotica-6e647",
  storageBucket: "quotica-6e647.appspot.com", // Fixed typo in the storage bucket
  messagingSenderId: "854357833252",
  appId: "1:854357833252:web:a9d64d2eb63b69bb69cab1",
  measurementId: "G-FJ2071QW0K"
};

// Initialize Firebase app for the auth and secondary database
const app = initializeApp(firebaseConfig,"[DEFAULT]");

// Export Auth and Firestore instances for this app
export const auth = getAuth(app);
export const db = getFirestore(app);
