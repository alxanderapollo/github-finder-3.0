import React from "react";
import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";
function UserSearch() {
  //text that is placed into the form by the user
  const [text, setText] = useState("");
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something...", "error");
    } else {
      //1. we are looking for users - set the spinner to load
      dispatch({ type: "SET_LOADING" });
      //2. get the user data and dispatch to our reducer
      const users = await searchUsers(text);
      dispatch({ type: "Get_USERS", payload: users });
      //3. remove the pending text on the form
      setText("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8 ">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          {" "}
          <button
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
            className="btn btn-ghost btn-lg"
          >
            clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
