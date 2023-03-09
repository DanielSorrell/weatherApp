import { React, useState } from "react";
import { useUserAuthContext } from "./useUserAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useUserAuthContext();

  /**
   * Takes a email and password and sends backend request to register account.
   * @param {*} email - String of user email
   * @param {*} password - String of user password
   */
  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    //Backend request to validate user email and password
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        //"Access-Control-Allow-Origin": "*", 
        //"Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
      console.log(json.error);
    }
    if (response.ok) {
      //Save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type: "login", payload: json});
      setLoading(false);
    }
  }
  
  return { register, loading, error };
}