import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import styled from "styled-components";
import { AiOutlineClose, AiTwotoneAccountBook } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const btnClose = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <div className="top">
        <button className="btnClose" onClick={btnClose}>
          <AiOutlineClose />
          <span>Kapat</span>
        </button>
      </div>

      <form className="userInformation">
        <h3>User Information</h3>
        <div className="inputFields">
          <div className="inputName">
            <label htmlFor="inputName">Name</label>
            <input type="text" />
          </div>
          <div className="inputUsername">
            <label htmlFor="inputUsername">Username</label>
            <input type="text" />
          </div>
          <div className="inputMail">
            <label htmlFor="inputUsername">Mail</label>
            <input type="text" />
          </div>
          <div className="btnSubmit">
            <button>Submit</button>
          </div>
        </div>
      </form>
    </Wrapper>
    // <>
    //   {!user && (
    //     <div>
    //       <p>no permission</p>
    //     </div>
    //   )}

    //   {user && (
    //     <div>
    //       <p>settings</p>
    //     </div>
    //   )}
    // </>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .top {
    width: 450px;
  }

  /* .userInformation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  } */
  .inputFields {
    width: 450px;
  }
  .inputName,
  .inputUsername,
  .inputMail {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .inputUsername,
  .inputMail {
    pointer-events: none;
    input {
      background-color: #d3d3d3;
    }
  }

  input {
    width: 285px;
    padding: 12px;
    margin: 10px 0px;
    margin-left: 80px;
    border-radius: 5px;
    border: 1px solid grey;
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
    button {
      width: 200px;
    }
  }
  /*
  .inputFields {
    width: 400px;
    height: 250px;
    background-color: red;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1.5rem;
    input {
      padding: 5px;
    }
  } */
`;
