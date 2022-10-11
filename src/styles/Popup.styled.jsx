import styled from "styled-components";

export const Popup = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupInner = styled.div`
  position: relative;
  padding: 2rem;
  width: 100%;
  max-width: 540px;
  background-color: white;

  .btn-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
`;
