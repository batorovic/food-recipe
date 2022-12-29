import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { TiEdit } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  auth,
  db,
  getCollectionByField,
  getCollectionByFieldInArray,
} from "../../utils/firebase";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const ProfileLeftColumn = (props) => {
  const { snap } = props;
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState(1); //1 Tariflerim 2 Tarif Defterim
  const [postSnap, setPostSnap] = useState({});
  const [favoritesSnap, setFavoritesSnap] = useState([]);

  let params = useParams();

  useEffect(() => {
    console.log("get post use effect");

    async function tester1() {
      const q = query(collection(db, "post"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        for (const snapKey in snap.favorites) {
          if (doc.id === snap.favorites[snapKey]) {
            setFavoritesSnap((favoritesSnap) => [...favoritesSnap, doc.data()]);
          }
        }
      });
      await getCollectionByFieldInArray(
        "post",
        "addedBy",
        `${params.name}`,
        true
      ).then((e) => {
        setPostSnap(e);
      });
    }
    tester1();
  }, [user, setPostSnap]);

  const navigateToSettings = () => {
    navigate(`/settings`);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <BottomLeftSide>
      <div className="about">
        <span>{props.snap.about}</span>
        {props.user && (
          <TiEdit className="editIcon" size={25} onClick={navigateToSettings} />
        )}
      </div>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          My Recipes
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          My Recipe Book
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <h2>My Recipes</h2>
          <hr />
          {/* <p>Recipe Content</p> */}
          <Grid>
            {Object.keys(postSnap).length > 0 &&
              postSnap.map((item, index) => {
                return (
                  <CuisineCard key={index}>
                    <Link to={`/recipe/${item.documentId}`}>
                      <img
                        src={item.coverImagePath}
                        alt=""
                        width={220}
                        height={220}
                      />
                      <h4>{item.title}</h4>
                    </Link>
                  </CuisineCard>
                );
              })}
          </Grid>
        </div>

        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <h2>My Recipe Book</h2>
          <hr />
          {/* <p>My Recipe Book Content</p> */}
          <Grid>
            {favoritesSnap.length > 0 &&
              favoritesSnap.map((item, index) => {
                return (
                  <CuisineCard key={index}>
                    <Link to={`/recipe/${item.documentId}`}>
                      <img
                        src={item.coverImagePath}
                        alt=""
                        width={220}
                        height={220}
                      />
                      <h4>{item.title}</h4>
                    </Link>
                  </CuisineCard>
                );
              })}
          </Grid>
        </div>
      </div>
    </BottomLeftSide>
  );
};

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
    width: 600px; //sonradan eklenen
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

const Grid = styled.div`
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-gap: 2rem;
`;

const CuisineCard = styled.div`
  display: flex;
  img {
    /* width: 100%; */
    border-radius: 2rem;
    transition: all 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
    object-fit: cover;

    &:hover {
      transform: scale(1.1);
    }
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
