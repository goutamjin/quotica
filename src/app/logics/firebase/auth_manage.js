import { useEffect } from "react";
import { auth,db } from "./firebase"; // Import auth from Firebase
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export const useAuth = (callback) => {
  useEffect(() => {
     // Initialize Firestore
    const uidKey = "firebase_uid";
    const savedUid = localStorage.getItem(uidKey); // Check for saved UID in localStorage

    const checkAndSetUID = async (uid) => {
      const uidDocRef = doc(db, "users", uid); // Reference to the user's document
      const docSnap = await getDoc(uidDocRef);

      if (!docSnap.exists()) {
        // If document does not exist, create a new one
        await setDoc(uidDocRef, {
           createdAt: new Date(),
           liked: [],
        });

        console.log("New UID saved to Firestore:", uid);
      } else {
        console.log("UID already exists in Firestore:", uid);
      }
      callback(true,uid);
    };

    // If no UID is found in localStorage, sign in anonymously
    if (!savedUid) {
      signInAnonymously(auth)
        .then(async (userCredential) => {
          const { uid } = userCredential.user; // Get the new UID from signed-in user
          localStorage.setItem(uidKey, uid); // Save UID to localStorage for future use
          console.log("Signed in anonymously with new UID:", uid);
          await checkAndSetUID(uid); // Check and set UID in Firestore
        })
        .catch((error) => {
          console.error("Anonymous login failed:", error);// Handle error if sign-in fails
          callback(false,null); 
        });
    } else {
      checkAndSetUID(savedUid); // Check and set existing UID in Firestore
    }

    // Listen for auth state changes (to handle future login/logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in anonymously:", user.uid);
      } else {
        console.log("No user logged in.");
      }
    });

    // Cleanup the auth state listener when the component is unmounted
    return () => unsubscribe();
  }, []); // Empty array means this effect will run only once (when the component mounts)
};
