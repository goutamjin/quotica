// firebase.js (auth and firestore for the second project)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();
// Firebase configuration for the authentication and second database

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


console.log(process.env);

// Initialize Firebase app for the auth and secondary database
const app = initializeApp(firebaseConfig,"[DEFAULT]");


// Export Auth and Firestore instances for this app
export const auth = getAuth(app);
export const db = getFirestore(app);
