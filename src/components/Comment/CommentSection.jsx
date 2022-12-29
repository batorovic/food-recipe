import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  auth,
  db,
  getCollectionByField,
  getCollectionSnapshot,
} from "../../utils/firebase";

export const CommentSection = (props) => {
  // const { snap, commentSnap, postSnap } = props;
  const { postSnap, currentUserSnap, user } = props;

  // const [user, loading, error] = useAuthState(auth);

  // const [currentUserSnap, setCurrentUserSnap] = useState({});
  const [post, setPost] = useState({});
  const [commentSnap, setCommentSnapshot] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState({
    comment: "",
  });
  const [commentRef, setCommentRef] = useState({});
  let params = useParams();

  const getData = async () => {
    console.log("comment section use effect");

    // if (user) {
    //   const snapshot = await getCollectionSnapshot("User", `${user?.uid}`);
    //   setCurrentUserSnap(snapshot);
    // }

    try {
      const docRef = collection(db, `post/${postSnap.documentId}/comment`);
      console.log(postSnap.documentId);

      setCommentRef(docRef);
      const commentSnapshot = await getDocs(
        query(docRef, orderBy("time", "desc"))
      );
      commentSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setCommentSnapshot((commentSnap) => [...commentSnap, doc.data()]);
      });
    } catch (error) {}

    // const postSnap = await getCollectionByField("post", "id", `${params.name}`);
    // setPost(postSnap);
    // const commentSnapshot = await getDocs(
    //   collection(db, `post/${post.documentId}/comment`)
    // );
    // // setCommentSnapshot(commentSnapshot);
    // // commentSnapshot.forEach((e) => console.log(e.data()));

    // commentSnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   // console.log(doc.id, " => ", doc.data());
    //   setCommentSnapshot((commentSnap) => [...commentSnap, doc.data()]);
    // });
    // console.log("1");
  };

  useEffect(() => {
    getData();
    // }, [user]);
  }, []);

  const textAreaOnChange = (e) => {
    setTextAreaValue({ ...textAreaValue, comment: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    const userDbRef = doc(db, "post", `${postSnap.documentId}`);
    await updateDoc(userDbRef, {
      commentCount: increment(1),
    });
    //apiden gelen ieyleri vtye eklenen idyi tabloya yaz!
    const docRef = await addDoc(commentRef, {
      // uid: `${user?.uid}`,
      uid: `${currentUserSnap?.uid}`,

      comment: textAreaValue.comment,
      time: serverTimestamp(),
      username: currentUserSnap.username,
      photoUrl: `${currentUserSnap.photoUrl}`,
    }).then(async (e) => {
      // new comment show it.
      // const ref = collection(db, `post/${postSnap.documentId}/comment`);
      const commentSnapshot = await getDocs(
        query(commentRef, orderBy("time", "desc"))
      );
      setCommentSnapshot([]);
      commentSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setCommentSnapshot((commentSnap) => [...commentSnap, doc.data()]);
      });
    });

    // const ref = doc(db, "post", `1729idLEIoMoBICRonDO/comment`);
    // setDoc(
    //   ref,
    //   {
    //     uid: `${user?.uid}`,
    //     comment: textAreaValue.comment,
    //     time: serverTimestamp(),
    //   },
    //   { merge: true }
    // );
  };

  return (
    <Wrapper>
      {/* {!user ? ( */}
      {/* {!currentUserSnap ? ( */}
      {!user ? (
        <div style={{ marginBottom: "22px" }}>
          Please sign in for make a comment.
        </div>
      ) : (
        <form className="comment-add" onSubmit={formSubmit}>
          <div className="top">
            <h4>Comments</h4>
            <span>{commentSnap.length}</span>
          </div>
          <div className="bottom">
            <div className="comment-input">
              <div className="profile-picture">
                <img src={currentUserSnap.photoUrl} alt="avatar" />
              </div>
              <textarea
                placeholder="Please write your comment."
                name="inputComment"
                id="inputComment"
                rows="5"
                onChange={textAreaOnChange}
              ></textarea>
              {textAreaValue.comment && <button>SEND</button>}
            </div>
          </div>
        </form>
      )}
      {commentSnap.length > 0 &&
        commentSnap.map((value, index) => {
          let date =
            value.time.toDate().toDateString() +
            " " +
            value.time.toDate().toLocaleTimeString("tr-TR");
          return (
            <div className="commentContainer" key={index}>
              <div className="comment">
                <div className="commentTop">
                  <div className="comment-profile-picture">
                    <img src={value.photoUrl} alt="avatar" />
                  </div>
                  <div className="info">
                    <span>{value.username}</span>
                    <span style={{ color: "grey" }}>{date}</span>
                  </div>
                </div>
                <div className="commentBottom">
                  <span>{value.comment}</span>
                </div>
              </div>
            </div>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5rem;
  .comment-add {
    width: 900px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .bottom {
    position: relative;
    button {
      color: white;
      padding: 1rem;
      position: absolute;
      right: 100px;
      background: linear-gradient(to right, #f27121, #e94057);
      border: none;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        filter: brightness(90%);
      }
    }
  }
  .comment-input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 900px;
    gap: 1.2rem;
    padding: 20px;
    background-color: #ededed;
    textarea {
      width: 100%;
      padding: 15px 150px 15px 15px;
      border-radius: 15px;
      resize: none;
    }
  }
  .profile-picture {
    height: 120px;
    img {
      width: 50px;
      height: 50px;
      background-size: contain;
      border-radius: 100%;
    }
  }
  .comment-profile-picture {
    height: 90px;
    img {
      width: 50px;
      height: 50px;
      background-size: contain;
      border-radius: 100%;
    }
  }
  .comment {
  }
  .commentContainer {
    padding: 20px;
    width: 900px;
    &:hover {
      background-color: #f0f0f0ea;
    }
    border-bottom: 1px solid grey;
  }
  .commentTop {
    display: flex;
    gap: 1rem;
  }
  .commentBottom {
    margin-left: 15px;
    margin-top: -10px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
`;
