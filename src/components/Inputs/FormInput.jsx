import React from "react";
import styled from "styled-components";

export const FormInput = (props) => {
  const { label, onChange, id, ...inputProps } = props;

  return (
    <FormInputWrapper>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} />
    </FormInputWrapper>
  );
};

const FormInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  input {
    width: 285px;
    padding: 15px;
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid grey;
  }

  label {
    color: black;
  }

  span {
    font-size: 12px;
    padding: 3px;
    color: red;
    display: none;
  }
`;
