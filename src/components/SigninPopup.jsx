import { React, useState, useEffect } from "react";
import { Popup, PopupInner } from "../styles/Popup.styled";
import { AiOutlineClose } from "react-icons/ai";
import { Wrapper } from "../styles/SignPopup.styled";

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ForgotPassword } from "./ForgotPassword";

export const SigninPopup = (props) => {
  //check user
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setError(false);
      saveUser(result.user);

      props.setTrigger(false); // popup dispose
    } catch (error) {
      const errorMessage = error.message;
      setError(true);
    }
  };

  const handleLogin = (e) => {
    console.log("1");
    e.preventDefault();

    // Sign in with email
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.email = email;
        props.setTrigger(false); // popup dispose
        setError(false);
        saveUser(user);
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

  const saveUser = async (user) => {
    // check user by doc id if its not exits create a doc.
    const docRef = doc(db, "User", `${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, "User", `${user.uid}`), {
        about: `Hello! welcome to my page`,
        email: user.email,
        favorites: [],
        followers: 0,
        joinDate: user.metadata.creationTime,
        name: user.displayName,
        numberOfPosts: 0,
        posts: [],
        photoUrl: user.photoURL,
        username: user.uid,
        uid: user.uid,
        bannerPhotoUrl:
          "https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/banner%2FFdo6bnFXkAEGtHV.jpg?alt=media&token=ef47dc00-c245-4fbb-863d-4e116f238db9",
      });
    }
  };
  useEffect(() => {
    if (user) {
      console.log("siginpopup usereffect");
    } else {
      console.log("error");
      props.setTrigger(false); // popup dispose
    }
  }, [user]);

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

            <Link
              className="forgotPassword"
              to={"/"}
              onClick={() => {
                props.setTrigger(false);
                setError(false);
                props.setforgotPasswordPopup(true);
              }}
            >
              Forgot Password
            </Link>

            <button>Login</button>
          </form>
          <div className="googleLogin">
            <button onClick={googleLogin}>
              <FcGoogle size={20} />
              Sign in With Google
            </button>
          </div>
        </Wrapper>

        {props.children}
      </PopupInner>
    </Popup>
  ) : (
    ""
  );
};
