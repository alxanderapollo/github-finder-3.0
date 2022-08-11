//reducers - recive a state and an action and then work accordingly
const githubReducer = (state, action) => {
  switch (action.type) {
    //return the current state, set users (an array to the payload of users taken from the data, and set loading to true)
    case "Get_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
