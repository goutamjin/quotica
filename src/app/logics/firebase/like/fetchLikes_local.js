// fetchLikedData.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Replace with your Firebase setup

// Fetch liked data from the database and store it in localStorage
const fetchLikedData = async (uid) => {
  if (!uid) {
    console.error("User ID is required");
    return;
  }

  try {
    const uidDocRef = doc(db, "users", uid);
    const docSnapshot = await getDoc(uidDocRef);

    if (!docSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    const likedData = docSnapshot.data().liked || [];
    localStorage.setItem("likedData", JSON.stringify(likedData));
    
  } catch (error) {
    console.error("Error fetching liked data:", error);
  }
};

// Add a new liked ID to localStorage
const addLikedIdToLocalStorage = (likedId) => {
  if (!likedId) {
    console.error("Liked ID is required");
    return;
  }

  try {
    const likedData = JSON.parse(localStorage.getItem("likedData")) || [];
    if (!likedData.includes(likedId)) {
      likedData.push(likedId);
      localStorage.setItem("likedData", JSON.stringify(likedData));
      console.log("Liked ID added to localStorage:", likedId);
    } else {
      console.log("Liked ID already exists in localStorage:", likedId);
    }
  } catch (error) {
    console.error("Error adding liked ID to localStorage:", error);
  }
};

// Remove a liked ID from localStorage
const removeLikedIdFromLocalStorage = (likedId) => {
  if (!likedId) {
    console.error("Liked ID is required");
    return;
  }

  try {
    const likedData = JSON.parse(localStorage.getItem("likedData")) || [];
    const index = likedData.indexOf(likedId);

    if (index !== -1) {
      likedData.splice(index, 1);
      localStorage.setItem("likedData", JSON.stringify(likedData));
      console.log("Liked ID removed from localStorage:", likedId);
    } else {
      console.log("Liked ID does not exist in localStorage:", likedId);
    }
  } catch (error) {
    console.error("Error removing liked ID from localStorage:", error);
  }
};
// Check if a liked ID exists in localStorage
const isLikedIdInLocalStorage = (likedId) => {
    if (!likedId) {
      console.error("Liked ID is required");
      return false;
    }
  
    try {
      const likedData = JSON.parse(localStorage.getItem("likedData")) || [];
      const exists = likedData.includes(likedId);
      return exists;
    } catch (error) {
      console.error("Error checking liked ID in localStorage:", error);
      return false;
    }
  };

export { fetchLikedData, addLikedIdToLocalStorage, removeLikedIdFromLocalStorage, isLikedIdInLocalStorage };
