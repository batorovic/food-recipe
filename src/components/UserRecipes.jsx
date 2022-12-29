import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import { Wrapper, Card, Gradient } from "../styles/Card.styled";
import { db } from "../utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Skeleton } from "@mui/material";
import { HomePageSkeleton } from "./Skeleton/HomePageSkeleton";

export const UserRecipes = () => {
  const [userRecipe, setUserRecipe] = useState([]);
  const [snap, setSnap] = useState([]);

  const getUserRecipe = async () => {
    const q = query(collection(db, "post"), orderBy("timestamp", "desc"));
    await getDocs(q).then((e) =>
      e.forEach((doc) => {
        if (doc.data().uid !== "admin")
          setSnap((snap) => [...snap, doc.data()]);
      })
    );
  };

  useEffect(() => {
    getUserRecipe();
  }, []);

  return (
    <div>
      <Wrapper>
        <h3>Recipes from you</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {snap.length === 0 ? (
            <HomePageSkeleton length={3} />
          ) : (
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
            })
          )}
        </Splide>
      </Wrapper>
    </div>
  );
};
