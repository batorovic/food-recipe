import { React, useState, useEffect } from "react";
import { Popup, PopupInner } from "../styles/Popup.styled";
import { AiOutlineClose } from "react-icons/ai";
import { Wrapper } from "../styles/SignPopup.styled";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

export const SignupPopup = (props) => {
  //check user
  const [user, loading] = useAuthState(auth);

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // // google signinden gelenler
  // const [photoUrl, setPhotoUrl] = useState("");
  // const [name, setUserName] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user?.uid);
        sendEmailVerification(user).then(
          alert("Email Verification has been sent")
        );

        await setDoc(doc(db, "User", `${user.uid}`), {
          about: `Hello! welcome to my page`,
          email: email,
          favorites: [],
          followers: 0,
          joinDate: user.metadata.creationTime,
          name: "",
          numberOfPosts: 0,
          posts: [],
          uid: user.uid,
          photoUrl:
            "https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/Defaults%2FdefaultAvatar.png?alt=media&token=aac8b48a-2ce0-4313-8758-662598700004",
          username: username,
          bannerPhotoUrl:
            "https://firebasestorage.googleapis.com/v0/b/recipe-app-c5434.appspot.com/o/Defaults%2FdefaultBanner.jpg?alt=media&token=b74c7775-bb92-4d90-b7b9-75aa1ae834b7",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    if (user) {
      console.log("sign up popup usereffect");

      props.setTrigger(false); // popup dispose
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
        <Wrapper style={{ height: "25rem" }}>
          <h3>Sign Up</h3>
          <form onSubmit={handleSignup}>
            {/* {error && <span>{errorMessage}</span>} */}

            <input
              type="Email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={{ marginTop: "2rem" }}>Sign up</button>
          </form>
          {/* <div className="googleLogin">
            <button onClick={googleLogin}>
              <FcGoogle size={20} />
              Sign in With Google
            </button>
          </div> */}
        </Wrapper>

        {props.children}
      </PopupInner>
    </Popup>
  ) : (
    ""
  );
};
