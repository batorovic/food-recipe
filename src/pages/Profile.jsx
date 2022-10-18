import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillCamera } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";

import { auth, db, storage } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

import {
  uploadBytes,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ProfileBanner } from "../components/Profile/ProfileBanner";
import { ProfileLeftColumn } from "../components/Profile/ProfileLeftColumn";
import { ProfilePicture } from "../components/Profile/ProfilePicture";
import { ProfileRightColumn } from "../components/Profile/ProfileRightColumn";

export const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [snap, setSnap] = useState({});
  const [followButtonText, setFollowButtonText] = useState("Follow");
  const navigate = useNavigate();

  let params = useParams();

  const getData = async () => {
    if (user) {
      console.log("profile get snap use effect1");
      const snapshot = (await getDoc(doc(db, "User", `${user?.uid}`))).data();
      setSnap(snapshot);
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  return (
    <Wrapper>
      <ProfileBanner
        snapshot={snap}
        getData={getData}
        user={user}
        followButtonText={followButtonText}
      />
      <ProfileLeftColumn snap={snap} />

      <ProfileRightColumn
        snap={snap}
        getData={getData}
        user={user}
      ></ProfileRightColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 10rem;
  flex-direction: column;
  height: 1200px;
  /* width: 1000px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;
