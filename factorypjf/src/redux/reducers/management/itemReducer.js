let initalState = {
  itemAll: {},
  storageAll: {},
  locationAll: {},
};

function itemReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
      };
    case "GET_ITEM_ALL_SUCCESS":
      return {
        ...state,
        itemAll: payload.itemAll,
        storageAll: payload.storageAll,
        locationAll: payload.locationAll,
      };
    default:
      return { ...state };
  }
}

export default itemReducer;
