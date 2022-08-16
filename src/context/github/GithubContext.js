import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

//create our context
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  //this will be our running state
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  //gives us a state, and dispatch
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //removed from github provider we can just pass the this.state.first
  //users: state.users,
  // user: state.user,
  // repos: state.repos,
  // loading: state.loading,

  return (
    <GithubContext.Provider
      //only want to pass our state and dispatch
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
