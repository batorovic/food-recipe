import React, { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FileUpload } from "../Inputs/FileUpload";
import { SigninPopup } from "../SigninPopup";

export const ProfileBanner = (props) => {
  const [followButtonText, setFollowButtonText] = useState("Follow");

  const navigate = useNavigate();
  let params = useParams();
  const [signinPopup, setSigninPopup] = useState(false);
  const [follow, setFollowStatus] = useState(false);

  const navigateToSettings = () => {
    navigate(`/settings`);
  };

  // useEffect(() => {
  //   if (follow) {
  //     console.log("follow status");
  //   }
  // }, [signinPopup]);

  return (
    <ProfileBannerWrapper>
      {/* signin popup */}
      <SigninPopup trigger={signinPopup} setTrigger={setSigninPopup} />
      <img src={props.snapshot.bannerPhotoUrl} alt="" />
      {props.user && (
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
        {props.user &&
          (params.name === props.user.uid ||
            params.name === props.snapshot.username) && (
            <TiEdit
              className="userNameEdit"
              size={25}
              onClick={navigateToSettings}
            />
          )}

        {/* Daha sonradan buraya user varsa ve takip etmiyorsa kosulu eklenecek */}
        {!props.user && (
          <button
            className="btnFollow"
            onClick={() => {
              setFollowStatus(true);
              setSigninPopup(true);
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
