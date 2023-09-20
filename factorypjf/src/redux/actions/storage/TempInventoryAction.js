import api from "../../api";

function getTempInventoryAll() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_REQUEST" });
      const tempinventoryAllList = api.get("/inventory/registration/temp/all");

      let [tempinventoryAllListResponse] = await Promise.all([
        tempinventoryAllList,
      ]);

      dispatch({
        type: "GET_TEMPINVENTORY_ALL_SUCCESS",
        payload: {
          tempinventoryAll: tempinventoryAllListResponse.data,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "GET_TEMPINVENTORY_ALL_FAIL",
        payload: error.toString(),
      });
    }
  };
}
export const TempInventoryAction = {
  getTempInventoryAll,
};
