let initalState = {
  unitPriceAll: {},
};

function unitPriceReducer(state = initalState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
      };
    case "GET_UNITPRICE_ALL_SUCCESS":
      return {
        ...state,
        unitPriceAll: payload.unitPriceAll,
      };
    default:
      return { ...state };
  }
}

export default unitPriceReducer
