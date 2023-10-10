let initialState = {
  tab:{},
};

const tabsReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'UPDATE_TAB_CONTENT_SUCCESS':
      return {
        ...state,
        [payload.tabId]: payload.content
      };
    case 'UPDATE_TAB_CONTENT_FAIL':
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

export default tabsReducer;
