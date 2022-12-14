import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import {
  GiNoodles,
  GiCroissant,
  GiChopsticks,
  GiTacos,
  GiBullHorns,
} from "react-icons/gi";
import { List } from "../styles/Category.styled";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { motin } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect } from "react";
import {
  getCollectionByFieldInArray,
  getCollectionSnapshot,
} from "../utils/firebase";
import { useState } from "react";

export const Category = () => {
  // const [category, setCategory] = useState([]);

  // const getData = async () => {
  //   await getCollectionByFieldInArray("category", "test", "test").then((e) => {
  //     setCategory(e);
  //   });
  // };
  // useEffect(() => {
  //   console.log("category use effect");
  //   getData();
  // }, []);

  const categoryList = [
    {
      to: "/cuisine/Italian",
      icon: <FaPizzaSlice />,
      title: "Italian",
    },
    {
      to: "/cuisine/American",
      icon: <FaHamburger />,
      title: "American",
    },
    {
      to: "/cuisine/Thai",
      icon: <GiNoodles />,
      title: "Thai",
    },
    {
      to: "/cuisine/French",
      icon: <GiCroissant />,
      title: "French",
    },
    {
      to: "/cuisine/Chinese",
      icon: <GiChopsticks />,
      title: "Chinese",
    },
    {
      to: "/cuisine/Mexican",
      icon: <GiTacos />,
      title: "Mexican",
    },
    {
      to: "/cuisine/Spanish",
      icon: <GiBullHorns />,
      title: "Spanish",
    },
  ];
  return (
    <Splide
      options={{
        perPage: 5,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "5rem",
      }}
    >
      {categoryList.map((value, index) => {
        return (
          <SplideSlide key={index}>
            <SLink to={value.to}>
              {value.icon} <h4>{value.title}</h4>
            </SLink>
          </SplideSlide>
        );
      })}
      {/* <List>
        <SLink to={"/cuisine/Italian"}>
          <FaPizzaSlice />
          <h4>Italian</h4>
        </SLink>

        <SLink to={"/cuisine/American"}>
          <FaHamburger />
          <h4>American</h4>
        </SLink>

        <SLink to={"/cuisine/Thai"}>
          <GiNoodles />
          <h4>Thai</h4>
        </SLink>

        <SLink to={"/cuisine/French"}>
          <GiCroissant />
          <h4>French</h4>
        </SLink>
        <SLink to={"/cuisine/Chinese"}>
          <GiChopsticks />
          <h4>Chinese</h4>
        </SLink>
        <SLink to={"/cuisine/Mexican"}>
          <GiTacos />
          <h4>Mexican</h4>
        </SLink>
      </List> */}
    </Splide>
  );
};

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);

  h4 {
    color: white;
    font-size: 0.8rem;
  }

  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;
