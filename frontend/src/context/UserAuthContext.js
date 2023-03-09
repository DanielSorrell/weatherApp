import { createContext, useReducer, useEffect } from "react";

export const UserAuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

export const UserAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  //Check for previously logged in user from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({ type: "login", payload: user });
    }
  }, []);

  console.log("User context status:");
  console.log(state);
  if(state){
    console.log("Truthy state");
  } else {
    console.log("Falsy state");
  }

  return (
    <UserAuthContext.Provider value={{...state, dispatch}}>
      { children }
    </UserAuthContext.Provider>
  );
};
