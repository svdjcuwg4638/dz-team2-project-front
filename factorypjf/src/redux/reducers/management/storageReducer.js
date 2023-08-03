let initalState = {
  storageAll: {},
};

function storageReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_STORAGE_ALL_SUCCESS":
      return {
        ...state,
        storageAll: payload.storageAll,
      };
    default:
      return { ...state };
  }
}

export default storageReducer;
