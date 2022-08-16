import axios from "axios";
//will be all of ourgithub actions
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// exporting it so we can call it from the component

// reduces the amount of header declerations across the page to only one place and callable by dot
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `basic+ ${GITHUB_TOKEN}` },
});
export const searchUsers = async (text) => {
  //create object and pass text that is passed on by the user
  const params = new URLSearchParams({
    q: text,
  });
  // a reponse is returned with the address
  const response = await github.get(`/search/users?${params}`);
  // returns data, but we need to get the array of items to be sent back
  return response.data.items;
};

// Get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
