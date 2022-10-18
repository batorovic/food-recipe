import React from "react";
import styled from "styled-components";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileStats } from "./ProfileStats";

export const ProfileRightColumn = (props) => {
  return (
    <ProfileRightColumnWrapper>
      <ProfilePicture
        snap={props.snap}
        getData={props.getData}
        user={props.user}
      />
      <ProfileStats snap={props.snap} user={props.user} />
    </ProfileRightColumnWrapper>
  );
};

const ProfileRightColumnWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 800px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 19rem;
  margin-left: 40em;
`;
