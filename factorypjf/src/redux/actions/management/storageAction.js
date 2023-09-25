import api from "../../api";
function getstorageAll() {
  return async (dispatch) => {
    try {
      const storageAllList = api.get("/storage/all");
      const locationAllList = api.get("/location/all");
      let [storageAllListResponse, locationAllListResponse] = await Promise.all(
        [storageAllList, locationAllList]
      );

      dispatch({
        type: "GET_STORAGE_ALL_SUCCESS",
        payload: {
          storageAll: storageAllListResponse.data,
          locationAll: locationAllListResponse.data,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "GET_STORAGE_ALL_FAIL", payload: error.toString() });
    }
  };
}


export const storageAction = {
  getstorageAll,
};
