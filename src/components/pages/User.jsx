import React from "react";
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
//The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
import { useParams } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";
function User() {
  const { getUser, user, loading } = useContext(GithubContext);
  const params = useParams();
  useEffect(() => {
    //want to get user once
    getUser(params.login);
    // getUserRepos(params.login);
  }, []);

  console.log("user console log", user);

  if (loading) return <Spinner />;

  return (
    <>
      <div>{user.login}</div>
      <div>{user.avatar_url}</div>
    </>
  );
}

export default User;
