import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, getCollectionByField } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { ProfileBanner } from "../components/Profile/ProfileBanner";
import { ProfileLeftColumn } from "../components/Profile/ProfileLeftColumn";
import { ProfileRightColumn } from "../components/Profile/ProfileRightColumn";

export const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [snap, setSnap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [followButtonText, setFollowButtonText] = useState("Follow");

  let params = useParams();

  const getData = async () => {
    if (user) {
      console.log("profile get snap use effect");
      const snapshot = (await getDoc(doc(db, "User", `${user?.uid}`))).data();
      if (snapshot.username === params.name) {
        setSnap(snapshot);
        setIsLoading(false);
      } else {
        let snapshot = await getCollectionByField(
          "User",
          "username",
          params.name
        );
        snapshot ? setSnap(snapshot) : console.log("no user");
        setIsLoading(false);
      }
    } else {
      let snapshot = await getCollectionByField(
        "User",
        "username",
        params.name
      );
      snapshot ? setSnap(snapshot) : console.log("no user");
      setIsLoading(false);

      // const userRef = collection(db, "User");
      // const q = query(userRef, where("username", "==", `${params.name}`));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   setSnap(doc.data());
      // });

      // const snapshot = (await getDoc(doc(db, "User", `${params.name}`))).data();
      // if (snapshot) {
      //   // console.log("params var");
      //   setSnap(snapshot);
      // } else {
      //   console.log("no user");
      // }
    }
  };
  useEffect(() => {
    getData();
  }, [params]); //burasi degisti bostu

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <Wrapper>
      {isLoading && <p>Loading</p>}
      {!isLoading && Object.keys(snap).length === 0 ? (
        <div>NO USER</div>
      ) : (
        <>
          <ProfileBanner
            snapshot={snap}
            getData={getData}
            user={user}
            // followButtonText={followButtonText}
          />
          <ProfileLeftColumn snap={snap} />
          <ProfileRightColumn snap={snap} getData={getData} user={user} />
        </>
      )}
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
