import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export const AddRecipe = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      {!user && <div>NO ACCES</div>}
      {user && <div>AddRecipe</div>}
    </div>
  );
};
