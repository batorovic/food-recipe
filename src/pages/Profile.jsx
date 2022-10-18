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
  const [file, setFile] = useState("");
  const [snap, setSnap] = useState({});
  const [toggleState, setToggleState] = useState(1); //1 Tariflerim 2 Tarif Defterim
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followButtonText, setFollowButtonText] = useState("Follow");
  const navigate = useNavigate();

  const toggleTab = (index) => {
    setToggleState(index);
  };
  let params = useParams();

  const getData = async () => {
    if (user) {
      console.log("profile get snap use effect");
      const snapshot = (await getDoc(doc(db, "User", `${user?.uid}`))).data();

      setFavoritesCount(snapshot.favorites.length);
      setRecipeCount(snapshot.posts.length);
      setFollowerCount(snapshot.followers);

      setSnap(snapshot);
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    const uploadFile = () => {
      console.log("merhaba ben upload file  usereffect");

      //  farklı isim kullanmıyorum çünkü birden fazla banner photo yükleyince farklı dosyalar oluyor ve yer kaplıyor.
      //  bu şekilde tek bir dosya üzerinden override ediyorum.
      // const name = new Date().getTime() + file.name;
      // const storageRef = ref(
      //   storage,
      //   `User/${user.uid}/banner/bannerPhoto.jpg`
      // );
      const storageRef = ref(storage, `User/${user.uid}/${imagePath}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(imagePath);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const userDbRef = doc(db, "User", `${user.uid}`);
            if (imagePath === "profile/bannerPhoto.jpg") {
              updateDoc(userDbRef, {
                bannerPhotoUrl: downloadURL,
              });
            } else if (imagePath === "profile/profilePicture.jpg") {
              updateDoc(userDbRef, {
                photoUrl: downloadURL,
              });
            }
            console.log("basarili upload get snaphot");
            getData();
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const navigateToSettings = () => {
    navigate(`/settings`);
  };

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

const ProfileStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin-top: 9rem;
  width: 330px;
  height: 100px;
  gap: 2rem;
  .followerCount,
  .recipeCount,
  .favoritesCount {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .spanCount {
    font-size: 1.5rem;
    font-weight: 600;
    border-width: 3px;
    border-style: solid;
    border-image: linear-gradient(to right, #f27121, #e94057) 0 0 100% 0;
  }
`;

const Wrapper = styled.div`
  /* background-color: #776464; */
  margin-bottom: 10rem;
  /* background-color: orange; */
  flex-direction: column;
  height: 1200px;
  /* width: 1000px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
