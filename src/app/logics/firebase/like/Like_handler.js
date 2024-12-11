import { doc, getDoc, setDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { quotesDb } from "../quote_manager"; // Firestore instance for quotes
import { generateShortHash } from "../../quote_id_gene"; // For generating quote hash
import { auth, db } from "../firebase";

export async function handleLike(quote, userId, callback) {
  try {
    // Generate a unique hash for the quote
    const quoteHash = generateShortHash(quote);

    // Reference to the "quotes" collection in Firestore
    const quoteRef = doc(quotesDb, "quotes", quoteHash);

    // Get the quote document to check if it exists
    const quoteSnap = await getDoc(quoteRef);

    let quoteId;

    if (quoteSnap.exists()) {
      // If quote exists, fetch its unique ID and like count
      quoteId = quoteSnap.data().id;
    } else {
      // If quote doesn't exist, create a new quote and generate a new unique ID
      const metaRef = doc(quotesDb, "meta", "lastUsedId");
      const metaSnap = await getDoc(metaRef);
      let lastUsedId = metaSnap.exists() ? metaSnap.data().value : 0;

      // Calculate the new quote ID
      quoteId = lastUsedId + 1;

      // Create a new quote document with the initial like count
      await setDoc(quoteRef, { l: 0, id: quoteId });

      // Update the meta document with the new lastUsedId
      await setDoc(metaRef, { value: quoteId });
    }

    // Reference the user's document
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    let userLikes = userSnap.exists() ? userSnap.data().liked : [];

    if (userLikes.includes(quoteId)) {
      // If the user has already liked the quote, remove the like
      await updateDoc(userRef, { liked: arrayRemove(quoteId) });
      await updateDoc(quoteRef, { l: increment(-1) });
      callback(false); // Signal unliked state
    } else {
      // If the user hasn't liked the quote, add the like
      await updateDoc(userRef, { liked: arrayUnion(quoteId) });
      await updateDoc(quoteRef, { l: increment(1) });
      callback(true); // Signal liked state
    }
  } catch (error) {
    console.error("Error in handleLike:", error);
    callback(null); // Signal error
  }
}

export const getLikeData = async (quoteHash) => {
  try {
    // Reference the document in the 'quotes' collection with the specified quoteHash
    const quoteRef = doc(quotesDb, "quotes", quoteHash);
    
    
    // Fetch the document snapshot
    const docSnapshot = await getDoc(quoteRef);
    
    
    // Check if the document exists
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return {
        likeCount: data?.l || 0, // Fetch the 'l' field (like count) or return 0 if not available
        likeId: data.id
      };
    } else {
      return { likeCount: 0 ,
        likeId: null
       };
    }
  } catch (error) {
    return { likeCount: 0 ,
      likeId: null
    };
  }
};