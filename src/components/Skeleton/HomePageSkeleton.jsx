import { Skeleton } from "@mui/material";
import React from "react";

export const HomePageSkeleton = (props) => {
  const { length } = props;
  return Array.from(new Array(length)).map((val, index) => (
    <Skeleton
      key={index}
      variant="rectangular"
      animation="pulse"
      style={{
        minHeight: "15rem",
        borderRadius: "2rem",
        marginRight: "5rem",
        width: "100%",
      }}
    />
  ));
};
