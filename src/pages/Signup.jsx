import { React, useState } from "react";
import styled from "styled-components";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <div className="container-username">
        <input
          id="input-username"
          type="text"
          placeholder="Username"
          required
        />
      </div>
      <div className="container-username-mail">
        <input
          id="input-username-mail"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="container-password">
        <input
          id="input-password"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <div className="buttons">
        <button>Signup</button>
        <button>
          <FcGoogle size={20} />
          Sign up With Google
        </button>
      </div>
    </WrapperForm>
  );
};

const WrapperForm = styled.form`
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container-username,
  .container-password,
  .container-username-mail {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0rem;
    input {
      font-size: 1rem;
      width: 60%;
      padding: 0.5rem 0rem;
      border: none;
      color: orange;
      border-bottom: 1.5px solid grey;

      &:focus {
        outline: none;
      }
    }
  }
  .container-forgotPassword {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      width: 50%;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
  .buttons {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      font-size: 0.9rem;
      cursor: pointer;
      padding: 1rem 0.5rem;
      width: 65%;
      margin-bottom: 1.5rem;
      border-radius: 1rem;
      border: none;
      color: white;
      background: black;

      &:hover {
        filter: brightness(60%);
        background: linear-gradient(to left, #f27121, #e94057);
      }
    }
  }
`;
