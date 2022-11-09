import React from "react";
import styled from "styled-components";

export const AnimatedButton = (props) => {
  return (
    <Wrap>
      <button className="button" onClick={props.onClick}>
        {props.name}
      </button>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .button {
    width: 140px;
    height: 50px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #fff;
    background-color: #000;
    border: none;
    border-radius: 25px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }

  .button:hover {
    background-color: orange;
    box-shadow: 0px 15px 20px rgba(229, 195, 46, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
