// firebase.js (auth and firestore for the second project)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for the authentication and second database
const firebaseConfig = {
  apiKey: "AIzaSyA7OVNHe2TX6W5pp6KWQolo7wzmopA_gWI",
  authDomain: "quotica-quote.firebaseapp.com",
  projectId: "quotica-quote",
  storageBucket: "quotica-quote.firebasestorage.app",
  messagingSenderId: "879053744614",
  appId: "1:879053744614:web:af25dd7a95ea8c95274e27",
  measurementId: "G-MX0MJTHKVE"
};

// Initialize Firebase app with a custom name for the second app
const app2 = initializeApp(firebaseConfig,"duplicate-app");  // Custom name for second app

// Export Auth and Firestore instances for this app
export const quotesDb = getFirestore(app2);
