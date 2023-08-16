let initalState = {
  storageAll: {},
  locationAll: {},
  loading: false,
};

function storageReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_STORAGE_ALL_SUCCESS":
      return {
        ...state,
        storageAll: payload.storageAll,
        locationAll: payload.locationAll,
        loading: false,
      };
    default:
      return { ...state };
  }
}

export default storageReducer;
