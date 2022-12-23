import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { UserPostCards } from "../components/UserPostCards";
export const AdminPosts = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [snap, setSnap] = useState({});
  const [post, setPost] = useState([]);

  const getData = async () => {
    if (user) {
      console.log("user exits");
      const snapshot = (await getDoc(doc(db, "User", `${user?.uid}`))).data();
      setSnap(snapshot);

      const conditions = [];
      for (const index in snapshot.following) {
        const q = query(
          collection(db, "post")
          // where("uid", "==", snapshot.following[index])
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setPost((post) => [...post, doc.data()]);
        });
      }
    }
  };
  useEffect(() => {
    console.log("admin posts use effect.");
    // getData();
  }, [user]);
  return (
    <Wrapper>
      <div
        className="posts"
        style={
          props.li === "yes"
            ? {
                padding: "16px 60px",
              }
            : null
        }
      >
        <h1
          style={{ marginBottom: "22px", color: "#695cfe", fontWeight: "500" }}
        >
          Latest Posts
        </h1>
        <UserPostCards admin="yes" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  .post-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
