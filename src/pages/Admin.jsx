import React, { useEffect } from "react";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiHome, BiArchive, BiLogOut } from "react-icons/bi";
import { TbLayoutDashboard } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import "../styles/admin.css";
import { useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { AdminPosts } from "./AdminPosts";
import EnhancedTable from "./AdminAllPosts";
import { auth, db, getAllDocsFromCollection } from "../utils/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const Admin = () => {
  const [toggle, setToggle] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [selectedId, setSelectedId] = useState(0);
  const [snap, setSnap] = useState([]);
  const [post, setPost] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const getUserData = async () => {
    await getAllDocsFromCollection("User", setSnap);

    // //user
    // const q = query(collection(db, "User"));
    // await getDocs(q).then((e) => {
    //   e.forEach((doc) => {
    //     setSnap((snap) => [...snap, doc.data()]);
    //   });
    // });
  };

  const getPostData = async () => {
    await getAllDocsFromCollection("post", setPost);

    //post
    // const q = query(collection(db, "post"));
    // await getDocs(q).then((e) =>
    //   e.forEach((doc) => {
    //     setPost((post) => [...post, doc.data()]);
    //   })
    // );
  };
  useEffect(() => {
    console.log("admin page use effect");
    document.title = "Admin Page";

    if (user) {
      getUserData();
      getPostData();
    }
  }, [user]);

  const menuItems = [
    {
      id: 0,
      icon: <TbLayoutDashboard />,
      text: "Dashboard",
      path: "/admin",
      bgColor: {
        backgroundColor: "#695cfe",
        borderRadius: "6px",
      },
      color: { color: "#fff" },
    },
    {
      id: 1,
      icon: <BiArchive />,
      text: "Posts",
      path: "/admin/posts",
      bgColor: {
        backgroundColor: "#695cfe",
        borderRadius: "6px",
      },
      color: { color: "#fff" },
    },
  ];

  return (
    <Wrap>
      <nav className={toggle ? "sidebar" : "sidebar close"}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="favicon.ico" alt="icon" />
            </span>

            <div className="text logo-text">
              <span className="name">Food Recipes</span>
            </div>
          </div>

          <i className="toggle" onClick={() => setToggle(!toggle)}>
            <MdKeyboardArrowRight />
          </i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              {menuItems.map((value, index) => {
                return (
                  <li
                    className="nav-link"
                    key={value.id}
                    style={selectedId === value.id ? value.bgColor : null}
                  >
                    <Link
                      // to={value.path}
                      onClick={() => {
                        setSelected(value.text);
                        setSelectedId(value.id);
                      }}
                    >
                      <i
                        className="icon"
                        style={selectedId === value.id ? value.color : null}
                      >
                        {value.icon}
                      </i>
                      <span
                        className="text nav-text"
                        style={selectedId === value.id ? value.color : null}
                      >
                        {value.text}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <Link>
                <i className="icon">
                  <BiLogOut />
                </i>
                <span className="text nav-text">Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      {snap.length > 0 && post.length > 0 ? (
        <section className="home">
          {/* <div className="text">/admin</div> */}
          {selected === "Dashboard" ? (
            <AdminDashboard userSnap={snap} postSnap={post} />
          ) : selected === "Posts" ? (
            // <AdminPosts li="yes" />
            <EnhancedTable postSnap={post} />
          ) : null}
        </section>
      ) : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 100vh;
  background-color: var(--body-color);
  transition: var(--tran-05);
`;
