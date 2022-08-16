//will be all of ourgithub actions
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// exporting it so we can call it from the component
export const searchUsers = async (text) => {
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

  //only return the data since we are dispatching from the component
  return items;
};
//gets a single user
//takes in the login of the user
export const getUser = async (login) => {
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
    //2.  pass back the data
    return data;
  }
};

//get user repos
//pass in usernme
export const getUserRepos = async (login) => {
  //create object and pass text that is passed on by the user
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  // first argument is our request -> github url users, second is our token
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `basic+ ${GITHUB_TOKEN}`,
    },
  });
  //1.recover data from the api
  const data = await response.json();
  //2. dispatch an action, pass on the data
  return data;
};
