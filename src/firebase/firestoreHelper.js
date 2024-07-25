import { collection, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseSetup";

export const addOrUpdateEntry = async (collectionName, entry, id = null) => {
  try {
    if (id) {
      await setDoc(doc(db, collectionName, id), entry, { merge: true });
      return id;
    } else {
      const docRef = await addDoc(collection(db, collectionName), entry);
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
  } catch (e) {
    console.error("Error deleting entry: ", e);
  }
};
