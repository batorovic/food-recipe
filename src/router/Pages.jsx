import React from "react";
import { Home } from "../pages/Home";
import { Cuisine } from "../pages/Cuisine";
import { Searched } from "../pages/Searched";
import { Recipe } from "../pages/Recipe";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Category } from "../components/Category";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { AddRecipe } from "../pages/AddRecipe";

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
        path: "/recipe/:name",
        element: <Recipe />,
      },
      {
        path: "/profile/:name",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/addrecipe",
    element: <AddRecipe />,
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
