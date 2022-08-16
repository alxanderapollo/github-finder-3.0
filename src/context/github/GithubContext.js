import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

//create our context
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

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
      type: "GET_USERS",
      payload: items,
    });
  };

  //gets a single user
  //takes in the login of the user
  const getUser = async (login) => {
    //set loading to true right before
    //calling fetch users
    setLoading();
    // first argument is our request -> github url users, second is our token
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `basic+ ${GITHUB_TOKEN}`,
      },
    });

    //in the case that we hit a 404 we want to display a 404
    if (response.status === 404) {
      window.location = "/notfound";
    }
    //otherwise  get the data
    else {
      //1.recover data from the api
      const data = await response.json();
      //2. dispatch an action, pass on the data
      console.log("what am i?", data);
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //get user repos
  //pass in usernme
  const getUserRepos = async (login) => {
    //set loading to true right before
    //calling fetch users
    setLoading();

    //create object and pass text that is passed on by the user
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    // first argument is our request -> github url users, second is our token
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `basic+ ${GITHUB_TOKEN}`,
        },
      }
    );
    //1.recover data from the api
    const data = await response.json();
    //2. dispatch an action, pass on the data
    dispatch({
      type: "GET_REPOS",
      payload: data,
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
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
