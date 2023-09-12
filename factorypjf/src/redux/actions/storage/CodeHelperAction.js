import api from "../../api";

function getCodehelperAll() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_REQUEST" });
      const codehelperAllList = api.get("/codehelper/storage");

      let [codehelperAllListResponse] = await Promise.all([codehelperAllList]);

      dispatch({
        type: "GET_CODEHELPER_ALL_SUCCESS",
        payload: {
          codehelperAll: codehelperAllListResponse.data,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "GET_CODEHELPER_ALL_FAIL", payload: error.toString() });
    }
  };
}

export const CodehelperAction = {
  getCodehelperAll,
};
