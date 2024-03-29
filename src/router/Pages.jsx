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
import { MyFeed } from "../pages/MyFeed";
import { Admin } from "../pages/Admin";

export const Layout = () => {
  return (
    <div style={{ margin: "0% 10%" }}>
      <NavBar />
      <Outlet />
    </div>
  );
};
export const LayoutAdmin = () => {
  return (
    <div>
      <Admin />
      <Outlet />
    </div>
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
      {
        path: "/my-feed",
        element: <MyFeed />,
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
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "/admin/posts",
        // element: <AdminPosts />,
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
