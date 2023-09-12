let initialState = {
  codeHelperAll: {},
  loading: false,
};

function codehelperReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_CODEHELPER_ALL_SUCCESS":
      return {
        ...state,
        codeHelperAll: payload.codehelperAll,
        loading: false,
      };
    default:
      return { ...state };
  }
}

export default codehelperReducer;
