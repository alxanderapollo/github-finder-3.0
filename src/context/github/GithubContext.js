import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

//create our context
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //this will be our running state
  const initialState = {
    users: [],
    loading: false,
  };
  //gives us a state, and dispatch
  const [state, dispatch] = useReducer(githubReducer, initialState);
  //get search results
  const searchUsers = async (text) => {
    //set loading to true right before
    //calling fetch users
    setLoading();

    //create object and pass text that is passed on by the user
    const params = new URLSearchParams({
      q: text,
    });

    // first argument is our request -> github url users, second is our token
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `basic+ ${GITHUB_TOKEN}`,
      },
    });
    //1.recover data from the api
    const { items } = await response.json();
    //2. dispatch an action, pass on the data
    dispatch({
      type: "Get_USERS",
      payload: items,
    });
  };

  //clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });
  //set loading function
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      //users will have 2 parts our data, and our loading flag
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
