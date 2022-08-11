import { createContext } from "react";
import { useState } from "react";

//create our context
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    // first argument is our request -> github url users, second is our token
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `basic+ ${GITHUB_TOKEN}`,
      },
    });
    //should return a response that will be our data

    //2. store it on our users array
    //3. set loading to false
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
