import {
  collection,
  doc,
  getDoc,
  getDocs,
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

export const MyFeed = () => {
  const [user, loading, error] = useAuthState(auth);
  const [snap, setSnap] = useState({});
  const [post, setPost] = useState([]);
  const [profilePicture, setProfilePictures] = useState([
    {
      uid: "",
      photoUrl: "",
    },
  ]);

  const [xd, xdSet] = useState([]);

  const getData = async () => {
    console.log("my feed use effect");
    if (user) {
      console.log("user exits");
      const snapshot = (await getDoc(doc(db, "User", `${user?.uid}`))).data();
      setSnap(snapshot);

      const conditions = [];
      // // post of following users.
      for (const index in snapshot.following) {
        const q = query(
          collection(db, "post"),
          where("uid", "==", snapshot.following[index])
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setPost((post) => [
            ...post,
            doc.data(),
            // { date: doc.data().timestamp, data: doc.data() },
          ]);
        });

        // // related user profile picture links
        // const queryUser = query(
        //   collection(db, "User"),
        //   where("uid", "==", snapshot.following[index])
        // );
        // const querySnapshotUser = await getDocs(queryUser);
        // //sorunlu (xd) calisiyor
        // querySnapshotUser.forEach((doc) => {
        //   xdSet([
        //     ...xd,
        //     { uid: doc.data().uid, photoUrl: doc.data().photoUrl },
        //   ]);
        //   setProfilePictures({
        //     ...profilePicture,
        //     [doc.data().uid]: doc.data().photoUrl,
        //   });
        // });
      }
    } else {
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  return (
    <Wrapper>
      {loading ? (
        <span> LOADING</span>
      ) : user ? (
        <>
          {post
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((value, index) => (
              <PostCard key={index}>
                <Link
                  to={`/profile/${value.addedBy}`}
                  // onClick={() => {
                  //   window.location.href = `/profile/${value.addedBy}`;
                  // }}
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
        </>
      ) : (
        <span>NO USER</span>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PostCard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;

  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 50px;
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
    display: flex;
    flex-direction: column;
    padding: 1rem;
    .post-image {
      width: 400px;
      height: 300px;
      img {
        border-radius: 12px;
        height: 100%;
        width: 100%;
        object-fit: fill;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
      }
    }
  }
`;
