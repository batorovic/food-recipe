import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, getCollectionByField } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";
import { ProfileBanner } from "../components/Profile/ProfileBanner";
import { ProfileLeftColumn } from "../components/Profile/ProfileLeftColumn";
import { ProfileRightColumn } from "../components/Profile/ProfileRightColumn";
import { exportUsername } from "./Settings";

export const Profile = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [snap, setSnap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [stat, setStat] = useState(false);
  const [favoritesSnap, setFavoritesSnap] = useState([]);

  // const [followButtonText, setFollowButtonText] = useState("Follow");

  let params = useParams();
  const location = useLocation();
  const getData = async () => {
    console.log("naber link to");
    if (user) {
      console.log("profile get snap use effect");
      const snapshot = (await getDoc(doc(db, "User", `${user?.uid}`))).data();
      setSnap(snapshot);
      setIsLoading(false);

      //slice and get username from url
      // if (snapshot.username !== location.pathname.slice(9)) {
      //   console.log("ayo");
      //   await getCollectionByField(
      //     "User",
      //     "username",
      //     location.pathname.slice(9)
      //   ).then((e) => {
      //     setSnap(e);
      //     setIsLoading(false);
      //   });
      // } else {
      //   setSnap(snapshot);
      //   setIsLoading(false);
      // }
      params.name = snapshot.username; // ???

      // asagidaki mantigi neden yaptım gram fikrim yok

      // if (snapshot.username === params.name) {
      //   setSnap(snapshot);
      //   setIsLoading(false);
      // } else {
      //   let snapshot = await getCollectionByField(
      //     "User",
      //     "username",
      //     params.name
      //   );
      //   snapshot ? setSnap(snapshot) : console.log("no user");
      //   setIsLoading(false);
      // }
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
    document.title = "Profile Page";
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
            setStat={setStat}
            stat={stat}

            // followButtonText={followButtonText}
          />
          {Object.keys(snap).length > 0 && <ProfileLeftColumn snap={snap} />}

          <ProfileRightColumn
            snap={snap}
            getData={getData}
            user={user}
            stat={stat}
          />
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
