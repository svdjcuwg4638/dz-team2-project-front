let initalState = {
  storageAll: {},
  locationAll: {},
};

function storageReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_STORAGE_ALL_SUCCESS":
      return {
        ...state,
        storageAll: payload.storageAll,
        locationAll: payload.locationAll,
      };
    default:
      return { ...state };
  }
}

export default storageReducer;
