import React from "react";
import styled from "styled-components";
export const AddRecipeSelect = (props) => {
  const { reqArray, name, label, onChange } = props;
  return (
    <Wrapper>
      <div className="req-wrapper">
        <label htmlFor={label}>{label}</label>
        <select name={name} id={name} onChange={onChange}>
          {reqArray.map((item) => {
            return (
              <option className="optionName" key={item.id}>
                {item.spec}
              </option>
            );
          })}
        </select>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .req-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  select {
    width: 95px;
    color: orange;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid orange;
    font-style: italic;
    &:focus {
      outline: none;
    }

    option {
      color: black;
    }
  }
`;
