import {
  arrayRemove,
  arrayUnion,
  doc,
  FieldValue,
  increment,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillCamera } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  auth,
  getCollectionByField,
  getCollectionSnapshot,
  updateField,
} from "../../utils/firebase";
import { FileUpload } from "../Inputs/FileUpload";
import { SigninPopup } from "../SigninPopup";

export const ProfileBanner = (props) => {
  const [followButtonText, setFollowButtonText] = useState("Follow");

  const navigate = useNavigate();
  let params = useParams();
  const [signinPopup, setSigninPopup] = useState(false);
  const [follow, setFollowStatus] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [currentUserSnap, setCurrentUserSnap] = useState({});

  const navigateToSettings = () => {
    navigate(`/settings`);
  };

  const btnFollowHandleSubmit = async () => {
    // //hatalı setstar olmadı tekrar bak
    // let followedUser = await getCollectionByField("User", "username", "cactus");
    // alert("user is  exists and pressed follow button");
    // if (followButtonText === "Follow") {
    //   props.setStat(false);
    //   console.log("yo");
    //   await updateField("User", followedUser.uid, {
    //     followers: increment(-1),
    //   });
    // } else if (followButtonText === "Unfollow") {
    //   if (
    //     await updateField("User", followedUser.uid, {
    //       followers: increment(1),
    //     })
    //   ) {
    //     props.setStat(true);
    //   }
    // }
    console.log(props.snapshot.uid);

    if (followButtonText === "Follow") {
      await updateField("User", currentUserSnap.uid, {
        following: arrayUnion(props.snapshot.uid),
      });

      await updateField("User", props.snapshot.uid, {
        followers: increment(1),
      });
      setFollowButtonText("Unfollow");
    } else if (followButtonText === "Unfollow") {
      await updateField("User", props.snapshot.uid, {
        followers: increment(-1),
      });
      if (
        await updateField("User", user.uid, {
          following: arrayRemove(props.snapshot.uid),
        })
      ) {
        setFollowButtonText("Follow");
      }
    }

    props.setStat(!props.stat);
  };

  useEffect(() => {
    console.log("follow status");
    async function setFollowText() {
      getCollectionSnapshot("User", `${user.uid}`).then((res) => {
        setCurrentUserSnap(res);
        res.following.forEach((element) => {
          if (element === props.snapshot.uid) {
            setFollowButtonText("Unfollow");
          }
        });
      });
    }
    setFollowText();
  }, [props.snapshot, setFollowButtonText]);

  return (
    <ProfileBannerWrapper>
      {/* signin popup */}
      <SigninPopup trigger={signinPopup} setTrigger={setSigninPopup} />
      <img src={props.snapshot.bannerPhotoUrl} alt="" />
      {user?.uid === props.snapshot.uid && (
        <div className="imgSelect">
          <label htmlFor="fileBanner">
            <AiFillCamera size={25} /> Update Your Banner Image
          </label>
          <FileUpload
            path={"profile/bannerPhoto.jpg"}
            id="fileBanner"
            getData={props.getData}
            user={props.user}
          />
        </div>
      )}
      <div className="userNameSection">
        <span id="username">{params.name}</span>
        {user?.uid === props.snapshot.uid && (
          <TiEdit
            className="userNameEdit"
            size={25}
            onClick={navigateToSettings}
          />
        )}

        {/* Daha sonradan buraya user varsa ve takip etmiyorsa kosulu eklenecek */}
        {console.log(user?.uid.length > 0 && user?.uid !== props.snapshot.uid)}

        {(!user || user?.uid !== props.snapshot.uid) && (
          <button
            className="btnFollow"
            onClick={() => {
              // setFollowStatus(!follow);
              // user?.uid !== props.snapshot.uid
              user?.uid.length > 0 && user?.uid !== props.snapshot.uid
                ? btnFollowHandleSubmit()
                : setSigninPopup(true);
            }}
          >
            {followButtonText}
          </button>
        )}
      </div>
    </ProfileBannerWrapper>
  );
};

const ProfileBannerWrapper = styled.div`
  background-color: white;
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 1000px;

  .userNameEdit {
    display: none;
    cursor: pointer;
  }

  &:hover {
    .imgSelect {
      display: block;
    }
    .userNameEdit {
      display: block;
    }
  }
  &:hover .btnFollow {
    display: block;
  }

  .btnFollow {
    font-size: 1rem;
    color: white;
    width: 150px;
    padding: 10px;
    border-radius: 20px;
    background: linear-gradient(to right, #f27121, #e94057);
    border: none;
    display: none;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
  }

  .imgSelect {
    position: absolute;
    top: 30px;
    left: 50px;
    display: none;
  }

  .userNameSection {
    width: 550px;
    height: 45px;
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: 20px;
    margin-left: 20px;
    color: white;
    font-size: large;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: fill;
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
