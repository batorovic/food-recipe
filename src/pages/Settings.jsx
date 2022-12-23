import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, updateField } from "../utils/firebase";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GetCollectionSnapshot } from "../utils/GetCollectionSnapshot";
import { CustomButton } from "../components/Button/CustomButton";
import { FormInput } from "../components/Inputs/FormInput";
import {
  Checkmark,
  CheckmarkSucces,
} from "../components/Button/CheckmarkSucces";

export const Settings = () => {
  const [user, loading] = useAuthState(auth);
  const [snap, setSnap] = useState({});
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      label: "Name",
    },
    {
      id: 2,
      name: "username",
      type: "text",
      label: "Username",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      label: "Email",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  const btnClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    getSnapshot();
  }, [user]);

  const getSnapshot = async () => {
    if (user) {
      console.log("get collection snapshot user effect");
      let snapshot = await GetCollectionSnapshot("User", user);

      setValues({
        name: snapshot.name,
        email: snapshot.email,
        username: snapshot.username,
      });
      setAbout(snapshot.about);

      setSnap(snapshot);
      // setName(snapshot.name);
      // setMail(snapshot.email);
      // setUserName(snapshot.username);
    }
  };

  const btnUpdate = async () => {
    if (
      await updateField("User", user.uid, {
        username: values["username"],
        email: values["email"],
        name: values["name"],
        about: about,
      })
    ) {
      exportUsername(values["username"]);
      setUpdateStatus(true);
      setTimeout(() => {
        setUpdateStatus(false);
        navigate(-1);
      }, 1350);
    }
  };

  return (
    <Wrapper>
      {user && (
        <>
          <div className="top">
            <button className="btnClose" onClick={btnClose}>
              <AiOutlineClose size={30} />
              <span>Close</span>
            </button>
          </div>
          <form className="userInformation" onSubmit={handleSubmit}>
            <h3>User Information</h3>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                style={
                  input.name === "email" ||
                  (input.name === "username" && user.uid !== snap.username)
                    ? { pointerEvents: "none", backgroundColor: "#d3d3d3" }
                    : {}
                }
              />
            ))}
            <div className="inputAbout">
              <label htmlFor="inpAbout">About</label>
              <textarea
                id="inpAbout"
                maxLength={200}
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              ></textarea>
            </div>

            <CustomButton name={"Update"} onClick={btnUpdate} />
          </form>

          {updateStatus && <CheckmarkSucces />}
        </>
      )}
      {!user && (
        <>
          <h4>NO ACCES</h4>
        </>
      )}
    </Wrapper>
  );
};
export function exportUsername(e) {
  return e;
}

const Wrapper = styled.div`
  margin: 0% 10%;

  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  textarea {
    width: 285px;
    padding: 12px;
    margin: 10px 0px;
    margin-left: 80px;
    border-radius: 5px;
    border: 1px solid grey;
    resize: vertical;
    min-height: 55px;
  }

  .top {
    width: 450px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .inputAbout {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btnClose {
    font-size: 1.4rem;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    cursor: pointer;
  }
  .btnSubmit {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
