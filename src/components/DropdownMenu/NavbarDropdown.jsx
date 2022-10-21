import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const NavbarDropdown = (props) => {
  const { name, icon, ...linkProps } = props;
  return (
    <Wrapperul>
      <li>
        <Link className="linkClass" {...linkProps}>
          {icon}
          {name}
        </Link>
      </li>
    </Wrapperul>
  );
};

const Wrapperul = styled.ul`
  list-style: none;
  margin: 10px 0px;
  .linkClass {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  li {
    cursor: pointer;
    padding: 15px;
    transition: all 0.2s ease;
  }

  li:hover {
    background: #edf2f7;
    .linkClass {
      color: orange;
    }
  }
`;
