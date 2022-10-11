import { Pages, router } from "./router/Pages";
import { Category } from "./components/Category";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
//   Outlet,
//   useLocation,
//   BrowserRouter,
// } from "react-router-dom";
// import { Search } from "./components/Search";
import styled from "styled-components";
import { Link, RouterProvider } from "react-router-dom";
// import { GiKnifeFork } from "react-icons/gi";
// import { SigninPopup } from "./components/SigninPopup";
// import { useState } from "react";
// import { SignupPopup } from "./components/SignupPopup";
// import { Signin } from "./pages/Signin";
// import { NavBar } from "./components/NavBar";
// import { Home } from "./pages/Home";
// import { Cuisine } from "./pages/Cuisine";
// import { Searched } from "./pages/Searched";
// import { Recipe } from "./pages/Recipe";
// import { AnimatePresence } from "framer-motion";

// export const Layout = () => {
//   return (
//     <>
//       <NavBar />
//       <Outlet />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <>
//             <Category />
//             <Home />
//           </>
//         ),
//       },
//       {
//         path: "/cuisine/:type",
//         element: (
//           <>
//             <Category />
//             <Cuisine />
//           </>
//         ),
//       },

//       {
//         path: "/searched/:search",
//         element: <Searched />,
//       },
//       {
//         path: "/recipe/:id",
//         element: <Recipe />,
//       },
//     ],
//   },
// ]);

function App() {
  // const [signinPopup, setSigninPopup] = useState(false);
  // const [signupPopup, setSignupPopup] = useState(false);

  return <RouterProvider router={router}></RouterProvider>;
}

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Nav>
//           <div className="logo">
//             <GiKnifeFork />
//             <Logo to={`/`}>recipess</Logo>
//           </div>
//           <SignDiv>
//             <SignLink onClick={() => setSigninPopup(true)}>Sign in</SignLink>
//             <span>/</span>
//             <SignLink onClick={() => setSignupPopup(true)}>Sign up</SignLink>
//           </SignDiv>
//         </Nav>

//         <Search />
//         <Category />
//         <Pages />

//         <SigninPopup trigger={signinPopup} setTrigger={setSigninPopup}>
//           <Signin />
//         </SigninPopup>
//         <SignupPopup trigger={signupPopup} setTrigger={setSignupPopup}>
//           <h3>Popup</h3>
//           <p>sign up triggered</p>
//         </SignupPopup>
//       </BrowserRouter>
//     </div>
//   );
// }

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
`;

const Nav = styled.div`
  padding: 3rem 0rem;
  display: flex;
  /* justify-content: flex-start; */
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 2rem;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// const SignLink = styled(Link)`
//   text-decoration: none;
//   font-size: 1.1rem;
//   font-weight: 400;
//   margin: 0rem 0.5rem;
//   &:hover {
//     color: #dc930b;
//   }
// `;

// const SignDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export default App;
