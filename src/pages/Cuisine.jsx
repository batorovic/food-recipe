import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

export const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const check = localStorage.getItem(name);

    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const data = await fetch(`
      https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&cuisine=${name}`);
      const recipes = await data.json();

      localStorage.setItem(name, JSON.stringify(recipes.results));
      setCuisine(recipes.results);
    }
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
      {cuisine.map((item) => {
        return (
          <CuisineCard key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </CuisineCard>
        );
      })}
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
