let initialState = {
  inventoryAll: {},
  loading: false,
};

function inventoryReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_INVENTORY_ALL_SUCCESS":
      return {
        ...state,
        inventoryAll: payload.inventoryAll,
        loading: false,
      };
    default:
      return { ...state };
  }
}
export default inventoryReducer;
