import React, { useEffect } from "react";
import styled from "styled-components";
import { AdminCard } from "../components/Admin/AdminCard";
import { AdminPosts } from "./AdminPosts";
import { motion } from "framer-motion";

export const AdminDashboard = (props) => {
  const { userSnap, postSnap } = props;
  // padding: "12px 60px",

  useEffect(() => {
    console.log("dashboard use effect");
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Wrapper>
        <div className="text">Dashboard</div>
        <div className="content">
          <AdminCard userSnap={userSnap} postSnap={postSnap} />

          <AdminPosts />
        </div>
      </Wrapper>
    </motion.div>
  );
};

const Wrapper = styled.div`
  .content {
    display: flex;
  }
`;
