import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

import {
  getCollectionByField,
  getCollectionByFieldInArray,
} from "../utils/firebase";
import "../styles/deneme.css";

export const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [snap, setSnap] = useState({});
  const [slideImages, setSlideImages] = useState([]);
  const [swipe, setSwipe] = useState(false);
  let params = useParams();
  let images = [];

  const fetchDetails = async () => {
    console.log("recipe fetch details use effect");
    //apiden cekmek
    // const data = await fetch(
    //   `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    // );
    // const detailData = await data.json();
    // setDetails(detailData);

    await getCollectionByField("post", "id", `${params.name}`).then((e) => {
      setSnap(e);
      setSlideImages((slideImages) => [...slideImages, e.coverImagePath]);
      e.filePaths.forEach((element) => {
        setSlideImages((slideImages) => [...slideImages, element]);
        setSwipe(true);
      });
    });

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
  }, [params.name, setSnap, setSlideImages]);

  return (
    <>
      {Object.keys(snap).length > 0 && (
        <DetailWrapper
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="slide-container"
            style={{ width: "556px", height: "370px" }}
          >
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
          <Info>
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
                  <h3>Serves: {snap.requierements.serves}</h3>
                  <h3>Cook Time: {snap.requierements.cookTime}</h3>
                  {snap.requierements.prepTime && (
                    <h3>Prep Time: {snap.requierements.prepTime}</h3>
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
    </>
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
`;
