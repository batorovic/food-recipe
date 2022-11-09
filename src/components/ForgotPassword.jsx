import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { Popup, PopupInner } from "../styles/Popup.styled";
import { Wrapper } from "../styles/SignPopup.styled";
import { FormInput } from "./Inputs/FormInput";
import { auth } from "../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { CheckmarkSucces } from "../components/Button/CheckmarkSucces";

export const ForgotPassword = (props) => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your Email",
    },
  ];

  const [values, setValues] = useState({
    email: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, values["email"])
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("succes");
        setStatus(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    setTimeout(() => {
      setStatus(false);
      props.setTrigger(false);
      setError(false);
    }, 2000);
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
            setStatus(false);
          }}
        />
        <Wrapper style={{ height: "15rem" }}>
          <h3>Reset Password</h3>

          <form className="userInformation" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                style={{
                  width: "250px",
                  padding: "10px",
                }}
              />
            ))}
            {!status && <button>Send</button>}
            {status && (
              <div style={{ marginTop: "-20px" }}>
                <CheckmarkSucces />
              </div>
            )}
          </form>
        </Wrapper>
      </PopupInner>
    </Popup>
  ) : (
    ""
  );
};
