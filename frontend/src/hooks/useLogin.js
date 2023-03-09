import { React, useState } from "react";
import { useUserAuthContext } from "./useUserAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useUserAuthContext();

  /**
   * Takes a email and password and sends backend request to login.
   * @param {string} email - String of user email
   * @param {string} password - String of user password 
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    //Backend request to validate user email and password
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    });

    const json = await response.json();

    if(!response.ok){
      setLoading(false);
      setError(json.error);
    }

    if(response.ok){
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type: "login", payload: json});
      setLoading(false);
    }
  }

  return { login, loading, error };
};
