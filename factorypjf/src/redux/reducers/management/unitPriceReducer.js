let initalState = {
  itemAll: {},
  unitPriceAll: {},
  loading: false,
};

function unitPriceReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_UNITPRICE_ALL_SUCCESS":
      return {
        ...state,
        itemAll: payload.itemAll,
        unitPriceAll: payload.unitPriceAll,
        loading: false,
      };
    default:
      return { ...state };
  }
}

export default unitPriceReducer
