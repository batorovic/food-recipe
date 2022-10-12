import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  height: 28rem;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    input {
      font-size: 1rem;
      width: 60%;
      padding: 0.5rem 0rem;
      border: none;
      color: orange;
      border-bottom: 1.5px solid grey;
      /* margin-bottom: -15px; */

      &:focus {
        outline: none;
      }
    }

    .forgotPassword {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    span {
      line-height: 0;
      font-size: 0.8rem;
      color: red;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    gap: 1rem;
    padding: 1rem 0.5rem;
    width: 65%;
    border-radius: 1rem;
    border: none;
    color: white;
    background: black;
    cursor: pointer;
    &:hover {
      filter: brightness(60%);
    }
  }

  .googleLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin-top: 1rem;
      font-size: 0.9rem;
      gap: 1rem;
      padding: 1rem 0.5rem;
      width: 65%;
      border-radius: 1rem;
      border: none;
      color: white;
      background: black;
      cursor: pointer;
      &:hover {
        filter: brightness(60%);
      }
    }
  }
`;
