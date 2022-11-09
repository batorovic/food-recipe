import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { AddRecipeSelect } from "./AddRecipeSelect";

export const AddRecipeRequirements = (props) => {
  const { reqValues, setReqValues } = props;
  // const [values, setValues] = useState({
  //   serves: "1-2",
  //   prepTime: "5min",
  //   cookTime: "5min",
  // });
  const reqs = {
    serves: [
      {
        id: 1,
        spec: "1-2",
      },
      {
        id: 2,
        spec: "2-4",
      },
      {
        id: 3,
        spec: "4-6",
      },
      {
        id: 4,
        spec: "6-8",
      },
      {
        id: 5,
        spec: "8-10",
      },
      {
        id: 6,
        spec: "10-12",
      },
      {
        id: 7,
        spec: "12-14",
      },
      {
        id: 8,
        spec: "14+",
      },
    ],

    prepTime: [
      {
        id: 1,
        spec: "5min",
      },
      {
        id: 2,
        spec: "10min",
      },
      {
        id: 3,
        spec: "15min",
      },
      {
        id: 4,
        spec: "20min",
      },
      {
        id: 5,
        spec: "25min",
      },
    ],

    cookTime: [
      {
        id: 1,
        spec: "5min",
      },
      {
        id: 2,
        spec: "10min",
      },
      {
        id: 3,
        spec: "15min",
      },
      {
        id: 4,
        spec: "20min",
      },
      {
        id: 5,
        spec: "25min",
      },
    ],
  };

  function onChange(e) {
    setReqValues({ ...reqValues, [e.target.name]: e.target.value });
  }
  return (
    <Fragment>
      <h2>Requirements</h2>
      <Wrapper>
        <AddRecipeSelect
          reqArray={reqs.serves}
          name="serves"
          label="Serves"
          onChange={onChange}
        />
        <AddRecipeSelect
          reqArray={reqs.prepTime}
          name="prepTime"
          label="Prep Time"
          onChange={onChange}
        />
        <AddRecipeSelect
          reqArray={reqs.cookTime}
          name="cookTime"
          label="Cook Time"
          onChange={onChange}
        />
      </Wrapper>
    </Fragment>
  );
};

const Fragment = styled.div`
  margin-top: 25px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  margin-left: 15px;
  margin-top: 25px;
`;
