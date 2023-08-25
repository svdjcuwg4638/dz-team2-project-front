let initalState = {
  itemAll: {},
  storageAll: {},
  locationAll: {},
  loading: false,
};

function itemReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ITEM_ALL_SUCCESS":
      return {
        ...state,
        itemAll: payload.itemAll,
        storageAll: payload.storageAll,
        locationAll: payload.locationAll,
        loading: false,
      };
    default:
      return { ...state };
  }
}

export default itemReducer;
