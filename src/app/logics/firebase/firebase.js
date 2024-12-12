// firebase.js (auth and firestore for the second project)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase configuration for the authentication and second database

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};


console.log(firebaseConfig);


// Initialize Firebase app for the auth and secondary database
const app = initializeApp(firebaseConfig,"[DEFAULT]");


// Export Auth and Firestore instances for this app
export const auth = getAuth(app);
export const db = getFirestore(app);
