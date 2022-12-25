import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../utils/firebase";
export const UserPostCards = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [snap, setSnap] = useState({});
  const [post, setPost] = useState([]);

  const getData = async () => {
    console.log("admin post cards use effect");
    let counter = 0;
    if (user) {
      console.log("user exits");

      let q;
      if (props.admin !== "yes") {
        const snapshot = (await getDoc(doc(db, "User", `${user?.uid}`))).data();
        setSnap(snapshot);
        for (const index in snapshot.following) {
          q = query(
            collection(db, "post"),
            where("uid", "==", snapshot.following[index])
          );
        }
      } else {
        q = query(
          collection(db, "post"),
          orderBy("timestamp", "desc"),
          limit(1)
        );
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().title.length !== 0) {
          setPost((post) => [...post, doc.data()]);
        }
        counter++;
      });
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  return (
    <div className="post-content">
      {post
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((value, index) => (
          <PostCard key={index}>
            <Link
              // to={`/profile/${value.addedBy}`}
              onClick={() => {
                window.location.href = `/profile/${value.addedBy}`;
              }}
              className="post-owner"
            >
              <div className="avatar">
                <img
                  // src="https://pbs.twimg.com/profile_images/1362868534351650820/LDX86F3V_400x400.jpg"
                  src={value.userPhoto}
                  alt="avatar"
                />
              </div>
              <div className="about-post">
                {/* <span>username</span> */}

                <span>{value.addedBy}</span>
                <span style={{ color: "grey" }}>{`${
                  value.timestamp.toDate().toDateString() +
                  " " +
                  value.timestamp.toDate().toLocaleTimeString("tr-TR")
                }`}</span>
              </div>
            </Link>

            <div className="post-info">
              <div className="post-link">
                <span>Shared a new recipe </span>
                <Link
                  to={`/recipe/${value.documentId}`}
                  style={{ color: "orange" }}
                >
                  {value.title}
                </Link>
              </div>

              <div className="post-image">
                <Link to={`/recipe/${value.documentId}`}>
                  <img src={value.coverImagePath} alt="post_image" />
                </Link>
              </div>
            </div>
          </PostCard>
        ))}
    </div>
  );
};

const Wrapper = styled.div``;

const PostCard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 50px;
  width: 390px;
  height: 320px;
  .post-owner {
    display: flex;
    gap: 1rem;
    .avatar > img {
      background-color: white;
      width: 55px;
      height: 55px;
      border-radius: 100%;
    }
    .about-post {
      display: flex;
      flex-direction: column;
    }
  }
  .post-info {
    gap: 1.5rem;
    flex-direction: column;
    display: flex;

    padding: 1rem;
    .post-image {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 12px;
        height: 140px;
        width: 230px;
        object-fit: fill;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
      }
    }
  }
`;
