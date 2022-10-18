import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const ProfileStats = (props) => {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (Object.keys(props.snap).length !== 0) {
      console.log("profile status count use effect");
      setFollowerCount(props.snap.followers);
      setFavoritesCount(props.snap.favorites.length);
      setRecipeCount(props.snap.posts.length);
    }
  }, [props.snap]);
  return (
    <ProfileStatsWrapper>
      <div className="followerCount">
        <span className="spanCount">{followerCount}</span>
        <span>Followers</span>
      </div>
      <div className="recipeCount">
        <span className="spanCount">{recipeCount}</span>
        <span>Recipes</span>
      </div>
      <div className="favoritesCount">
        <span className="spanCount">{favoritesCount}</span>
        <span>Favorites</span>
      </div>
    </ProfileStatsWrapper>
  );
};

const ProfileStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin-top: 8rem;
  width: 330px;
  height: 100px;
  gap: 2rem;
  .followerCount,
  .recipeCount,
  .favoritesCount {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .spanCount {
    font-size: 1.5rem;
    font-weight: 600;
    border-width: 3px;
    border-style: solid;
    border-image: linear-gradient(to right, #f27121, #e94057) 0 0 100% 0;
  }
`;
