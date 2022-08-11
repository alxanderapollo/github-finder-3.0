import React from "react";
//request to make the users loads as soon as the app loads
import { useEffect, useContext } from "react";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

import Spinner from "../layout/Spinner";
function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext);
  //bracket is our array of dependencies - will load this once everyime we run the app
  useEffect(() => {
    fetchUsers(); //run the fetch users function
  }, []);
  //1. get data
  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return (
      <h3>
        <Spinner />
      </h3>
    );
  }
}

export default UserResults;
