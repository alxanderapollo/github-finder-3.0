import React from "react";
import UserResults from "../users/UserResults";
import UserSearch from "../users/UserSearch";
function Home() {
  return (
    <div>
      {/* SEarch component will go here */}
      <UserSearch />
      <UserResults />
    </div>
  );
}

export default Home;
