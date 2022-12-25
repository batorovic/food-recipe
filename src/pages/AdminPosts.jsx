import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { UserPostCards } from "../components/UserPostCards";
export const AdminPosts = (props) => {
  useEffect(() => {
    console.log("admin posts use effect.");
  }, []);
  return (
    <Wrapper>
      <div className="posts">
        <h1
          style={{ marginBottom: "22px", color: "#695cfe", fontWeight: "500" }}
        >
          Latest Post
        </h1>
        <UserPostCards admin="yes" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  .post-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
