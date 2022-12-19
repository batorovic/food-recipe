import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../styles/Card.styled";
import { db } from "../utils/firebase";

export const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const getSearched = async (name) => {
    name = titleCase(name);
    setSearchedRecipes([]);
    // const data = await fetch(`
    //   https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${name}`);
    // const recipes = await data.json();
    // setSearchedRecipes(recipes.results);
    // console.log(recipes.results);
    try {
      const docRef = collection(db, `post`);
      const commentSnapshot = await getDocs(
        query(docRef, orderBy("timestamp", "desc"))
      );
      commentSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // console.log(doc.data().title.split(" "));
        if (doc.data().title.split(" ").includes(name)) {
          // console.log(doc.data().title);
          setSearchedRecipes((searchedRecipes) => [
            ...searchedRecipes,
            doc.data(),
          ]);
        }
        // console.log(doc.data());
        // setCommentSnapshot((commentSnap) => [...commentSnap, doc.data()]);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  //params.search cünkü pages kısmında /searched/:search yazdık

  return (
    <Grid>
      {searchedRecipes.map((item, index) => {
        return (
          <CuisineCard key={index}>
            <Link to={`/recipe/${item.documentId}`}>
              <img src={item.coverImagePath} alt="" width={100} height={100} />
              <h4>{item.title}</h4>
            </Link>
          </CuisineCard>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); */
  grid-template: repeat(6, 1fr) / repeat(5, 1fr);
  /* grid-template-columns: fit-content(200px) fit-content(200px) 1fr; */
  grid-gap: 3rem;
`;

const CuisineCard = styled.div`
  img {
    width: 100%;
    border-radius: 1rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
