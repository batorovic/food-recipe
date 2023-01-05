import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TbSum } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";

export const AdminCard = (props) => {
  const [totalPost, setTotalPost] = useState(0);
  const [totalComments, setTotalComment] = useState(0);

  const { userSnap, postSnap } = props;
  useEffect(() => {
    console.log("admin card use effect");
    getTotalPost(userSnap);
    getTotalComments(postSnap);
  }, []);

  const getTotalPost = (userSnap) =>
    userSnap.map((value) => setTotalPost(value.post.length + totalPost));

  const getTotalComments = (postSnap) =>
    postSnap.map((value) =>
      setTotalComment((totalComments) =>
        value.commentCount ? totalComments + value.commentCount : totalComments
      )
    );
  const card = [
    {
      id: 1,
      icon: <GiKnifeFork className="icon" />,
      text: "Total Recipes",
      val: postSnap.length,
    },
    {
      id: 2,
      icon: <BiCommentDetail className="icon" />,
      text: "Total Comments",
      val: totalComments,
    },
    {
      id: 3,
      icon: <FiUser className="icon" />,
      text: "Total Users",
      val: userSnap.length,
    },
    {
      id: 4,
      icon: <TbSum className="icon" />,
      text: "Total Posts",
      val: totalPost,
    },
  ];
  return (
    <Wrapper>
      {totalPost > 0 ? (
        <div className="cardWrapper">
          {card.map((value) => {
            return (
              <div className="card" key={value.id}>
                <div className="cardInfo">
                  <div className="cardIcon">{value.icon}</div>
                  <span className="header">{value.text}</span>
                </div>
                <span className="fb-val">{value.val}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 12px 60px;
  /* display: flex; */
  .cardWrapper {
    /* margin-left: 40px; */
    /* background-color: #efd4ba; */
    border-radius: 6px;
    padding: 25px 40px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .card {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    height: 130px;
    background-color: white;
    border-radius: 15px;
    padding: 15px 30px;

    .fb-val {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 28px;
      margin-top: 5px;
      background: linear-gradient(to left, #f27121, #e94057);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .cardInfo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    .header {
      font-size: 20px;
    }
  }
  .cardIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    filter: brightness(0.8);
    border-radius: 100%;
    padding: 5px;
    .icon {
      font-size: 25px;
    }
  }
`;
