import { useUserAuthContext } from "./useUserAuthContext";
import { useLocationsContext } from "./useLocationsContext";

export const useLogout = () => {
  const { dispatch } = useUserAuthContext();
  const { dispatch: locationsDispatch } = useLocationsContext();

  /**
   * Sends request to logout user.
   */
  const logout = () => {
    //Remove user from local localStorage
    localStorage.removeItem("user");
    if(localStorage.getItem("locations")){
      localStorage.removeItem("locations");
    }
    
    //Send logout request
    dispatch({type: "logout"});
    locationsDispatch({type: "set_locations", payload: null});
  }

  return {logout};
}
