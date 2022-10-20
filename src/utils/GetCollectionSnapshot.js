import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const GetCollectionSnapshot = async (collection, user) => {
  const snapshot = (
    await getDoc(doc(db, `${collection}`, `${user?.uid}`))
  ).data();
  return snapshot;
};
