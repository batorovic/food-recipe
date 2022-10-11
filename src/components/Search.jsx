import { React, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  margin: 0rem 10rem;
  div {
    position: relative;
    width: 120%;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    /* padding: 0.5rem 3rem; */
    padding: 0.5rem 3.8rem;

    border-radius: 1rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    color: white;
    top: 50%;
    left: 0%;
    width: 20px;
    height: 20px;
    transform: translate(100%, -50%);
  }
`;
