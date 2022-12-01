import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { GiKnifeFork, GiRiceCooker } from "react-icons/gi";
import { BsClock } from "react-icons/bs";
import { BsJournalBookmark, BsJournalBookmarkFill } from "react-icons/bs";
import {
  auth,
  db,
  getCollectionByField,
  getCollectionByFieldInArray,
  getCollectionSnapshot,
  updateField,
} from "../utils/firebase";
import "../styles/deneme.css";
import { CommentSection } from "../components/Comment/CommentSection";
import {
  arrayRemove,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import "../styles/card.css";

export const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [snap, setSnap] = useState({});
  const [slideImages, setSlideImages] = useState([]);
  const [swipe, setSwipe] = useState(false);
  const [commentSnap, setCommentSnapshot] = useState([]);
  const [currentUserSnap, setCurrentUserSnap] = useState({});
  const [user, loading, error] = useAuthState(auth);
  const [bookmark, setBookmark] = useState(false);

  let params = useParams();
  let images = [];

  const fetchDetails = async () => {
    //get bookmarks
    console.log("recipe fetch details use effect");
    if (user) {
      const snapshot = await getCollectionSnapshot("User", `${user?.uid}`);
      setCurrentUserSnap(snapshot);
      snapshot.favorites.forEach((favorite) => {
        if (favorite === params.name) {
          setBookmark(true);
        }
      });
    }
    //apiden cekmek
    // const data = await fetch(
    //   `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    // );
    // const detailData = await data.json();
    // setDetails(detailData);

    await getCollectionByField("post", "documentId", `${params.name}`).then(
      async (e) => {
        setSnap(e);
        setSlideImages((slideImages) => [...slideImages, e.coverImagePath]);
        e.filePaths.forEach((element) => {
          setSlideImages((slideImages) => [...slideImages, element]);
          setSwipe(true);
        });
        // const commentSnapshot = await getDocs(
        //   collection(db, `post/${e.documentId}/comment`)
        // );
        // commentSnapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   // console.log(doc.id, " => ", doc.data());
        //   setCommentSnapshot((commentSnap) => [...commentSnap, doc.data()]);
        // });
      }
    );

    // // checki kaldır simdilik dursun hep req atmasin diye duruyor
    // const check = localStorage.getItem("recipe");
    // if (check) {
    //   setDetails(JSON.parse(check));
    // } else {
    //   const data = await fetch(
    //     `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    //   );
    //   const detailData = await data.json();

    //   localStorage.setItem("recipe", JSON.stringify(detailData));

    //   setDetails(detailData);
    // }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name, setSnap, setSlideImages, setCommentSnapshot, user]);

  const onClickBookmark = (e) => {
    setBookmark(!bookmark);

    if (!bookmark) {
      console.log("123");
      updateField("User", user?.uid, { favorites: arrayUnion(params.name) });
    } else {
      updateField("User", user?.uid, { favorites: arrayRemove(params.name) });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        marginLeft: "50px",
        flexDirection: "column",
      }}
    >
      {Object.keys(snap).length > 0 && (
        <DetailWrapper
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div
              className="slide-container"
              style={{ width: "556px", height: "370px" }}
            >
              <h2>{snap.title}</h2>
              <Slide arrows={swipe} canSwipe={swipe} autoplay={swipe}>
                {slideImages.map((slideImage, index) => (
                  <div className="each-slide-effect" key={index}>
                    <div
                      key={index}
                      style={{
                        backgroundImage: `url(${slideImage})`,
                      }}
                    ></div>
                  </div>
                ))}
              </Slide>
            </div>
            {snap.uid !== "admin" && (
              <div className="about-recipe">
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                  }}
                ></div> */}
                <span style={{ color: "grey", marginTop: "22px" }}>
                  Shared By
                </span>
                <div className="author">
                  <Link
                    style={{ display: "contents" }}
                    to={`/profile/${currentUserSnap.username}`}
                  >
                    <div className="recipe-owner">
                      <span style={{ fontSize: "22px" }}>
                        {" "}
                        {currentUserSnap.name}
                      </span>
                      <span>{currentUserSnap.about}</span>
                    </div>
                    <div className="avatar">
                      <img src={currentUserSnap.photoUrl} alt="avatar" />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Info>
            <div className="button-container">
              <div className="buttons">
                <Button
                  className={activeTab === "instructions" ? "active" : ""}
                  onClick={() => setActiveTab("instructions")}
                >
                  Instrucitons
                </Button>
                <Button
                  className={activeTab === "ingredients" ? "active" : ""}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </Button>
              </div>

              <div className="bookmark" onClick={onClickBookmark}>
                {!bookmark ? (
                  <>
                    <BsJournalBookmark size={30} />
                    <span>Bookmark</span>
                  </>
                ) : (
                  <>
                    <BsJournalBookmarkFill size={30} />
                    <span>Unbookmark</span>
                  </>
                )}
              </div>
            </div>

            {activeTab === "instructions" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: "2rem",
                  }}
                >
                  <div className="reqs">
                    <GiKnifeFork size={20} />
                    <h4> {snap.requierements.serves}</h4>
                  </div>
                  <div className="reqs">
                    <GiRiceCooker size={20} />
                    <h4> {snap.requierements.cookTime}</h4>
                  </div>
                  {snap.requierements.prepTime && (
                    <div className="reqs">
                      <BsClock size={20} />
                      <h4>{snap.requierements.prepTime}</h4>
                    </div>
                  )}
                </div>

                <h3 dangerouslySetInnerHTML={{ __html: snap.brief }}></h3>
                <h3 dangerouslySetInnerHTML={{ __html: snap.instruction }}></h3>
              </div>
            )}

            {activeTab === "ingredients" && (
              <ul>
                {snap.ingredient.map((ingredient) => (
                  <li key={ingredient.id}>
                    {/* {apiden otomatik ekledigim icin admin normal admin eklediğinde onun adminuser diye uid acariz} */}
                    {snap.uid === "admin" ? ingredient.original : ingredient}
                  </li>
                ))}
              </ul>
            )}
          </Info>
        </DetailWrapper>
      )}
      {Object.keys(snap).length > 0 &&
        Object.keys(currentUserSnap).length > 0 && (
          <CommentSection postSnap={snap} currentUserSnap={currentUserSnap} />
        )}
    </div>
  );
};

const DetailWrapper = styled(motion.div)`
  margin-top: 5rem;
  margin-bottom: 10rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  .about-recipe {
    margin-top: 50px;
    height: 500px;
    display: flex;
    flex-direction: column;

    img {
      width: 60px;
      height: 60px;
      border-radius: 100%;
    }
    .author {
      display: flex;
      justify-content: flex-start;
      gap: 2.2rem;
    }
    .recipe-owner {
      display: flex;
      flex-direction: column;
    }
    .avatar {
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 7rem;
  .button-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* width: 500px; */
    .bookmark {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      cursor: pointer;
    }
  }
  .buttons {
    display: flex;
  }
  .reqs {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    margin-top: 25px;
  }
`;
