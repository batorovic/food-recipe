import { React, useCallback, useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { SigninPopup } from "./SigninPopup";

export const Signin = (props) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePopup = useCallback(
    (e) => {
      props.setTrigger(true);
      console.log("112");
    },
    [props]
  );

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // navigate("/");
        console.log(user);
        // ...
      })
      .catch((error) => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        handlePopup();

        // ..
      });
  };

  return (
    <Wrapper>
      <h3>Sign In</h3>

      <form onSubmit={handleLogin}>
        {error && <span>Wrong email or password</span>}

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

  /* h3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container-username,
  .container-password {
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

    width: 80%;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .buttons {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
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
      }
    }
  } */
`;
