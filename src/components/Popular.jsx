import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Wrapper, Card, Gradient } from "../styles/Card.styled";
import { Link } from "react-router-dom";
import {
  getCollectionByFieldInArray,
  setCollection,
  updateField,
} from "../utils/firebase";
import { serverTimestamp } from "firebase/firestore";
import { Skeleton } from "@mui/material";
import { HomePageSkeleton } from "./Skeleton/HomePageSkeleton";

export const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [snap, setSnap] = useState({});

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    //vtye kaydedilecek.
    const check = localStorage.getItem("popular");

    // let checkValue = JSON.parse(check);

    // checkValue.map(async (value) => {
    //   //  resim oranın linki buna bakacagiz bir ara
    //   const documentId = await setCollection("post", {
    //     brief: value.summary,
    //     ingredient: value.extendedIngredients,
    //     instruction: value.instructions,
    //     requierements: {
    //       serves: value.servings,
    //       cookTime: value.readyInMinutes,
    //     },
    //     title: value.title,
    //     uid: "admin",
    //     coverImagePath: value.image,
    //     filePaths: [],
    //     documentId: "",
    //     id: `${value.id}`,
    //     timestamp: serverTimestamp(),
    //     category: "popular",
    //   }).then((e) => {
    //     updateField("post", e, { documentId: e });
    //   });
    // });

    await getCollectionByFieldInArray("post", "category", "popular").then(
      (e) => {
        setSnap(e);
      }
    );

    // if (check) {
    //   setPopular(JSON.parse(check));
    // } else {
    //   const api = await fetch(`
    //   https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`);
    //   const data = await api.json();

    //   localStorage.setItem("popular", JSON.stringify(data.recipes));
    //   setPopular(data.recipes);
    // }
  };

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "5rem",
        }}
      >
        {Object.keys(snap).length === 0 ? (
          <HomePageSkeleton length={3} />
        ) : null}
        {Object.keys(snap).length > 0 &&
          snap.map((value, index) => {
            return (
              <SplideSlide key={index}>
                <Link to={`/recipe/${value.documentId}`}>
                  <Card>
                    <p>{value.title}</p>
                    <img src={value.coverImagePath} alt={value.title} />
                    <Gradient />
                  </Card>
                </Link>
              </SplideSlide>
            );
          })}
        {/* {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <Card key={recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </Link>
            </SplideSlide>
          );
        })} */}
      </Splide>
    </Wrapper>
  );
};
