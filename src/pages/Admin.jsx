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
import { db } from "../utils/firebase";
import { collection, doc, getDoc, query } from "firebase/firestore";

export const Admin = () => {
  const [toggle, setToggle] = useState(true);
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    console.log("admin page use effect");
    document.title = "Admin Page";
  }, []);

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
                        console.log(index, value.id);
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

      <section className="home">
        {/* <div className="text">/admin</div> */}
        {selected === "Dashboard" ? (
          <AdminDashboard />
        ) : selected === "Posts" ? (
          // <AdminPosts li="yes" />
          <EnhancedTable />
        ) : (
          <AdminDashboard />
        )}
      </section>
    </Wrap>
  );
  // {menuItems.map((value, index) => {
  //   return (
  //     <li className="nav-link">
  //       <Link key={index}>
  //         <i className="icon">{value.icon}</i>
  //         <span className="text nav-text">{value.text}</span>
  //       </Link>
  //     </li>
  //   );
  // })}
  // <Wrapper style={{ margin: "0% 0%" }}>
  //   {/* use state for roggle */}
  //   <NavBar className="sidebar toggle">
  //     <header>
  //       <div className="image-text">
  //         <span className="image">
  //           <img src="favicon.ico" alt="logo" />
  //         </span>
  //         <div className="text header-text">
  //           <span className="name">Food Recipes</span>
  //         </div>
  //       </div>
  //       <MdKeyboardArrowRight className="toggle" />
  //     </header>

  //     <div className="menu-bar">
  //       <div className="menu">
  //         <ul className="menu-links">
  //           <li className="nav-link">
  //             {menuItems.map((value, index) => {
  //               return (
  //                 <Link className="links" key={index}>
  //                   <i className="icon">{value.icon}</i>
  //                   <span className="text nav-text">{value.text}</span>
  //                 </Link>
  //               );
  //             })}
  //             {/* <Link className="links">
  //               <BiHome className="icon" />
  //               <span className="text nav-text">Dashboard</span>
  //             </Link> */}
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </NavBar>
  // </Wrapper>
  // );
};

const Wrap = styled.div`
  min-height: 100vh;
  background-color: var(--body-color);
  transition: var(--tran-05);
`;

// const Wrapper = styled.div`
//   background: var(--admin-body-color);
//   height: 100vh;
// `;

// const NavBar = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 250px;
//   padding: 10px 14px;
//   background: var(--admin-sidebar-color);
//   transition: var(--tran-05);
//   z-index: 100;

//   header {
//     position: relative;
//   }
//   .sidebar header .image,
//   .sidebar .icon {
//     min-width: 60px;
//     border-radius: 6px;
//   }
//   .sidebar .icon {
//     min-width: 60px;
//     border-radius: 6px;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 20px;
//   }
//   li {
//     height: 50px;
//     list-style: none;
//     display: flex;
//     align-items: center;
//     margin-top: 10px;
//   }

//   .image-text {
//     display: flex;
//     align-items: center;
//     img {
//       width: 40px;
//       border-radius: 6px;
//     }
//   }
//   .text {
//     font-size: 18px;
//     font-weight: 500;
//   }
//   .image {
//     min-width: 60px;
//     display: flex;
//     align-items: center;
//   }
//   .header-text {
//     display: flex;
//     flex-direction: column;
//   }
//   .name {
//     font-weight: 600;
//   }
//   .toggle {
//     position: absolute;
//     top: 50px;
//     right: -25px;
//     transform: translateY(-50%);
//     height: 25px;
//     width: 25px;
//     background-color: var(--admin-primary-color);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 50%;
//     color: var(--admin-sidebar-color);
//     font-size: 24px;
//   }
//   .menu {
//     margin-top: 40px;
//   }
//   .menu-bar {
//     height: calc(100% - 55px);
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     overflow-y: scroll;
//   }
//   .menu-bar::-webkit-scrollbar {
//     display: none;
//   }

//   .menu-links {
//     display: flex;
//   }
//   li .icon {
//     min-width: 60px;
//     font-size: 22px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   li .icon,
//   .text {
//     color: var(--admin-text-color);
//     transition: var(--admin-tran-02);
//   }
//   li .links {
//     list-style: none;
//     background-color: transparent;

//     text-decoration: none;
//     height: 100%;
//     width: 100%;
//     display: flex;
//     align-items: center;
//     border-radius: 6px;
//     transition: var(--admin-tran-04);
//     &:hover {
//       background: var(--admin-primary-color);
//     }
//   }
//   .links:hover .icon,
//   .links:hover .text {
//     color: var(--admin-sidebar-color);
//   }
// `;
