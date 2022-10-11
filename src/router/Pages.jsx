import React from "react";
import { Home } from "../pages/Home";
import { Cuisine } from "../pages/Cuisine";
import { Searched } from "../pages/Searched";
import { Recipe } from "../pages/Recipe";
import {
  createBrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Signin } from "../components/Signinold";
import { NavBar } from "../components/NavBar";
import { Category } from "../components/Category";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Category />
            <Home />
          </>
        ),
      },
      {
        path: "/cuisine/:type",
        element: (
          <>
            <Category />
            <Cuisine />
          </>
        ),
      },

      {
        path: "/searched/:search",
        element: <Searched />,
      },
      {
        path: "/recipe/:id",
        element: <Recipe />,
      },
    ],
  },
]);

// export const Pages = () => {
//   const location = useLocation();

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<Home />} />
//         <Route path="/cuisine/:type" element={<Cuisine />} />
//         <Route path="/searched/:search" element={<Searched />} />
//         <Route path="/recipe/:name" element={<Recipe />} />
//         <Route path="/signin/:signin" element={<Signin />} />
//       </Routes>
//     </AnimatePresence>
//   );
// };
