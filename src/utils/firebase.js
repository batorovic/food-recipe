import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
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

export const getCollectionSnapshot = async (collection, uid) => {
  // const snapshot = (await getDoc(doc(db, `${collection}`, `${uid}`))).data();
  // return snapshot;
  return (await getDoc(doc(db, `${collection}`, `${uid}`))).data();
};

export const signOutFromApp = () => {
  // sign out from app
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("error");
    });
};

export const setCollection = async (name, data) => {
  let id = "";
  const ref = doc(collection(db, `${name}`));
  await setDoc(ref, data).then(() => {
    console.log("post succesfully added.");
    id = ref.id;
  });
  return id;
};

export const getCollectionByFieldInArray = async (
  collectionName,
  field,
  searchedField,
  isOrder
) => {
  //orderby baska seyleri bozabilir silebilirim.
  let data = [];
  const userRef = collection(db, `${collectionName}`);
  let q;
  if (isOrder === true) {
    q = query(
      userRef,
      where(`${field}`, "==", `${searchedField}`),
      orderBy("timestamp", "desc")
    );
  } else {
    q = query(userRef, where(`${field}`, "==", `${searchedField}`));
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const getAllDocsFromCollection = async (collectionName, setter) => {
  const q = query(collection(db, collectionName));
  await getDocs(q).then((e) => {
    e.forEach((doc) => {
      setter((snap) => [...snap, doc.data()]);
    });
  });
};

export const deleteFromCollection = async (collectionName, docId) => {
  await deleteDoc(doc(db, collectionName, `${docId}`));
};

export const deletePostFromUser = async (addedBy, docId) => {
  if (addedBy === "admin") addedBy = "et2Z97MWgdbazZjNMZXgmVJiOFU2";
  let doc = await getCollectionByField("User", "username", `${addedBy}`);
  await updateField("User", doc.uid, { post: arrayRemove(docId) });
};
