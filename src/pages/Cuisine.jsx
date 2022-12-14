import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  getCollectionByFieldInArray,
  setCollection,
  updateField,
} from "../utils/firebase";
import { serverTimestamp } from "firebase/firestore";

export const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const [tester, setTester] = useState([]);
  const [recipe, setRecipe] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    getCollectionByFieldInArray("post", "category", `${name}`).then((e) =>
      setRecipe(e)
    );
    const check = localStorage.getItem(name);

    //once bu yapılıyor
    // let checkValue = JSON.parse(check);
    // checkValue.map(async (value) => {
    //   // console.log("1");
    //   const data = await fetch(
    //     `https://api.spoonacular.com/recipes/${value.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    //   );
    //   const detailData = await data.json().then((e) => {
    //     setTester((tester) => [...tester, e]);
    //     localStorage.setItem("recipe", JSON.stringify(tester));
    //   });
    // });

    // let value = checkValue[0];
    //vt ekleme
    // const check1 = localStorage.getItem("recipe");
    // let checkValue1 = JSON.parse(check1);

    // checkValue1.map(async (value) => {
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
    //     category: name,
    //   }).then((e) => {
    //     updateField("post", e, { documentId: e });
    //   });
    // });

    // if (check) {
    //   setCuisine(JSON.parse(check));
    // } else {
    //   const data = await fetch(`
    //   https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&cuisine=${name}&number=20`);
    //   const recipes = await data.json();

    //   localStorage.setItem(name, JSON.stringify(recipes.results));
    //   setCuisine(recipes.results);
    // }
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {recipe.length > 0
        ? recipe.map((value, index) => {
            return (
              <CuisineCard key={index}>
                <Link to={`/recipe/${value.documentId}`}>
                  <img src={value.coverImagePath} alt="coverImage" />
                  <h4>{value.title}</h4>
                </Link>
              </CuisineCard>
            );
          })
        : null}
      {/* {cuisine.map((item) => {
        return (
          <CuisineCard key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </CuisineCard>
        );
      })} */}
    </Grid>
  );
};

//responsive grid
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-gap: 3rem;
`;

const CuisineCard = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    transition: all 1s ease;
    &:hover {
      transform: scale(1.2);
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
