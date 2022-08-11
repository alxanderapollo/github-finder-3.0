import React from "react";
//request to make the users loads as soon as the app loads
import { useEffect, useState } from "react";
import UserItem from "./UserItem";

import Spinner from "../layout/Spinner";
function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //bracket is our array of dependencies - will load this once everyime we run the app
  useEffect(() => {
    fetchUsers(); //run the fetch users function
  }, []);
  //1. get data
  const fetchUsers = async () => {
    // first argument is our request -> github url users, second is our token
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `basic+ ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    //should return a response that will be our data

    //2. store it on our users array
    //3. set loading to false
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };
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
