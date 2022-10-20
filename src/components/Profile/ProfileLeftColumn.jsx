import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const ProfileLeftColumn = (props) => {
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState(1); //1 Tariflerim 2 Tarif Defterim

  const navigateToSettings = () => {
    navigate(`/settings`);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <BottomLeftSide>
      <div className="about">
        <span>{props.snap.about}</span>
        {props.user && (
          <TiEdit className="editIcon" size={25} onClick={navigateToSettings} />
        )}
      </div>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Tariflerim
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Tarif Defterim
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <h2>Tariflerim</h2>
          <hr />
          <p>Tariflerim content</p>
        </div>

        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <h2>Tarif Defterim</h2>
          <hr />
          <p>Tarif Defterim content</p>
        </div>
      </div>
    </BottomLeftSide>
  );
};

const BottomLeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
  margin-top: 20rem;
  margin-right: 8rem;
  position: absolute;
  word-break: break-all;

  .about {
    height: 10px;
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15rem;
    margin-bottom: 2rem;
    margin-left: -2rem;

    &:hover .editIcon {
      display: block;
    }
    .editIcon {
      display: none;
      cursor: pointer;
    }
  }

  .active-content {
    display: block;
  }

  .bloc-tabs {
    gap: 3rem;
    /* display: flex;
    align-items: center;
    justify-content: center; */ //silebilirsin.
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15rem;
  }
  .tabs {
    font-size: 1.2rem;
    color: black;
    font-weight: 600;
    padding: 15px;
    text-align: center;
    /* width: 50%; */
    /* background: rgba(128, 128, 128, 0.075); */
    cursor: pointer;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.274); */
    border: none; //a
    position: relative;
    outline: none;
  }

  .active-tabs::before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    /* background: rgb(88, 147, 241);*/
    background: linear-gradient(to right, #f27121, #e94057);
  }
  .content-tabs {
    flex-grow: 1;
  }
  .content {
    padding: 20px;
    width: 100%;
    height: 100%;
    display: none;
  }
  .content h2 {
    padding: 0px 0 5px 0px;
  }
  .content hr {
    width: 100px;
    height: 2px;
    background: #222;
    margin-bottom: 5px;
  }
  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }
  button {
    background: none;
    border: none;
  }
`;
