import React, { useEffect, useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Signup } from "../pages/Signup";
import { Search } from "./Search";
import { SignupPopup } from "./SignupPopup";
import { SigninPopup } from "./SigninPopup";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { doc, getDoc } from "firebase/firestore";

export const NavBar = () => {
  const [signinPopup, setSigninPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [snap, setSnap] = useState({});

  // console.log(user);

  // sign out from app
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  useEffect(() => {
    getSnap();
  }, [user]);

  const getSnap = async () => {
    if (user) {
      console.log("navbar use effect");
      const docRef = doc(db, "User", `${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSnap(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  return (
    <Nav>
      <div className="logo">
        <GiKnifeFork />
        <Logo to={`/`}>recipess</Logo>
      </div>
      <Search />

      {!user && (
        <>
          <SigninPopup
            trigger={signinPopup}
            setTrigger={setSigninPopup}
          ></SigninPopup>
          <SignupPopup trigger={signupPopup} setTrigger={setSignupPopup}>
            {/* <Signup /> */}
          </SignupPopup>

          <SignDiv>
            <SignLink onClick={() => setSigninPopup(true)}>Sign in</SignLink>
            <span>/</span>
            <SignLink onClick={() => setSignupPopup(true)}>Sign up</SignLink>
          </SignDiv>
        </>
      )}
      {user && (
        <SignDiv>
          <SignLink to={`/profile/${snap.username}`}>
            {snap.photoUrl ? (
              <img src={snap.photoUrl} alt="" className="avatar" />
            ) : (
              <CgProfile
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          </SignLink>
          <SignLink to="/addrecipe">Add recipe</SignLink>
          <Link className="btn-logut" onClick={logOut}>
            Sign out
          </Link>
        </SignDiv>
      )}
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
  justify-content: space-between;
  /* justify-content: center; */
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
  font-size: 1rem;
  font-weight: 400;
  margin: 0rem 0.5rem;
  &:hover {
    color: #dc930b;
  }
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  }
`;

const SignDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .btn-logut {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    margin: 0rem 0.5rem;
    &:hover {
      color: #dc930b;
    }
  }
`;
