import React, { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Signin } from "./Signinold";
import { Signup } from "../pages/Signup";
import { Search } from "./Search";
import { SignupPopup } from "./SignupPopup";
import { SigninPopup } from "./SigninPopup";

export const NavBar = () => {
  const [signinPopup, setSigninPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  return (
    <Nav>
      <div className="logo">
        <GiKnifeFork />
        <Logo to={`/`}>recipess</Logo>
      </div>
      <Search />

      {/* POPUP */}
      <SigninPopup
        trigger={signinPopup}
        setTrigger={setSigninPopup}
      ></SigninPopup>
      <SignupPopup trigger={signupPopup} setTrigger={setSignupPopup}>
        <Signup />
      </SignupPopup>

      <SignDiv>
        <SignLink onClick={() => setSigninPopup(true)}>Sign in</SignLink>
        <span>/</span>
        <SignLink onClick={() => setSignupPopup(true)}>Sign up</SignLink>
      </SignDiv>
    </Nav>
  );
};

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
`;

const Nav = styled.div`
  padding: 3rem 0rem;
  display: flex;
  /* justify-content: flex-start; */
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 2rem;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SignLink = styled(Link)`
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0rem 0.5rem;
  &:hover {
    color: #dc930b;
  }
`;

const SignDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
