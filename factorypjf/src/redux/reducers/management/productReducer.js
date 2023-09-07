let initalState = {
  itemAll: {},
  storageAll: {},
  locationAll: {},
  partnerAll: {},
  loading: false,
};

function productReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PRODUCT_ALL_SUCCESS":
      return {
        ...state,
        itemAll: payload.itemAll,
        storageAll: payload.storageAll,
        locationAll: payload.locationAll,
        partnerAll: payload.partnerAll,
        loading: false,
      };
    case "GET_PRODUCT_ALL_FAIL":
      console.log("프로덕트에러");
    default:
      return { ...state };
  }
}

export default productReducer;
