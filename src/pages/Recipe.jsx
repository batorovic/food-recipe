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

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";

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
  const [readOnly, setReadOnly] = useState(false);
  const labels = {
    0.5: "0.5",
    1: "1",
    1.5: "1.5",
    2: "2",
    2.5: "2.5",
    3: "3",
    3.5: "3.5",
    4: "4",
    4.5: "4.5",
    5: "5",
  };
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

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
    } else {
      setReadOnly(true);
    }
    //apiden cekmek
    // const data = await fetch(
    //   `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    // );
    // const detailData = await data.json();
    // setDetails(detailData);

    await getCollectionByField("post", "documentId", `${params.name}`).then(
      async (e) => {
        let sum = 0;
        setSnap(e);
        setSlideImages((slideImages) => [...slideImages, e.coverImagePath]);
        e.filePaths.forEach((element) => {
          setSlideImages((slideImages) => [...slideImages, element]);
          setSwipe(true);
        });
        try {
          e.rating.forEach((value) => {
            sum += value.number;
            if (user?.uid === value.ratedBy) setReadOnly(true);
          });
          Number.isInteger(sum / e.rating.length)
            ? setValue(sum / e.rating.length)
            : setValue(Math.floor(sum / e.rating.length) + 0.5);
        } catch (error) {
          console.log("not rated yet");
        }

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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: "2rem",
                }}
              >
                <h2>{snap.title}</h2>

                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "60px",
                  }}
                >
                  <Rating
                    size="large"
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    readOnly={readOnly}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setReadOnly(true);

                      updateField("post", params.name, {
                        rating: arrayUnion({
                          ratedBy: user?.uid,
                          number: newValue,
                        }),
                      }).then((e) => {
                        getCollectionByField(
                          "post",
                          "documentId",
                          `${params.name}`
                        ).then(async (data) => {
                          // setSnap(data);

                          let sum = 0;

                          data.rating.forEach((value) => {
                            sum += value.number;
                          });
                          if (Number.isInteger(sum / data.rating.length)) {
                            setValue(sum / data.rating.length);
                            setHover(sum / data.rating.length);
                          } else {
                            setValue(
                              Math.floor(sum / data.rating.length) + 0.5
                            );
                            setHover(
                              Math.floor(sum / data.rating.length) + 0.5
                            );
                          }
                        });
                      });
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }} fontSize="22px">
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
              </div>
              <Slide arrows={swipe} canSwipe={swipe} autoplay={swipe}>
                {slideImages.map((slideImage, index) => (
                  <div
                    className="each-slide-effect"
                    key={index}
                    style={{
                      backgroundColor: "#f5f5f5",
                      width: "560px",
                      height: "360px",
                    }}
                  >
                    <img
                      key={index}
                      alt="slide_img"
                      src={slideImage}
                      style={{
                        objectFit: "fill",
                        height: "100%",
                        width: "100%",
                      }}
                    />
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
                    onClick={() => {
                      window.location.href = `/profile/${snap.addedBy}`;
                    }}
                  >
                    <div className="recipe-owner">
                      <span style={{ fontSize: "22px" }}>
                        {currentUserSnap.name}
                      </span>
                      <span>{currentUserSnap.about}</span>
                    </div>
                    <div className="avatar">
                      <img src={snap.userPhoto} alt="avatar" />
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
              {user ? (
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
              ) : (
                ""
              )}
            </div>

            {activeTab === "instructions" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
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
                {snap.ingredient.map((ingredient, index) => (
                  <li key={index}>
                    {/* {apiden otomatik ekledigim icin admin normal admin eklediğinde onun adminuser diye uid acariz} */}
                    {snap.uid === "admin" ? ingredient.original : ingredient}
                  </li>
                ))}
              </ul>
            )}
          </Info>
        </DetailWrapper>
      )}
      {Object.keys(snap).length > 0 && (
        <CommentSection postSnap={snap} currentUserSnap={currentUserSnap} />
      )}
      {/* // Object.keys(currentUserSnap).length > 0 && ( //{" "}
      <CommentSection postSnap={snap} currentUserSnap={currentUserSnap} />
      // )} */}
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
    /* margin-bottom: 2rem; */
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
