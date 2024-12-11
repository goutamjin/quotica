// Import necessary functions from Firebase
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebase"; // Firestore instance for user data

// Function to update user likes
export async function updateUserLikes(userId, quoteId) {
  try {
    // Reference to the user's document in the user database
    const userRef = doc(db, "users", userId);

    // Get the user's document
    const userSnap = await getDoc(userRef);

    // If the user doesn't exist, create the document with the liked array
    if (!userSnap.exists()) {
      await setDoc(userRef, { liked: [quoteId] });
    } else {
      // Get the current liked array
      const likedArray = userSnap.data().liked || [];

      // Check if the quoteId is already in the liked array
      if (!likedArray.includes(quoteId)) {
        // If not, update the liked array using arrayUnion
        await updateDoc(userRef, { liked: arrayUnion(quoteId) });
      } else {
        console.log("Quote already liked by the user.");
      }
    }

    console.log("User likes updated successfully.");
  } catch (error) {
    console.error("Error updating user likes:", error);
  }
}
