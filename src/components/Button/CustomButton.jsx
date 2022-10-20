import styled from "styled-components";

import React from "react";

export const CustomButton = (props) => {
  return (
    <div
      className="div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={props.onClick}>{props.name}</Button>
    </div>
  );
};

const Button = styled.button`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  gap: 1rem;
  padding: 1rem 0.5rem;
  width: 80%;
  border-radius: 1rem;
  border: none;
  color: white;
  background: black;
  cursor: pointer;
  &:hover {
    filter: brightness(60%);
  }
`;
