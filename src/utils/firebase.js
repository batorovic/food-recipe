import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "recipe-app-c5434.firebaseapp.com",
  projectId: "recipe-app-c5434",
  storageBucket: "recipe-app-c5434.appspot.com",
  messagingSenderId: "216766024843",
  appId: "1:216766024843:web:54a06446fe1a23e8d8588e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const updateField = async (collection, uid, updatedField) => {
  let status = false;
  const document = doc(db, `${collection}`, `${uid}`);
  await updateDoc(document, updatedField).then(() => {
    status = true;
  });
  return status;
};

export const getCollectionByField = async (
  collectionName,
  field,
  searchedField
) => {
  let data;
  const userRef = collection(db, `${collectionName}`);
  const q = query(userRef, where(`${field}`, "==", `${searchedField}`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = doc.data();
  });
  return data;
};
