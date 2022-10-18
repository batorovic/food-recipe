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
      setFavoritesCount(snapshot.followers);

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
      <div className="img-banner">
        <img src={snap.bannerPhotoUrl} alt="" />
        {/* <img
          src={
            file
              ? URL.createObjectURL(file)
              : "https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/banner%2FFdo6bnFXkAEGtHV.jpg?alt=media&token=ef47dc00-c245-4fbb-863d-4e116f238db9"
          }
          alt=""
        /> */}
        <div className="imgSelect">
          <label htmlFor="fileBanner">
            <AiFillCamera size={25} /> Update Your Banner Image
          </label>
          <input
            type="file"
            id="fileBanner"
            style={{ display: "none" }}
            onChange={(e) => {
              setImagePath("profile/bannerPhoto.jpg");
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <span id="username">{params.name}</span>
      </div>

      <BottomLeftSide>
        <div className="about">
          <span>{snap.about}</span>
          <TiEdit className="editIcon" size={25} onClick={navigateToSettings} />
        </div>
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Tariflerim
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Tarif Defterim
          </button>
        </div>
        <div className="content-tabs">
          <div
            className={toggleState === 1 ? "content active-content" : "content"}
          >
            <h2>Tariflerim</h2>
            <hr />
            <p>Tariflerim content</p>
          </div>

          <div
            className={toggleState === 2 ? "content active-content" : "content"}
          >
            <h2>Tarif Defterim</h2>
            <hr />
            <p>Tarif Defterim content</p>
          </div>
        </div>
      </BottomLeftSide>
      <BottomRightSide>
        <ProfilePicture>
          <img src={snap.photoUrl} alt="" />
          <div className="profilePicture">
            <label htmlFor="fileProfilePicture">
              <AiFillCamera size={35} /> Update Your Profile Picture
            </label>
            <input
              type="file"
              id="fileProfilePicture"
              style={{ display: "none" }}
              onChange={(e) => {
                setImagePath("profile/profilePicture.jpg");
                setFile(e.target.files[0]);
              }}
            />
          </div>
        </ProfilePicture>
        <ProfileStats>
          <div className="followerCount">
            <span className="spanCount">{favoritesCount}</span>
            <span>Followers</span>
          </div>
          <div className="recipeCount">
            <span className="spanCount">0</span>
            <span>Recipes</span>
          </div>
          <div className="favoritesCount">
            <span className="spanCount">0</span>
            <span>Favorites</span>
          </div>
        </ProfileStats>
      </BottomRightSide>
    </Wrapper>
  );
};

const BottomRightSide = styled.div`
  position: relative;
  width: 350px;
  height: 800px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 12rem;
  margin-left: 40em;
`;

const ProfilePicture = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;

  .profilePicture {
    display: none;
    transform: translate(7%, 120%);

    label {
      color: white;
    }
  }
  img {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: 5px solid white;
    border-radius: 100%;
    height: 100%;
    width: 100%;
    object-fit: contain;
    position: absolute;
  }
  &:hover .profilePicture {
    display: block;
  }
`;

const ProfileStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin-top: 15rem;
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

const BottomLeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
  margin-top: 20rem;
  margin-right: 8rem;
  position: absolute;
  word-break: break-all;

  .about {
    height: 10px;
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15rem;
    margin-bottom: 2rem;
    margin-left: -2rem;

    &:hover .editIcon {
      display: block;
    }
    .editIcon {
      display: none;
      cursor: pointer;
    }
  }

  .active-content {
    display: block;
  }

  .bloc-tabs {
    gap: 3rem;
    /* display: flex;
    align-items: center;
    justify-content: center; */ //silebilirsin.
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15rem;
  }
  .tabs {
    font-size: 1.2rem;
    color: black;
    font-weight: 600;
    padding: 15px;
    text-align: center;
    /* width: 50%; */
    /* background: rgba(128, 128, 128, 0.075); */
    cursor: pointer;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.274); */
    border: none; //a
    position: relative;
    outline: none;
  }

  .active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    /* background: rgb(88, 147, 241);*/
    background: linear-gradient(to right, #f27121, #e94057);
  }
  .content-tabs {
    flex-grow: 1;
  }
  .content {
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }
  .content h2 {
    padding: 0px 0 5px 0px;
  }
  .content hr {
    width: 100px;
    height: 2px;
    background: #222;
    margin-bottom: 5px;
  }
  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }
  button {
    background: none;
    border: none;
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

  .img-banner {
    background-color: white;
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 1000px;

    img {
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
    /* &:hover img {
      filter: brightness(0.8);
    } */
    &:hover .imgSelect {
      display: block;
    }
  }
  .imgSelect {
    position: absolute;
    top: 30px;
    left: 50px;
    display: none;
  }
  #username {
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: 20px;
    margin-left: 20px;
    color: white;
    font-size: large;
  }
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
