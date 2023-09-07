import api from "../../api";

function getInventoryAll() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_REQUEST" });
      const inventoryAllList = api.get("/inventory/all");

      let [inventoryAllListResponse] = await Promise.all([inventoryAllList]);

      dispatch({
        type: "GET_INVENTORY_ALL_SUCCESS",
        payload: {
          inventoryAll: inventoryAllListResponse.data,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "GET_INVENTORY_ALL_FAIL", payload: error.toString() });
    }
  };
}
export const InventoryAction = {
  getInventoryAll,
};
