import { collection, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseSetup";

export const addOrUpdateEntry = async (collectionName, entry, id = null) => {
  try {
    // Remove fields with undefined values
    const cleanedEntry = Object.fromEntries(
      Object.entries(entry).filter(([_, v]) => v !== undefined)
    );

    if (id) {
      await setDoc(doc(db, collectionName, id), cleanedEntry, { merge: true });
      return id;
    } else {
      const docRef = await addDoc(collection(db, collectionName), cleanedEntry);
      return docRef.id;
    }
  } catch (e) {
    console.error(`Error in ${id ? "updating" : "adding"} entry: `, e);
    return null;
  }
};

export const deleteEntry = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return true;
  } catch (e) {
    console.error("Error deleting entry: ", e.message);
    return false;
  }
};
