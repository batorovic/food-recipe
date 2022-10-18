import React from "react";
import { AiFillCamera } from "react-icons/ai";
import styled from "styled-components";
import { FileUpload } from "../Inputs/FileUpload";

export const ProfilePicture = (props) => {
  return (
    <ProfilePictureWrapper>
      <img src={props.snap.photoUrl} alt="" />
      <div className="profilePicture">
        <label htmlFor="fileProfilePicture">
          <AiFillCamera size={35} /> Update Your Profile Picture
        </label>
        <FileUpload
          path={"profile/profilePicture.jpg"}
          id="fileProfilePicture"
          getData={props.getData}
          user={props.user}
        />
        {/* <input
          type="file"
          id="fileProfilePicture"
          style={{ display: "none" }}
          onChange={(e) => {
            props.setImagePath("profile/profilePicture.jpg");
            props.setFile(e.target.files[0]);
          }}
        /> */}
      </div>
    </ProfilePictureWrapper>
  );
};
const ProfilePictureWrapper = styled.div`
  margin-top: -120px;
  position: relative;
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
    object-fit: fill;
    position: absolute;
  }
  &:hover .profilePicture {
    display: block;
  }
`;
