import { Popular } from "../components/Popular";
import { Veggie } from "../components/Veggie";
import { motion } from "framer-motion";

import React, { useEffect } from "react";
import { Category } from "../components/Category";
import { UserRecipes } from "../components/UserRecipes";

export const Home = () => {
  useEffect(() => {
    console.log("home page use effect");
    document.title = "Food Recipes";
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Veggie />
      <Popular />
      <UserRecipes />
    </motion.div>
  );
};
