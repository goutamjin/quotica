import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Function to save user preferences to Firestore
export const savePreferences = async (preferences) => {
  const uid = getUserUID();
  if (!uid) {
    console.warn("No UID found in localStorage.");
    return;
  }

  try {
    await saveUserPreferences(uid, preferences);
    console.log("Preferences saved.");
  } catch (error) {
    console.error("Error saving preferences:", error);
  }
};

// Helper function to get the user UID from localStorage
const getUserUID = () => {
  return localStorage.getItem("firebase_uid");
};

// Helper function to save preferences to Firestore
const saveUserPreferences = async (uid, preferences) => {
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, { preferences });
};
