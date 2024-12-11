import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchPreferences = async () => {
  const uid = getUserUID();
  if (!uid) {
    console.warn("No UID found in localStorage.");
    return null;
  }

  try {
    const userPreferences = await getUserPreferences(uid);
    return userPreferences;
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return null;
  }
};

const getUserUID = () => {
  return localStorage.getItem("firebase_uid");
};

const getUserPreferences = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data().preferences;
  } else {
    console.warn("User document not found:", uid);
    return null;
  }
};
