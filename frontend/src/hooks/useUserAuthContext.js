import { UserAuthContext } from "../context/UserAuthContext.js";
import { useContext } from "react";

export const useUserAuthContext = () => {
  const context = useContext(UserAuthContext);

  if(!context) {
    throw Error("useUserAuthContext must be used inside a UserAuthContextProvider");
  }

  return context;
};
