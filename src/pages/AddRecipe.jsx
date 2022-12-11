import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  getCollectionSnapshot,
  setCollection,
  signOutFromApp,
  updateField,
} from "../utils/firebase";
import styled from "styled-components";
import { AddRecipeTextArea } from "../components/AddRecipe/TextArea/AddRecipeTextArea";
import { AddRecipeImages } from "../components/AddRecipe/AddRecipeImages";
import { AddRecipeRequirements } from "../components/AddRecipe/AddRecipeRequirements";
import { BiEdit } from "react-icons/bi";
import { CustomButton } from "../components/Button/CustomButton";
import { AnimatedButton } from "../components/Button/AnimatedButton";
import { useEffect } from "react";
import { NavbarDropdown } from "../components/DropdownMenu/NavbarDropdown";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { MdExitToApp } from "react-icons/md";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { motion } from "framer-motion";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { uploadFiles } from "../utils/uploadFile";

export const AddRecipe = (props) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [file, setFile] = useState([]);
  const [coverImageIndex, setCoverImageIndex] = useState(0);
  const [textAreaValue, setTextAreaValue] = useState({
    title: "",
    brief: "",
    ingredients: "",
    instructions: "",
  });
  const [reqValues, setReqValues] = useState({
    serves: "1-2",
    prepTime: "5min",
    cookTime: "5min",
  });
  const [snapshot, setSnapshot] = useState({});

  useEffect(() => {
    function getSnapshot() {
      console.log("add recipe use effect");
      getCollectionSnapshot("User", user?.uid).then((result) => {
        setSnapshot(result);
      });
    }

    getSnapshot();
  }, [user, setSnapshot]);

  const onChange = (e) => {
    setTextAreaValue({ ...textAreaValue, [e.target.name]: e.target.value });
  };

  const signOut = () => {
    navigate(-1);
    signOutFromApp();
  };

  const textAreaInputs = [
    {
      id: 1,
      name: "title",
      placeholder: "Title for your recipe",
      maxLength: 90,
      onChange: onChange,
      style: { fontSize: "2.2rem" },
    },
    {
      id: 2,
      name: "brief",
      placeholder: "Give a brief about your recipe.",
      maxLength: 500,
      onChange: onChange,
      style: { fontSize: "1rem" },
    },
    {
      id: 3,
      name: "ingredients",
      placeholder: "Write ingredients one under the other.",
      maxLength: 1000,
      onChange: onChange,
      style: { fontSize: "1rem" },
    },
    {
      id: 4,
      name: "instructions",
      placeholder: "Write instructions one under the other.",
      maxLength: 1000,
      onChange: onChange,
      style: { fontSize: "1rem", maxHeight: "200px", minHeight: "100px" },
    },
  ];

  const dropDownMenu = [
    {
      id: 1,
      name: "Profile",
      to: `/profile/${snapshot.username}`,
      icon: <CgProfile size={20} />,
    },
    {
      id: 2,
      name: "Settings",
      to: `/settings`,
      icon: <FiSettings size={20} />,
    },
    {
      id: 3,
      name: "Sign Out",
      onClick: signOut,
      icon: <MdExitToApp size={20} />,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    //sets collection and returns the added collection id
    const documentId = await setCollection("post", {
      brief: textAreaValue.brief.split("\n"),
      ingredient: textAreaValue.ingredients.split("\n"),
      instruction: textAreaValue.instructions.split("\n"),
      requierements: reqValues,
      title: textAreaValue.title,
      uid: user?.uid,
      coverImagePath: "",
      filePaths: [],
      documentId: "",
      addedBy: snapshot.username,
      timestamp: serverTimestamp(),
      userPhoto: snapshot.photoUrl,
    });

    // upload caliisyor
    uploadFiles(
      file,
      user?.uid,
      `post/${documentId}`,
      file[coverImageIndex].name,
      documentId
    ).then(() => {
      updateField("post", documentId, { documentId: documentId });
      updateField("User", user?.uid, {
        numberOfPosts: increment(1),
        post: arrayUnion(documentId),
      });
    });
  };

  async function onCLickButton(e) {
    // console.log(textAreaValue);
    // console.log(file[coverImageIndex]);
    // console.log(reqValues);
    //nested icin ornek ref dursun
    // getCollectionSnapshot(
    //   "post",
    //   "bykfByv2mvwVRRUlwtVM/comments/ybfomAgrDYZiqibubIA8"
    // ).then((result) => {
    //   console.log(result);
    // });
  }
  return (
    <Main>
      {!user && <div>NO ACCES</div>}
      {user && Object.keys(snapshot).length > 0 && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Nav>
            <ul className="navul">
              <li>
                <div className="logo">
                  <GiKnifeFork size={30} />
                  <Logo to={`/`}>recipess</Logo>
                </div>
              </li>
              <li className="pp">
                {/* if snapshot varsa eklenebilir */}
                <img
                  className="avatar"
                  src={snapshot.photoUrl}
                  alt={snapshot.photoUrl}
                />
              </li>
              <UlWrapper className="UlWrapper">
                {dropDownMenu.map((item) => (
                  <NavbarDropdown key={item.id} {...item} />
                ))}
              </UlWrapper>
            </ul>
          </Nav>

          <MainDivForm onSubmit={handleSubmit}>
            <BottomSection>
              <LeftSection>
                <h2>Recipe Information</h2>
                {textAreaInputs.map((item) => (
                  <AddRecipeTextArea key={item.id} {...item} />
                ))}
                <AddRecipeImages
                  file={file}
                  setFile={setFile}
                  setCoverImageIndex={setCoverImageIndex}
                />
                <AddRecipeRequirements
                  reqValues={reqValues}
                  setReqValues={setReqValues}
                />
              </LeftSection>

              <RightSection>
                <div className="important">
                  <span>
                    <strong>IMPORTANT: </strong>
                    <label>Please fill every input where you see star(*)</label>
                  </span>
                </div>

                <div className="recipeConfirmation">
                  <div className="title">
                    <BiEdit size={35} color="orange" />
                    <h2>Recipe Content</h2>
                  </div>
                  <div className="bottom">
                    Send your recipe and we'll publish it under your name.
                    {/* <CustomButton onClick={onCLickButton} name={"SEND"} /> */}
                    <AnimatedButton onClick={onCLickButton} name="SEND" />
                  </div>
                </div>
              </RightSection>
            </BottomSection>
          </MainDivForm>
        </motion.div>
      )}
    </Main>
  );
};

const Main = styled.div`
  height: "1500px";
`;

const Nav = styled.nav`
  padding: 2rem;
  position: relative;
  .navul {
    padding: 1rem;
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .pp {
    cursor: pointer;
  }
  .pp:hover ~ .UlWrapper,
  .UlWrapper:hover {
    display: block;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
`;
const UlWrapper = styled.div`
  z-index: 111;
  background-color: white;
  width: 180px;
  position: absolute;
  border-radius: 10px;
  right: -60px;
  top: 88px;
  display: none;
`;

const MainDivForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const BottomSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
`;

const LeftSection = styled.div`
  width: 690px;
  height: 1850px;
  h2 {
    margin-bottom: 20px;
  }
`;

const RightSection = styled.div`
  width: 370px;
  height: 370px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  .important {
    font-size: large;
    text-decoration: underline;
    strong {
      color: orange;
    }
  }

  .recipeConfirmation {
    width: 370px;
  }

  .title {
    background-color: #202f39;
    display: flex;
    align-items: center;
    gap: 1.3rem;
    padding: 20px;
    h2 {
      color: white;
    }
  }

  .bottom {
    background-color: #ededed;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    button {
      margin-top: 30px;
      width: 300px;
      font-size: medium;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    }
  }
`;
