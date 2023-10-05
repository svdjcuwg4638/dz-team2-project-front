let initialState = {
  tempinventoryAll: {},
  loading: false,
};

function tempinventoryReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_TEMPINVENTORY_ALL_SUCCESS":
      return {
        ...state,
        tempinventoryAll: payload.tempinventoryAll,
        loading: false,
      };
    default:
      return { ...state };
  }
}
export default tempinventoryReducer;
