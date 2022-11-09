import React, { useState } from "react";
import styled from "styled-components";

export const AddRecipeTextArea = (props) => {
  const { onChange, title, style, ...inputs } = props;
  const [count, setCount] = useState(inputs.maxLength);

  return (
    <TestWrapper>
      <h4>{title}</h4>
      <Wrapper>
        <span className="*">*</span>
        <textarea
          style={style}
          {...inputs}
          onChange={(e) => {
            setCount(inputs.maxLength - e.target.value.length);
            onChange(e);
          }}
          required
        />
        <span className="count">{count}</span>
      </Wrapper>
    </TestWrapper>
  );
};

const TestWrapper = styled.div`
  h4 {
    margin: 0;
    padding: 0;
    margin-left: 25px;
    margin-bottom: 5px;
    font-weight: 300;
    font-style: italic;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  textarea {
    font-size: 2rem;
    width: 600px;
    height: 100px;
    padding: 10px;
    margin: 10px 0px;
    resize: vertical;
    border: none;
    background: none;
    max-height: 100px;
    white-space: pre-wrap;

    :is(:hover, :focus) {
      outline: 1px dashed #c19c07aa;
    }

    /* :focus {
      outline: none !important;
    }
    :hover {
      outline: 1px dashed #c19c07aa;
    } */
  }
  span {
    color: orange;
    font-size: 20px;
  }
  .count {
    position: relative;
    font-size: 16px;
    top: 90px;
  }
`;
