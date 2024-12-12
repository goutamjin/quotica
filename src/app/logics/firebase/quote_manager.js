// firebase.js (auth and firestore for the second project)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for the authentication and second database
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_SECOND_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_SECOND_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_SECOND_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_SECOND_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SECOND_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_SECOND_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_SECOND_MEASUREMENT_ID
};

  
// Initialize Firebase app with a custom name for the second app
const app2 = initializeApp(firebaseConfig,"duplicate-app");  // Custom name for second app

// Export Auth and Firestore instances for this app
export const quotesDb = getFirestore(app2);
