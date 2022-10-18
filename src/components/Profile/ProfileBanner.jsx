import React from "react";
import { AiFillCamera } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FileUpload } from "../Inputs/FileUpload";

export const ProfileBanner = (props) => {
  const navigate = useNavigate();
  let params = useParams();

  const navigateToSettings = () => {
    navigate(`/settings`);
  };
  return (
    <ProfileBannerWrapper>
      <img src={props.snapshot.bannerPhotoUrl} alt="" />
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
        <FileUpload
          path={"profile/bannerPhoto.jpg"}
          id="fileBanner"
          getData={props.getData}
          user={props.user}
        />
        {/* <input
          type="file"
          id="fileBanner"
          style={{ display: "none" }}
          onChange={(e) => {
            props.setImagePath("profile/bannerPhoto.jpg");
            props.setFile(e.target.files[0]);
          }}
        /> */}
      </div>
      <div className="userNameSection">
        <span id="username">{params.name}</span>
        {props.user && params.name === props.user.uid && (
          <TiEdit
            className="userNameEdit"
            size={25}
            onClick={navigateToSettings}
          />
        )}

        {!props.user && (
          <button className="btnFollow">{props.followButtonText}</button>
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
    font-size: 1rem;
    color: white;
    width: 150px;
    padding: 10px;
    border-radius: 20px;
    background: linear-gradient(to right, #f27121, #e94057);
    border: none;
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
`;
