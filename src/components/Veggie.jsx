import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import { Wrapper, Card, Gradient } from "../styles/Card.styled";
import {
  getCollectionByFieldInArray,
  getCollectionSnapshot,
  setCollection,
  storage,
  updateField,
} from "../utils/firebase";
import { serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";
import { Box, Skeleton } from "@mui/material";
import { HomePageSkeleton } from "./Skeleton/HomePageSkeleton";

export const Veggie = () => {
  const [veggie, setVeggie] = useState([]);
  const [snap, setSnap] = useState({});

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    // console.log(JSON.parse(check));

    let checkValue = JSON.parse(check);
    // let value = checkValue[0];
    //ekleme
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
    //     category: "veggie",
    //   }).then((e) => {
    //     updateField("post", e, { documentId: e });
    //   });
    // });

    // await getCollectionByFieldInArray("post", "uid", "admin").then((e) => {
    //   setSnap(e);
    // });

    await getCollectionByFieldInArray("post", "category", "veggie").then(
      (e) => {
        setSnap(e);
      }
    );

    // if (check) {
    //   setVeggie(JSON.parse(check));
    // } else {
    //   const api = await fetch(`
    //   https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9&tags=vegetarian`);
    //   const data = await api.json();

    //   localStorage.setItem("veggie", JSON.stringify(data.recipes));
    //   setVeggie(data.recipes);
    // }
  };

  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
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
          {/* {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>
                  <Card>
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
    </div>
  );
};
