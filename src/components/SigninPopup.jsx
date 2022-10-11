import React, { useState } from "react";
import { Popup, PopupInner } from "../styles/Popup.styled";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

export const SigninPopup = (props) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.setTrigger(false); // popup dispose
        console.log(user);
        setError(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setError(true);
        //error codelarına göre mesajı sekillendirme islemi yapilack
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
  };

  return props.trigger ? (
    <Popup>
      <PopupInner>
        <AiOutlineClose
          className="btn-close"
          size={35}
          onClick={() => {
            props.setTrigger(false);
            setError(false);
          }}
        />
        <Wrapper>
          <h3>Sign In</h3>
          <form onSubmit={handleLogin}>
            {error && <span>{errorMessage}</span>}

            <input
              type="Email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link className="forgotPassword" to="/">
              Forgot Password
            </Link>

            <button>Login</button>
            <button>
              <FcGoogle size={20} />
              Sign in With Google
            </button>
          </form>
        </Wrapper>

        {props.children}
      </PopupInner>
    </Popup>
  ) : (
    ""
  );
};

const Wrapper = styled.div`
  text-align: center;
  height: 28rem;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    input {
      font-size: 1rem;
      width: 60%;
      padding: 0.5rem 0rem;
      border: none;
      color: orange;
      border-bottom: 1.5px solid grey;
      /* margin-bottom: -15px; */

      &:focus {
        outline: none;
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.9rem;
      margin-bottom: -10px;
      gap: 1rem;
      padding: 1rem 0.5rem;
      width: 65%;
      border-radius: 1rem;
      border: none;
      color: white;
      background: black;
      cursor: pointer;
      &:hover {
        filter: brightness(60%);
      }
    }
    .forgotPassword {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    span {
      line-height: 0;
      font-size: 0.8rem;
      color: red;
    }
  }
`;
